/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { PageHeader, Button, Menu, Dropdown, message } from "antd";
import { UserOutlined, LogoutOutlined, BellOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Context, Types } from "../contexts";
import "../styles/Header.css";

export class Header extends React.Component {
    static contextType = Context;

    onLogout = () => {
        this.context.dispatch({
            type: Types.SET_UNAUTHENTICATED
        });
        message.warning("You are now logged out", 5);
    }

    menu = () => (
        <Menu selectedKeys={window.location.pathname === "/profile" ? "profile" : ""}>
            <Menu.Item key="profile" className="header__itemDropdown">
                <Link to="/profile">
                    Profile
                    <UserOutlined />
                </Link>
            </Menu.Item>
            <Menu.Item key="logout" className="header__itemDropdown" onClick={this.onLogout}>
                <a>
                    Logout
                    <LogoutOutlined />
                </a>
            </Menu.Item>
        </Menu>
    )


    extra() {
        if (this.context.store.authenticated) {
            return (
                <React.Fragment key="button-top-header">
                    <Button className="header__btnNotification" icon={<BellOutlined />} size="large" shape="circle"></Button>
                    <Dropdown.Button
                        key="dropdown-user"
                        overlay={this.menu()}
                        trigger={["click"]}
                        icon={<UserOutlined />}
                    >
                        <Link to="/">Home</Link>
                    </Dropdown.Button>
                </React.Fragment>
            )
        }

        return (
            <div key="login-signup" className="header__loginSignup">
                <Button>
                    <Link to="/login">Sign In</Link>
                </Button>
                <Button>
                    <Link to="/signup">Sign Up</Link>
                </Button>
            </div>
        )
    }

    render() {
        return (
            <PageHeader
                className="header"
                ghost={false}
                title={<Link to="/">SScream App</Link>}
                extra={[this.extra()]}
            />
        );
    }
}
