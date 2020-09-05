import React from "react";
import { List, Row, Col, Card, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { ProfileCard, Scream, FormScream, Header } from "../components";
import { ScreamApi } from "../Api/ScreamApi";
import { Context } from "../contexts";
import "../styles/Home.css";

export class Home extends React.Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            screams: [],
            isLoading: true,
            hasMoreScreams: false,
        }
    }

    async componentDidMount() {
        const { data } = await ScreamApi.getScreams();

        if (data.length > 0) {
            this.setState(prev => ({
                ...prev,
                screams: data,
                hasMoreScreams: true,
                isLoading: false,
            }));
        }
    }

    handleInfiniteOnLoad = async () => {
        const { screams, hasMoreScreams } = this.state;

        if (screams.length > 0 && hasMoreScreams) {
            this.setState(prev => ({ ...prev, isLoading: true }))
            const { data } = await ScreamApi.getScreams(screams[screams.length - 1].createdAt)

            if (data.length === 0)
                return this.setState(prev => ({
                    ...prev,
                    isLoading: false,
                    hasMoreScreams: false
                }));

            return this.setState(prev => ({
                ...prev,
                isLoading: false,
                screams: [...screams, ...data],
            }));
        }
    }

    render() {
        const { isLoading, screams, hasMoreScreams } = this.state;

        return (
            <div>
                <Header />
                <Row justify="center" className="home__row">
                    <Col {...responsive.profile} className="home__colProfile">
                        <ProfileCard />
                    </Col>
                    <Col {...responsive.scream}>
                        <FormScream />
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={this.handleInfiniteOnLoad}
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
                                        {[1,2].map(i => (
                                            <Card key={i} style={{ marginTop: 10 }}>
                                                <Skeleton active avatar></Skeleton>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </List>
                        </InfiniteScroll>
                    </Col>
                </Row>
            </div>
        );
    }
}

const responsive = {
    scream: {
        xxl:{ span: 10, offset: 1 },
        xl:{ span: 12, offset: 1 },
        lg:{ span: 15 },
        md:{ span: 20 },
        sm:{ span: 20 },
        xs:{ span: 20 },
    },
    profile: {
        xxl:{ span: 6 },
        xl:{ span: 7 },
        lg:{ span: 10 },
        md:{ span: 13 },
        sm:{ span: 20 },
        xs:{ span: 20 },
    }
}
