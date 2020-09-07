import React from "react";
import { Comment as CommentElement, Avatar, Tooltip } from "antd";
import moment from "moment";
import "../styles/Comment.css";

export class Comment extends React.Component {
  render() {
    const { body, createdAt, userHandle, userImage } = this.props.item;

    return (
      <CommentElement
        author={"@" + userHandle}
        className="comment__element"
        avatar={
          <Avatar
            src={userImage}
            alt={userHandle}
          />
        }
        content={<p>{body}</p>}
        datetime={
          <Tooltip title={moment(createdAt).fromNow()}>
            <span>{moment(createdAt).fromNow()}</span>
          </Tooltip>
        }
      />
    );
  }
}
