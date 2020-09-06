import React from "react";
import { Card, Button, Tooltip, message } from "antd";
import { LinkOutlined, HomeOutlined, CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import { UserApi } from "../Api/UserApi";
import { Context, Types } from "../contexts";
import "../styles/ProfileCard.css";

export class ProfileCard extends React.PureComponent {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleImageChange = async e => {
        const image = e.target.files[0];
        const formData = new FormData();
        message.loading({ content: 'Loading...', key: 'updateable' });
        formData.append('image', image, image.name);

        const response = await UserApi.uploadImage(formData);

        if (!response) return message.error({ content: 'Image failed to upload!', key: 'updateable', duration: 3 });

        this.context.dispatch({
            type: Types.SET_IMAGE_PROFILE,
            imageUrl: response.imageUrl
        });

        return message.success({ content: 'Image uploaded successfully!', key: 'updateable', duration: 3 });
    }

    onClickUpload() {
        document.querySelector("#input-image").click();
    }

    render() {
        const { credentials, authenticated } = this.context.store;
        const { imageUrl, handle, bio, website, location, createdAt } = credentials;

        return (
            <Card
                hoverable
                className="profileCard"
            >
                <img className="profileCard__image" alt="example" src={imageUrl} />

                <Tooltip title={authenticated ? "Edit Profile Image" : "Login to access this feature!"} className="profileCard__upload">
                    <Button type="dashed" onClick={this.onClickUpload} disabled={!authenticated}>
                        Upload
                        <input type="file" hidden id="input-image"  onChange={this.handleImageChange}/>
                    </Button>
                </Tooltip>

                <h2>@{handle}</h2>
                <p>{bio || "Your bio"}</p>
                <p>
                    <HomeOutlined />
                    {location || "Your location"}
                </p>
                <p>
                    <a href={website || "#"} target={website ? "_blank" : false} rel="noopener noreferrer">
                        <LinkOutlined />{website || "https://your-site.com"}
                    </a>
                </p>
                <p>
                    <CalendarOutlined />
                    Joined {moment(createdAt).format("DD MMM YYYY")}
                </p>
            </Card>
        );
    }
}
