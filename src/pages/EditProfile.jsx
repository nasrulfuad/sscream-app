import React from "react";
import { Row, Col, Card, Form, Input, Button, message } from "antd";
import { Header, ProfileCard } from "../components";
import { UserApi } from "../Api/UserApi";
import { Context, Types } from "../contexts";

export class EditProfile extends React.Component {
    static contextType = Context;

    state = {
        isBtnLoading: false,
        website: "",
    }

    onFinish = async values => {
        const { bio, website, location } = this.context.store.credentials;
        const oldProfile = { website, bio, location };

        if (JSON.stringify(oldProfile) === JSON.stringify(values)) return message.warning("Nothing changes!", 3);

        this.setState(prev => ({ ...prev, isBtnLoading: true }));
        const response = await UserApi.updateProfile(values);

        this.setState(prev => ({ ...prev, isBtnLoading: false }));

        if (response.status !== "Ok") return message.error("Ooopss, something went wrong!", 3);

        this.context.dispatch({
            type: Types.SET_PROFILE,
            data: values,
        });

        message.success("Profile updated successfully!", 3);
    }

    render () {
        const { bio, website, location } = this.context.store.credentials;

        return (
            <React.Fragment>
                <Header />
                <Row justify="center" className="paddingFromHeader">
                    <Col {...responsive.profile}>
                      <ProfileCard />
                    </Col>
                    <Col {...responsive.form}>
                        <Card>
                            <Form {...layout} name="nest-messages" onFinish={this.onFinish} initialValues={{ website, bio, location }}>
                              <Form.Item name="website" label="Website" rules={rules.website}>
                                <Input value={this.state.website} placeholder="https://nasrulfuad.github.io" />
                              </Form.Item>
                              <Form.Item name="bio" label="Bio" rules={rules.bio}>
                                <Input.TextArea />
                              </Form.Item>
                              <Form.Item name="location" label="Location" rules={rules.location}>
                                <Input.TextArea />
                              </Form.Item>
                              <Form.Item wrapperCol={{ ...layout.wrappercolbtn }}>
                                <Button type="primary" htmlType="submit" block loading={this.state.isBtnLoading}>
                                  Submit
                                </Button>
                              </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const responsive = {
    form: {
        xxl:{ span: 8, offset: 1 },
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

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
    wrappercolbtn: {
        md: {
            span: 16,
            offset: 5
        }
    }
}

const rules = {
    website: [
        {
            required: true,
            type: "url",
            message: "Please input your website correctly!",
        },
    ],
    bio: [
        {
            required: true,
            message: "Please input your bio!",
        },
    ],
    location: [
        {
            required: true,
            message: "Please input your address!",
        },
    ],
};
