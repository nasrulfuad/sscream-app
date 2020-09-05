import React from "react";
import { Card, Avatar } from "antd";
import { CommentOutlined, LikeOutlined, LikeFilled } from "@ant-design/icons";
import moment from "moment";
import "../styles/Scream.css";

export class Scream extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLike: false,
            likes: this.props.scream.likeCount,
        }
    }

    onLike = () => {
        this.setState({
            isLike: true,
            likes: 1
        });
    }

    onDisLike = () => {
        this.setState({
            isLike: false,
            likes: 0
        });
    }

    btn = () => {
        if (this.state.isLike)
            return (
                <LikeFilled
                    key="disLike"
                    style={{ color: "#1890ff" }}
                />
            );
        return (<LikeOutlined key="like" />);
    }

    buttons = () => {
        const { isLike, likes } = this.state;
        return [
            <span
                onClick={() => (isLike ? this.onDisLike() : this.onLike())}
                className="scream__actions"
            >
                {this.btn()} {likes}
            </span>,
            <span className="scream__actions">
                <CommentOutlined key="comments" /> {this.props.scream.commentCount}
            </span>,
        ]
    }

    render() {
        const { scream } = this.props;
        return (
            <div className="scream">
                <Card actions={this.buttons()}>
                    <Card.Meta
                        avatar={<Avatar src={scream.userImage} />}
                        title={
                            <p className="scream__username">
                                {scream.userHandle}
                                <span className="scream__createdAt">
                                    {moment(scream.createdAt).fromNow()}
                                </span>
                            </p>
                        }
                    />
                    {scream.body}
                </Card>
            </div>
        );
    }
}
