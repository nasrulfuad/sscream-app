import React, { useState, useEffect } from "react";
import { Card, Avatar, Form, Button, Input, List, Spin, Row, Col } from "antd";
import { EditOutlined, LikeOutlined, LikeFilled } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import Comment from "./sub_components/Comment";
import "../styles/Post.css";

const fetchComments = callback =>
    fetch(
        "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo"
    )
        .then(res => res.json())
        .then(({ results }) => callback(results));

function Post() {
    let [comments, setComments] = useState([]);
    const [isLike, setIsLike] = useState(false);
    const [likes, setLikes] = useState(0);
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
        fetchComments(data => {
            comments = comments.concat(data);
            setComments(comments);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        fetchComments(results => setComments(results));
    }, []);

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
                    <EditOutlined key="edit" />,
                ]}
            >
                <Card.Meta
                    avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={
                        <p className="post__username">
                            Username <span>46m</span>
                        </p>
                    }
                />
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis mollitia autem tempora aliquid consequatur
                reiciendis enim ipsam doloremque minus unde ratione voluptatum
                accusantium repellat, maxime ullam iure, quaerat aspernatur
                earum.
                <img
                    alt="example"
                    src="https://firebasestorage.googleapis.com/v0/b/instagram-clone-d8660.appspot.com/o/images%2F106728543_3171219992957744_1917523241753468125_o.jpg?alt=media&token=e70e3416-b4cc-4dea-8f08-e6c8ce4a10be"
                    className="post__image"
                />
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

export default Post;
