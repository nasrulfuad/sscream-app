import React from "react";
import { Form, Button, Input, Card } from "antd";

function FormPost() {
    return (
        <Card>
            <Form>
                <Form.Item>
                    <Input.TextArea
                        rows={4}
                        placeholder="What's on your mind?"
                    />
                </Form.Item>
            </Form>
        </Card>
    );
}

export default FormPost;
