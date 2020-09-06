import React, { useState, useEffect, useContext } from "react";
import { Card, Avatar, message, Button, Popconfirm } from "antd";
import { CommentOutlined, LikeOutlined, LikeFilled } from "@ant-design/icons";
import moment from "moment";
import { Context } from "../contexts";
import { ScreamApi } from "../Api/ScreamApi";
import "../styles/Scream.css";

const ScreamFunc = ({ scream, onDeleteScream }) => {
    const { store } = useContext(Context);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(scream.likeCount);

    useEffect(() => {
        const { likes } = store;
        const liked = likes.find(like => like.screamId === scream.screamId);

        if (likes && liked) {
            setIsLiked(true);
        }
    }, [store, scream]);

    const onLike = async () => {
        if (!isAuthenticated()) return;

        const response = await ScreamApi.likeScream(scream.screamId);
        if (response.status === "Ok") {
            setIsLiked(true);
            setLikes(response.data.likeCount);
        }
        console.log(response);
    }

    const onDisLike = async () => {
        if (!isAuthenticated()) return;
        const response = await ScreamApi.unLikeScream(scream.screamId);
        if (response.status === "Ok") {
            setIsLiked(false);
            setLikes(response.data.likeCount);
        }
        console.log(response);
    }

    const onDelete = async () => {
        onDeleteScream(scream.screamId);
        if (!isAuthenticated()) return;
        const response = await ScreamApi.deleteScream(scream.screamId);

        if (response.status === "Ok") {
            message.success("Scream deleted successfully!", 3);
        }
        console.log(response);
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
                onClick={() => (isLiked ? onDisLike() : onLike())}
                className="scream__actions"
            >
                {btn()} {likes}
            </span>,
            <span className="scream__actions">
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
                                <span className="scream__createdAt">
                                    {moment(scream.createdAt).fromNow()}
                                </span>
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


// export class Scream1 extends React.Component {
//     static contextType = Context;

//     constructor(props) {
//         super(props);
//         this.state = {
//             isLiked: false,
//             likes: this.props.scream.likeCount,
//         }
//     }

//     componentDidMount() {
//         const { screamId } = this.props.scream;
//         const { likes } = this.context.store;
//         const liked = likes.find(like => like.screamId === screamId);

//         if (likes && liked) {
//             this.setState(prev => ({ ...prev, isLiked: true }))
//         }
//     }

//     onLike = async () => {
//         const response = await ScreamApi.likeScream(this.props.scream.screamId);
//         if (response.status === "Ok") {
//             this.setState({
//                 isLiked: true,
//                 likes: response.data.likeCount
//             });
//         }
//         console.log(response);
//     }

//     onDisLike = async () => {
//         const response = await ScreamApi.unLikeScream(this.props.scream.screamId);
//         if (response.status === "Ok") {
//             this.setState({
//                 isLiked: false,
//                 likes: response.data.likeCount
//             });
//         }
//         console.log(response);
//     }

//     btn = () => {
//         if (this.state.isLiked)
//             return (
//                 <LikeFilled
//                     key="disLike"
//                     style={{ color: "#1890ff" }}
//                 />
//             );
//         return (<LikeOutlined key="like" />);
//     }

//     buttons = () => {
//         const { isLiked, likes } = this.state;
//         return [
//             <span
//                 onClick={() => (isLiked ? this.onDisLike() : this.onLike())}
//                 className="scream__actions"
//             >
//                 {this.btn()} {likes}
//             </span>,
//             <span className="scream__actions">
//                 <CommentOutlined key="comments" /> {this.props.scream.commentCount}
//             </span>,
//         ]
//     }

//     render() {
//         const { scream } = this.props;

//         return (
//             <div className="scream">
//                 <Card actions={this.buttons()}>
//                     <Card.Meta
//                         avatar={<Avatar src={scream.userImage} />}
//                         title={
//                             <p className="scream__username">
//                                 {scream.userHandle}
//                                 <span className="scream__createdAt">
//                                     {moment(scream.createdAt).fromNow()}
//                                 </span>
//                             </p>
//                         }
//                     />
//                     {scream.body}
//                 </Card>
//             </div>
//         );
//     }
// }
