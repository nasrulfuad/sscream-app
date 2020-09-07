import React from "react";
import { Form, Button, Input, Card, message } from "antd";
import "../styles/FormPost.css";
import { ScreamApi } from "../Api/ScreamApi";
import { Context, Types } from "../contexts";

export class FormScream extends React.Component {
    static contextType = Context;

    state = { isLoading: false, };

    formRef = React.createRef();

    onFinish = async body => {
        this.setState({ isLoading: true });
        const response = await ScreamApi.addScream(body);

        if (response.status !== "Ok") return message.error("Something went wrong!", 3);

        this.context.dispatch({
            type: Types.ADD_SCREAM,
            payload: response.data,
        });

        this.setState({ isLoading: false });
        this.formRef.current.resetFields();
        message.success("Scream posted successfully!", 3);
    }

    render() {
        const { authenticated } = this.context.store;
        return(
            <Card>
                <Form ref={this.formRef} onFinish={this.onFinish}>
                    <Form.Item name="body" rules={[rules]}>
                        <Input.TextArea
                            rows={4}
                            placeholder={ authenticated ? `What's on your mind, ${this.context.store.credentials.handle}?` : "What's on your mind, guest?" }
                            disabled={authenticated ? false : true}
                        />
                    </Form.Item>
                    <Button
                        block
                        type="primary"
                        style={{ marginTop: 10 }}
                        disabled={authenticated ? false : true}
                        loading={this.state.isLoading}
                        htmlType="submit"
                    >
                        { authenticated ? 'Post a new scream' : 'Login to post your scream' }
                    </Button>
                </Form>
            </Card>
        );
    }
}

const rules = {
    required: true,
    message: "Please input your scream",
}
