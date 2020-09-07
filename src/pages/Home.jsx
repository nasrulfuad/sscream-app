import React from "react";
import { List, Row, Col, Card, Skeleton, Modal, message, Button } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { ProfileCard, Scream, FormScream, Header, ContentModal } from "../components";
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
        await this.context.dispatch({ type: Types.UNSET_SCREAMS });
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

    onShowModalScream = async screamId => {
        if (!this.context.store.authenticated) return message.warning("You are not logged in!");
        disableBodyScroll(document.querySelector("body"));
        this.context.dispatch({
            type: Types.SHOW_MODAL_SCREAM
        });
        const response = await ScreamApi.getScream(screamId);
        if (response.status !== "Ok") return message.error("Something went wrong!", 3);

        this.context.dispatch({ type: Types.SET_SCREAM_MODAL, payload: response.data });
    }

    onHideModalScream = () => {
        enableBodyScroll(document.querySelector("body"));
        this.context.dispatch({
            type: Types.HIDE_MODAL_SCREAM
        });
    }

    handleInfiniteOnLoad = async () => {
        const { screams } = await this.context.store;

        if (screams.length > 0 && this.state.hasMoreScreams) {
            this.setState(prev => ({ ...prev, isLoading: true }))
            const { data } = await ScreamApi.getScreams(screams[screams.length - 1].createdAt)

            if (data.length === 0)
                return await this.setState(prev => ({
                    ...prev,
                    isLoading: false,
                    hasMoreScreams: false
                }));

            this.setState(prev => ({
                ...prev,
                isLoading: false,
            }));

            await this.context.dispatch({
                type: Types.SET_SCREAMS,
                payload: data
            });
        }
    }

    render() {
        const { isLoading, hasMoreScreams } = this.state;
        const { screams, openModalScream } = this.context.store;

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
                                    <Scream key={scream.id} scream={scream} onShowModalScream={this.onShowModalScream} />
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
                <Modal
                  visible={openModalScream}
                  onCancel={this.onHideModalScream}
                  closable={false}
                  maskClosable={false}
                  okText="Oke"
                  footer={[
                    <Button key="back" onClick={this.onHideModalScream}>
                      Close
                    </Button>
                  ]}
                >
                {this.context.store.loadingModal ? (<Skeleton loading avatar />) : (<ContentModal />)}
                </Modal>
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
