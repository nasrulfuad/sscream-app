import React from "react";
import { Comment as CommentElement, Avatar, Tooltip } from "antd";
import moment from "moment";

function Comment({ item }) {
    return (
        <CommentElement
            author={item.name.first}
            avatar={
                <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                />
            }
            content={<p>We supply a series of design </p>}
            datetime={
                <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                    <span>{moment().fromNow()}</span>
                </Tooltip>
            }
        />
    );
}

export default Comment;
