import React from "react";
import { Card, Form, Button, message, Input, List, Spin } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { Context, Types } from "../contexts";
import { Comment, Scream } from "./index";
import { ScreamApi } from "../Api/ScreamApi";
import "../styles/ContentModal.css";

export class ContentModal extends React.Component {
    static contextType = Context;

    formRef = React.createRef();

    state = {
        isLike: false,
        likes: 0,
        isLoading: false
    };

    onComment = async body => {
        message.loading({ content: "Loading...", key: "onComment" });
        const response = await ScreamApi.commentScream(this.context.store.screamInModal.screamId, body);

        if (response.status !== "Ok") return message.error({ content: "Something went wrong!", key: "onComment" });

        message.success({ content: "Comment successfully added!", key: "onComment" });

        this.formRef.current.resetFields();
        this.context.dispatch({
            type: Types.SET_COMMENT,
            payload: response.data,
        });
    }

  onLike = () => {
    this.setState((prev) => ({ ...prev, isLike: true, likes: 1 }));
  };

  onDisLike = () => {
    this.setState((prev) => ({ ...prev, isLike: false, likes: 0 }));
  };

  likeBtn = () =>
    this.state.isLike ? (
      <LikeFilled
        key="disLike"
        onClick={this.onDisLike}
        style={{ color: "#1890ff" }}
      />
    ) : (
      <LikeOutlined key="like" onClick={this.onLike} />
    );

  render() {
    const { comments } = this.context.store.screamInModal;
    return (
      <React.Fragment>
        <Scream scream={this.context.store.screamInModal} isModal={true} />
        <Card
          style={{ borderTop: 0 }}
          className="post__commentCard"
        >
          <div className="post__commentList">
            <List
              dataSource={comments}
              renderItem={comment => (
                <List.Item>
                  <Comment item={comment} />
                </List.Item>
              )}
            >
              {this.state.isLoading && (
                <div
                  style={{
                    textAlign: "center"
                  }}
                >
                  <Spin />
                </div>
              )}
            </List>
          </div>

          <Form className="form__comment" onFinish={this.onComment} ref={this.formRef}>
            <Form.Item name="body">
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" block>
                Add Comment
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}
