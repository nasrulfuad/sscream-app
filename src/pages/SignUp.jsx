/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Checkbox, Button, Form, Input, Row, Col, Card, Tooltip, Skeleton, message } from "antd";
import { QuestionCircleOutlined, HomeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { UserApi } from "../Api/UserApi";
import { Context, Types } from "../contexts";
import "../styles/SignUp.css";

export class SignUp extends React.Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isBtnLoading: false,
            isEmailError: false,
            isNicknameError: false,
            errors: {},
        };
    }

    componentDidMount() {
        this.setState(prev => ({ ...prev, isLoading: false }));
    }

    onFinish = async values => {
        this.setState(prev => ({ ...prev, isBtnLoading: true }));

        const response = await UserApi.signUp(values);

        if (response.status === "Ok") {
            const { data } = await UserApi.getProfile(response.token);
            this.context.dispatch({
                type: Types.SET_AUTHENTICATED,
                token: response.token,
                payload: data
            });
            message.success("Welcome to the scream app, sayangku!");
            return this.props.history.push("/");
        }

        if (response.handle)
            this.setState(prev => ({
                ...prev,
                isNicknameError: true,
                errors: { ...prev.errors, nickname: response.handle },
            }));

        if (response.email)
            this.setState(prev => ({
                ...prev,
                isEmailError: true,
                errors: { ...prev.errors, email: response.email },
            }));

        return this.setState(prev => ({ ...prev, isBtnLoading: false }));
    };

    fieldValidate(field) {
        const { errors, isNicknameError, isEmailError } = this.state;
        if (field === "email") {
            if (errors.email && isEmailError)
                return { validateStatus: "error", help: errors.email };
        } else {
            if (errors.nickname && isNicknameError)
                return { validateStatus: "error", help: errors.nickname };
        }
    }

    onFormChange(field) {
        if (field.handle) {
            this.setState(prev => ({
                ...prev,
                isNicknameError: false,
                errors: {
                    ...prev.errors,
                    nickname: undefined,
                },
            }));
        }
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
    }

    render() {
        const { isLoading, isBtnLoading } = this.state;

        return (
            <Row className="signup">
                <Col {...responsive}>
                    {isLoading ? (
                        <Card>
                            <Skeleton loading active />
                            <Skeleton loading active />
                        </Card>
                    ) : (
                        <Card>
                            <div className="signup__header">
                                <Button className="signup__headerBtn" size="small">
                                    <Link to="/">
                                        <HomeFilled />
                                    </Link>
                                </Button>
                                <h1>Sign Up</h1>
                            </div>
                            <Form
                                onFinish={this.onFinish}
                                onValuesChange={field => this.onFormChange(field)}
                                {...formItemLayout}
                            >
                                <Form.Item
                                    name="handle"
                                    {...this.fieldValidate("nickname")}
                                    label={
                                        <span>
                                            Nickname&nbsp;
                                            <Tooltip title="What do you want others to call you?">
                                                <QuestionCircleOutlined />
                                            </Tooltip>
                                        </span>
                                    }
                                    rules={rules.nickname}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    {...this.fieldValidate("email")}
                                    label="E-mail"
                                    rules={rules.email}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={rules.password}
                                    hasFeedback
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    dependencies={["password"]}
                                    hasFeedback
                                    rules={rules.confirmPass}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    name="agreement"
                                    valuePropName="checked"
                                    rules={rules.agreement}
                                    {...tailFormItemLayout}
                                >
                                    <Checkbox>
                                        I have read the <a href="#">agreement</a>
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={isBtnLoading}
                                        block
                                    >
                                        Register
                                    </Button>
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    <div>
                                        Already have an account?
                                        <Link to="/login"> Login</Link>
                                    </div>
                                </Form.Item>
                            </Form>
                        </Card>
                    )}
                </Col>
            </Row>
        );
    }
}

const responsive = {
    xxl: { span: 6 },
    xl: { span: 8 },
    lg: { span: 12 },
    md: { span: 13 },
    sm: { span: 14 },
    xs: { span: 22 },
};

const formItemLayout = {
    labelCol: {
        span: 24
    },
    wrapperCol: {
        span: 24
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        span: 24
    },
};

const rules = {
    nickname: [
        {
            required: true,
            message: "Please input your nickname without special characters!",
            whitespace: true,
            pattern: /^[a-zA-Z.0-9]+$/,
        },
    ],
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
            message: "Password minimal 6 characters",
            min: 6,
        },
    ],
    confirmPass: [
        {
            required: true,
            message: "Please confirm your password!",
        },
        ({ getFieldValue }) => ({
            validator(rule, value) {
                if (!value || getFieldValue("password") === value) return Promise.resolve();
                return Promise.reject("The two passwords that you entered do not match!");
            },
        }),
    ],
    agreement: [
        {
            validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject("Should accept agreement"),
        },
    ],
};
