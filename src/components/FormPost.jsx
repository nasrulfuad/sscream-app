import React, { useState, useContext } from "react";
import { Form, Button, Input, Card } from "antd";
import { user as UserContext } from "../contexts";
import "../styles/FormPost.css";

function FormPost() {
    const { user } = useContext(UserContext.context);
    const [scream, setScream] = useState("");

    return (
        <Card>
            <Form>
                <Form.Item>
                    <Input.TextArea
                        rows={4}
                        placeholder={
                            user.isLoggedIn
                                ? `What's on your mind, ${user.data.handle}?`
                                : "What's on your mind, Guest?"
                        }
                        value={scream}
                        onChange={e => setScream(e.target.value)}
                        disabled={user.isLoggedIn ? false : true}
                    />
                </Form.Item>
                <Button
                    block
                    type="primary"
                    style={{ marginTop: 10 }}
                    disabled={user.isLoggedIn ? false : true}
                >
                    {user.isLoggedIn ? "Post" : "Log In to post your scream!"}
                </Button>
            </Form>
        </Card>
    );
}

export default FormPost;
