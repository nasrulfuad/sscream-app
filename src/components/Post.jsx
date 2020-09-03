import React, { useState } from "react";
import { Card, Avatar, Form, Button, Input, List, Spin } from "antd";
import { CommentOutlined, LikeOutlined, LikeFilled } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import Comment from "./sub_components/Comment";
import moment from "moment";
import "../styles/Scream.css";

function Scream({ scream }) {
    let [comments, setComments] = useState([]);
    const [isLike, setIsLike] = useState(false);
    const [likes, setLikes] = useState(scream.likeCount);
    const [isLoading, setIsLoading] = useState(false);

    const onLike = () => {
        setIsLike(true);
        setLikes(1);
    };

    const onDisLike = () => {
        setIsLike(false);
        setLikes(0);
    };

    const likeBtn = isLike ? (
        <LikeFilled
            key="disLike"
            onClick={onDisLike}
            style={{ color: "#1890ff" }}
        />
    ) : (
        <LikeOutlined key="like" onClick={onLike} />
    );

    const handleInfiniteOnLoad = () => {
        setIsLoading(true);
        // fetchComments(data => {
        //     comments = comments.concat(data);
        //     setComments(comments);
        //     setIsLoading(false);
        // });
    };

    return (
        <div style={{ marginTop: 50 }}>
            <Card
                actions={[
                    <span
                        onClick={() => (isLike ? onDisLike() : onLike())}
                        style={{
                            width: "100%",
                            display: "block",
                        }}
                    >
                        {likeBtn} {likes}
                    </span>,
                    <span
                        style={{
                            width: "100%",
                            display: "block",
                        }}
                    >
                        <CommentOutlined
                            style={{ fontSize: 20 }}
                            key="comments"
                        />{" "}
                        {scream.commentCount}
                    </span>,
                ]}
            >
                <Card.Meta
                    avatar={<Avatar src={scream.userImage} />}
                    title={
                        <p className="post__username">
                            {scream.userHandle}{" "}
                            <span>
                                {moment(scream.createdAt).format("h:mmA")}
                            </span>
                        </p>
                    }
                />
                {scream.body}
            </Card>
            <Card
                style={{
                    borderTop: 0,
                }}
                className="post__commentCard"
            >
                <div className="post__commentList">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={handleInfiniteOnLoad}
                        hasMore={true}
                        useWindow={false}
                    >
                        <List
                            dataSource={comments}
                            renderItem={item => (
                                <List.Item>
                                    <Comment item={item} />
                                </List.Item>
                            )}
                        >
                            {isLoading && (
                                <div
                                    style={{
                                        textAlign: "center",
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
        </div>
    );
}

export default Scream;
