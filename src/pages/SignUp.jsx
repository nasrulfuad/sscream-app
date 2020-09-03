/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import {
    Checkbox,
    Button,
    Form,
    Input,
    Row,
    Col,
    Card,
    Tooltip,
    Skeleton,
    message,
} from "antd";
import { QuestionCircleOutlined, HomeFilled } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { User as api } from "../Api/User";
import { user as UserContext } from "../contexts";
import "../styles/SignUp.css";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function SignUp() {
    const { user } = useContext(UserContext.context);
    const [form] = Form.useForm();
    const [errors, setErrors] = useState({});
    const [isUsernameError, setIsUsernameError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const onFinish = async values => {
        setIsBtnLoading(true);
        const response = await api.signUp(values);
        if (response.status === "Ok") {
            message.success("You are now registered, please log in!");
            return history.push("/login");
        }
        if (response.handle) {
            setErrors({ username: response.handle });
            setIsUsernameError(true);
        }
        if (response.email) {
            setErrors({ email: response.email });
            setIsEmailError(true);
        }
        return setIsBtnLoading(false);
    };

    const checkUserIsLoggedIn = () => {
        if (user.isLoggedIn) {
            message.warning("You have already logged in");
            return history.push("/");
        }
        setTimeout(() => setIsLoading(false), 1000);
    };

    useEffect(checkUserIsLoggedIn, []);

    const usernameValidate = () => {
        if (errors.username && isUsernameError) {
            return { validateStatus: "error", help: errors.username };
        }
    };

    const emailValidate = () => {
        if (errors.email && isEmailError) {
            return { validateStatus: "error", help: errors.email };
        }
    };

    const onFormChange = field => {
        if (field.handle) {
            setIsUsernameError(false);
            delete errors.username;
        }
        if (field.email) {
            setIsEmailError(false);
            delete errors.email;
        }
    };

    return (
        <Row className="signup">
            <Col lg={{ span: 10 }} sm={{ span: 15 }} xs={{ span: 22 }}>
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
                            form={form}
                            onFinish={onFinish}
                            onValuesChange={field => onFormChange(field)}
                            {...formItemLayout}
                        >
                            <Form.Item
                                name="handle"
                                {...usernameValidate()}
                                label={
                                    <span>
                                        Nickname&nbsp;
                                        <Tooltip title="What do you want others to call you?">
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    </span>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your nickname without whitespace!",
                                        whitespace: true,
                                        pattern: /^[a-zA-Z0-9]+$/,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                {...emailValidate()}
                                label="E-mail"
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
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Password minimal 6 characters",
                                        min: 6,
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                label="Confirm Password"
                                dependencies={["password"]}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please confirm your password!",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (
                                                !value ||
                                                getFieldValue("password") ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                "The two passwords that you entered do not match!"
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value
                                                ? Promise.resolve()
                                                : Promise.reject(
                                                      "Should accept agreement"
                                                  ),
                                    },
                                ]}
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

export default SignUp;
