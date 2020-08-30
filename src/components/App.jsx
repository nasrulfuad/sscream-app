import React, { useState, useEffect } from "react";
import { Layout, Card, List, Avatar, Spin, Row, Col } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import Header from "./Header";
import Post from "./Post";
import FormPost from "./FormPost";
import "../styles/App.css";

const fetchPosts = callback =>
    fetch(
        "https://randomuser.me/api/?results=10&inc=name,gender,email,nat&noinfo"
    )
        .then(res => res.json())
        .then(({ results }) => callback(results));

function App() {
    let [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInfiniteOnLoad = () => {
        setIsLoading(true);
        // fetchPosts(data => {
        //     posts = posts.concat(data);
        //     setPosts(posts);
        // });
    };

    useEffect(() => {
        fetchPosts(posts => setPosts(posts));
    }, []);

    return (
        <Layout>
            <Header />
            <Row
                justify="center"
                style={{ paddingTop: 100, backgroundColor: "#fafafa" }}
            >
                <Col
                    lg={{ span: 8 }}
                    md={{ span: 18 }}
                    sm={{ span: 24 }}
                    style={{ border: "none" }}
                >
                    <FormPost />
                    {[1, 2, 3, 4, 5].map(() => (
                        <Post />
                    ))}
                </Col>
            </Row>
            <Layout.Content>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={handleInfiniteOnLoad}
                    hasMore={true}
                    useWindow={true}
                >
                    <List
                        dataSource={posts}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    title={
                                        <a href="https://ant.design">
                                            {item.name.last}
                                        </a>
                                    }
                                    description={item.email}
                                />
                                <div>Content</div>
                            </List.Item>
                        )}
                    >
                        {isLoading && (
                            <div className="demo-loading-container">
                                <Spin />
                            </div>
                        )}
                    </List>
                </InfiniteScroll>
            </Layout.Content>
        </Layout>
    );
}

export default App;
