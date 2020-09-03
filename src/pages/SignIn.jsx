/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from "react";
import {
    Checkbox,
    Button,
    Form,
    Input,
    Row,
    Col,
    Card,
    Skeleton,
    message,
} from "antd";
import { UserOutlined, LockOutlined, HomeFilled } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { User as api } from "../Api/User";
import "../styles/SignIn.css";
import { user as UserContext } from "../contexts";

function SignIn() {
    const { user, dispatch } = useContext(UserContext.context);

    const [form] = Form.useForm();
    const [errors, setErrors] = useState({});
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isBtnLoading, setisBtnLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const checkUserIsLoggedIn = () => {
        if (user.isLoggedIn) {
            message.warning("You have already logged in");
            return history.push("/");
        }
        setTimeout(() => setIsLoading(false), 1000);
    };

    useEffect(checkUserIsLoggedIn, []);

    const onFinish = async values => {
        setisBtnLoading(true);
        const response = await api.login(values);
        setisBtnLoading(false);

        if (response.status === "Ok") {
            dispatch({
                type: UserContext.types.login,
                user: response.data,
                token: response.token,
            });
            message.success("You are now logged in, enjoy your exploration", 5);
            return history.push("/");
        }

        if (response.email) {
            setErrors({ email: response.email });
            setIsEmailError(true);
        }

        if (response.password) {
            setErrors({ password: response.password });
            setIsPasswordError(true);
        }
    };

    const passwordValidate = () => {
        if (errors.password && isPasswordError) {
            return { validateStatus: "error", help: errors.password };
        }
    };

    const emailValidate = () => {
        if (errors.email && isEmailError) {
            return { validateStatus: "error", help: errors.email };
        }
    };

    const onFormChange = field => {
        if (field.email) {
            setIsEmailError(false);
            delete errors.email;
        }
        if (field.password) {
            setIsPasswordError(false);
            delete errors.password;
        }
    };

    return (
        <Row className="login">
            <Col lg={{ span: 6 }} sm={{ span: 15 }} xs={{ span: 22 }}>
                {isLoading ? (
                    <Card>
                        <Skeleton loading active />
                    </Card>
                ) : (
                    <Card>
                        <div className="login__header">
                            <Button className="login__headerBtn" size="small">
                                <Link to="/">
                                    <HomeFilled />
                                </Link>
                            </Button>
                            <h1>Login</h1>
                        </div>
                        <Form
                            form={form}
                            onFinish={onFinish}
                            onValuesChange={field => onFormChange(field)}
                        >
                            <Form.Item
                                name="email"
                                {...emailValidate()}
                                hasFeedback
                                rules={[
                                    {
                                        type: "email",
                                        message:
                                            "The input is not valid E-mail!",
                                    },
                                    {
                                        required: true,
                                        message: "Please input your E-mail!",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={
                                        <UserOutlined className="site-form-item-icon" />
                                    }
                                    placeholder="Email"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                {...passwordValidate()}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={
                                        <LockOutlined className="site-form-item-icon" />
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a className="login__forgot" href="#">
                                    Forgot password
                                </a>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    loading={isBtnLoading}
                                >
                                    Log in
                                </Button>
                                Or <Link to="/signup">register now!</Link>
                            </Form.Item>
                        </Form>
                    </Card>
                )}
            </Col>
        </Row>
    );
}

export default SignIn;
