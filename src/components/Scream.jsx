import React, { useState, useEffect, useContext } from "react";
import { Card, Avatar, message, Button, Popconfirm, Tooltip } from "antd";
import { CommentOutlined, LikeOutlined, LikeFilled } from "@ant-design/icons";
import moment from "moment";
import { Context, Types } from "../contexts";
import { ScreamApi } from "../Api/ScreamApi";
import "../styles/Scream.css";

const ScreamFunc = ({ scream, onShowModalScream, isModal }) => {
    const { store, dispatch } = useContext(Context);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(scream.likeCount);

    useEffect(() => {
        async function checkLike() {
            const liked = await store.likes.find(like => like.screamId === scream.screamId);
            if (store.likes && liked) return setIsLiked(true);
            setIsLiked(false);
        }
        checkLike();
    }, []);

    const onLike = async () => {
        if (!isAuthenticated()) return;

        const response = await ScreamApi.likeScream(scream.screamId);
        if (response.status !== "Ok") return message.error("Something went wrong!", 3);

        setIsLiked(true);
        setLikes(response.data.likeCount);

        await dispatch({
            type: Types.SET_LIKE,
            payload: response.data
        });
        console.log(response);
    }

    const onDisLike = async () => {
        if (!isAuthenticated()) return;
        const response = await ScreamApi.unLikeScream(scream.screamId);
        if (response.status !== "Ok") return message.error("Something went wrong!", 3);

        setIsLiked(false);
        setLikes(response.data.likeCount);

        await dispatch({
            type: Types.SET_UNLIKE,
            payload: response.data
        });
        console.log(response);
    }

    const onDelete = async () => {
        if (!isAuthenticated()) return;
        message.loading({ content: "Loading..", key: "delete" });
        const response = await ScreamApi.deleteScream(scream.screamId);

        if (response.status !== "Ok") return message.error({ content: "Something went wrong!", key: "delete", duration: 3 });
        dispatch({
            type: Types.DELETE_SCREAM,
            payload: scream.screamId,
        });
        return message.success({ content: "Scream deleted successfully!", key: "delete", duration: 3 });
    }

    const isAuthenticated = () => {
        if (store.authenticated) return true;
        message.warning("You are not logged in!");
        return false;
    }

    const btn = () => {
        if (isLiked)
            return (
                <LikeFilled
                    key="disLike"
                    style={{ color: "#1890ff" }}
                />
            );
        return (<LikeOutlined key="like" />);
    }

    const buttons = () => {
        return [
            <span
                onClick={() => (!isModal ? isLiked ? onDisLike() : onLike() : null)}
                className="scream__actions"
            >
                {btn()} {likes}
            </span>,
            <span className="scream__actions" onClick={() => !isModal ? onShowModalScream(scream.screamId) : null}>
                <CommentOutlined key="comments" /> {scream.commentCount}
            </span>,
        ]
    }

    return (
        <div className="scream">
            <Card actions={buttons()}>
                <Card.Meta
                    avatar={<Avatar src={scream.userImage} />}
                    title={
                        <React.Fragment>
                            <div className="scream__username">
                                {scream.userHandle}
                                    <Tooltip title={moment(scream.createdAt).fromNow()}>
                                        <span className="scream__createdAt">{moment(scream.createdAt).fromNow()}</span>
                                    </Tooltip>
                            </div>
                            {scream.userHandle === store.credentials.handle && (
                                <Popconfirm
                                    title="Are you sure want to delete this scream?"
                                    onConfirm={onDelete}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger size="small">
                                        Delete
                                    </Button>
                                </Popconfirm>
                            )}
                        </React.Fragment>
                    }
                />
                {scream.body}
            </Card>
        </div>
    );
}

export const Scream = React.memo(ScreamFunc);
