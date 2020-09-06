import React from "react";
import { List, Row, Col, Card, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { ProfileCard, Scream, FormScream, Header } from "../components";
import { ScreamApi } from "../Api/ScreamApi";
import { Context, Types } from "../contexts";
import "../styles/Home.css";

export class Home extends React.Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            hasMoreScreams: false,
        }
    }

    async componentDidMount() {
        this.context.dispatch({ type: Types.UNSET_SCREAMS });
        const { data } = await ScreamApi.getScreams();

        if (data.length > 0) {
            this.setState(prev => ({
                ...prev,
                hasMoreScreams: true,
                isLoading: false,
            }));
            this.context.dispatch({
                type: Types.SET_SCREAMS,
                payload: data
            });
        }
    }

    handleInfiniteOnLoad = async () => {
        const { screams } = this.context.store;

        if (screams.length > 0 && this.state.hasMoreScreams) {
            this.setState(prev => ({ ...prev, isLoading: true }))
            const { data } = await ScreamApi.getScreams(screams[screams.length - 1].createdAt)

            if (data.length === 0)
                return this.setState(prev => ({
                    ...prev,
                    isLoading: false,
                    hasMoreScreams: false
                }));

            this.setState(prev => ({
                ...prev,
                isLoading: false,
            }));
            this.context.dispatch({
                type: Types.SET_SCREAMS,
                payload: data
            });
        }
    }

    render() {
        const { isLoading, hasMoreScreams } = this.state;
        const { screams } = this.context.store;

        return (
            <React.Fragment>
                <Header />
                <Row justify="center" className="paddingFromHeader">
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
            </React.Fragment>
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
