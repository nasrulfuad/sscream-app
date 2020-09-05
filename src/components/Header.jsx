import React from "react";
import { PageHeader, Button, Menu, Dropdown, message } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
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

    extra() {
        if (this.context.store.authenticated) {
            return (
                <Dropdown key="dropdown-user" overlay={menu(this.onLogout)} trigger={["click"]}>
                    <Button shape="square" size="large" type="primary">
                        <UserOutlined />
                    </Button>
                </Dropdown>
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
                ghost={false}
                title={<Link to="/">SScream App</Link>}
                style={{
                    position: "fixed",
                    top: 0,
                    width: "100%",
                    zIndex: 1,
                    borderBottom: "1px solid #ececec",
                    boxShadow: "0 2px 8px #f0f1f2",
                }}
                extra={[this.extra()]}
            />
        );
    }
}

const menu = onLogout => (
    <Menu>
        <Menu.Item key="profile" className="header__itemDropdown">
            Profile
            <UserOutlined />
        </Menu.Item>
        <Menu.Item key="logout" className="header__itemDropdown" onClick={onLogout}>
            Logout
            <LogoutOutlined style={{ marginLeft: 20 }} />
        </Menu.Item>
    </Menu>
)
