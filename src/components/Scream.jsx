import React, { useState } from "react";
import { Card, Avatar } from "antd";
import { CommentOutlined, LikeOutlined, LikeFilled } from "@ant-design/icons";
import moment from "moment";
import "../styles/Scream.css";

function Scream({ scream }) {
    const [isLike, setIsLike] = useState(false);
    const [likes, setLikes] = useState(scream.likeCount);

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

    return (
        <div className="scream">
            <Card
                actions={[
                    <span
                        onClick={() => (isLike ? onDisLike() : onLike())}
                        className="scream__actions"
                    >
                        {likeBtn} {likes}
                    </span>,
                    <span className="scream__actions">
                        <CommentOutlined key="comments" /> {scream.commentCount}
                    </span>,
                ]}
            >
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

export default Scream;
