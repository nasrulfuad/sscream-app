import React from "react";
import { Form, Button, Input, Card } from "antd";
import "../styles/FormPost.css";
import { Context } from "../contexts";

export class FormScream extends React.Component {
    static contextType = Context;

    state = {
        scream: '',
        isLoading: false,
    };

    onAdd = () => {
        this.setState(prev => ({ ...prev, isLoading: true }));
    }

    render() {
        const { authenticated } = this.context.store;
        return(
            <Card>
                <Form>
                    <Form.Item>
                        <Input.TextArea
                            rows={4}
                            placeholder={ authenticated ? `What's on your mind, ${this.context.store.credentials.handle}?` : "What's on your mind, guest?" }
                            value={this.state.scream}
                            onChange={e => this.setState({ scream: e.target.value })}
                            disabled={authenticated ? false : true}
                        />
                    </Form.Item>
                    <Button
                        block
                        type="primary"
                        style={{ marginTop: 10 }}
                        disabled={authenticated ? false : true}
                        loading={this.state.isLoading}
                        onClick={this.onAdd}
                    >
                        { authenticated ? 'Post' : 'Login to post your scream' }
                    </Button>
                </Form>
            </Card>
        );
    }
}
