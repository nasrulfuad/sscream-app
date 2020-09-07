import React from "react";
import { Card, Avatar, Form, Button, Input, List, Spin } from "antd";
import { CommentOutlined, LikeOutlined, LikeFilled } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";

export class ContentModal extends React.Component {

  state = {
    comments: [],
    isLike: false,
    likes: 0,
    isLoading: false,
  }

  onLike = () => {
      this.setState(prev => ({...prev, isLike: true, likes: 1}));
  };

   onDisLike = () => {
    this.setState(prev => ({...prev, isLike: false, likes: 0}));

  };

  likeBtn = () => this.state.isLike ? (
      <LikeFilled
          key="disLike"
          onClick={this.onDisLike}
          style={{ color: "#1890ff" }}
      />
  ) : (
      <LikeOutlined key="like" onClick={this.onLike} />
  );

  render() {
    <>
      <Card
        actions={[
          <span
            style={{
              width: "100%",
              display: "block"
            }}
          >
            {this.likeBtn} {this.state.likes}
          </span>,
          <span
            style={{
              width: "100%",
              display: "block"
            }}
          >
            <CommentOutlined style={{ fontSize: 20 }} key="comments" />{" "}
            10
          </span>
        ]}
      >
        <Card.Meta
          avatar={<Avatar src={scream.userImage} />}
          title={
            <p className="post__username">
              @username
              <span>a few moments ago</span>
            </p>
          }
        />
        Hallo guyss, selamat pagi!!
      </Card>
      <Card
        style={{
          borderTop: 0
        }}
        className="post__commentCard"
      >
        <div className="post__commentList">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={true}
            useWindow={false}
          >
            <List
              dataSource={this.state.comments}
              renderItem={(item) => (
                <List.Item>
                  <Comment item={item} />
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
          </InfiniteScroll>
        </div>

        <Form>
          <Form.Item>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              Add Comment
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>;
  }
}
