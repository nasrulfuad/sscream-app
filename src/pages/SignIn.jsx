/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Checkbox, Button, Form, Input, Row, Col, Card, Skeleton, message } from "antd";
import { UserOutlined, LockOutlined, HomeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { UserApi } from "../Api/UserApi";
import { Context, Types } from "../contexts";
import "../styles/SignIn.css";

export class SignIn extends React.Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            isPasswordError: false,
            isEmailError: false,
            isBtnLoading: false,
            isLoading: true,
        };
    }

    componentDidMount() {
        this.setState(prev => ({ ...prev, isLoading: false }));
    }

    onFinish = async values => {
        this.setState(prev => ({
            ...prev,
            isBtnLoading: true,
        }));

        const response = await UserApi.login(values);

        if (response.status === "Ok") {
            const { data } = await UserApi.getProfile();
            this.context.dispatch({
                type: Types.SET_AUTHENTICATED,
                token: response.token,
                payload: data
            });
            message.success("You are now logged in, enjoy your exploration, sayangku!", 5);
            return this.props.history.push("/");
        }

        if (response.email)
            this.setState(prev => ({
                ...prev,
                isEmailError: true,
                errors: {
                    ...prev.errors,
                    email: response.email,
                },
            }));

        if (response.password)
            this.setState(prev => ({
                ...prev,
                isPasswordError: true,
                errors: {
                    ...prev.errors,
                    password: response.password,
                },
            }));

        return this.setState(prev => ({
            ...prev,
            isBtnLoading: false,
        }));
    };

    fieldValidate(field) {
        const { errors, isPasswordError, isEmailError } = this.state;
        if (field === "email") {
            if (errors.email && isEmailError)
                return { validateStatus: "error", help: errors.email };
        } else {
            if (errors.password && isPasswordError)
                return { validateStatus: "error", help: errors.password };
        }
    }

    onFormChange(field) {
        if (field.email) {
            this.setState(prev => ({
                ...prev,
                isEmailError: false,
                errors: {
                    ...prev.errors,
                    email: undefined,
                },
            }));
        }
        if (field.password) {
            this.setState(prev => ({
                ...prev,
                isPasswordError: false,
                errors: {
                    ...prev.errors,
                    password: undefined,
                },
            }));
        }
    }

    render() {
        const { isBtnLoading, isLoading } = this.state;

        return (
            <Row className="login">
                <Col
                    xl={{ span: 6 }}
                    lg={{ span: 8 }}
                    md={{ span: 10 }}
                    sm={{ span: 15 }}
                    xs={{ span: 22 }}
                >
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
                                onFinish={values => this.onFinish(values)}
                                onValuesChange={field => this.onFormChange(field)}
                            >
                                <Form.Item
                                    name="email"
                                    {...this.fieldValidate("email")}
                                    hasFeedback
                                    rules={rules.email}
                                >
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="Email"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    {...this.fieldValidate("password")}
                                    hasFeedback
                                    rules={rules.password}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
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
                                        onClick={this.siap}
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
}

const rules = {
    email: [
        {
            type: "email",
            message: "The input is not valid E-mail!",
        },
        {
            required: true,
            message: "Please input your E-mail!",
        },
    ],
    password: [
        {
            required: true,
            message: "Please input your password!",
        },
    ],
};
