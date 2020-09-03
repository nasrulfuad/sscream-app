import React, { useState, useEffect } from "react";
import { List, Row, Col } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import Scream from "../components/Scream";
import FormPost from "../components/FormPost";
import SkeletonScream from "../components/SkeletonScream";
import Header from "../components/Header";
import { getScreams } from "../Api/screams";
// import { user as UserContext } from "../contexts";

function Home() {
    // const { user } = useContext(UserContext.context);
    const [screams, setScreams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMoreScreams, setHasMoreScreams] = useState(true);

    const handleInfiniteOnLoad = () => {
        setIsLoading(true);
        if (screams.length > 0) {
            getScreams(screams[screams.length - 1].createdAt, dataScreams => {
                if (dataScreams.length === 0) {
                    setIsLoading(false);
                    return setHasMoreScreams(false);
                } else {
                    setIsLoading(false);
                    return setScreams([...screams, ...dataScreams]);
                }
            });
        }
    };

    useEffect(() => {
        getScreams("", dataScreams => {
            setIsLoading(false);
            setScreams(dataScreams);
        });
    }, []);

    return (
        <div>
            <Header />
            <Row
                justify="center"
                style={{
                    paddingTop: 100,
                    backgroundColor: "#fafafa",
                    minHeight: "100vh",
                }}
            >
                <Col
                    lg={{ span: 8 }}
                    md={{ span: 18 }}
                    sm={{ span: 24 }}
                    style={{ border: "none" }}
                >
                    <FormPost />
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={handleInfiniteOnLoad}
                        hasMore={hasMoreScreams}
                        useWindow={true}
                    >
                        <List
                            dataSource={screams}
                            renderItem={scream => (
                                <Scream key={scream.id} scream={scream} />
                            )}
                        >
                            {isLoading && (
                                <div>
                                    <SkeletonScream />
                                    <SkeletonScream />
                                </div>
                            )}
                        </List>
                    </InfiniteScroll>
                </Col>
            </Row>
        </div>
    );
}

export default Home;
