import React, { useContext } from "react";
import { PageHeader, Button, Menu, Dropdown, message } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { user as UserContext } from "../contexts";
import "../styles/Header.css";

function Header() {
    const { user, dispatch } = useContext(UserContext.context);

    const onLogout = () => {
        dispatch({
            type: UserContext.types.logout,
        });
        message.warning("You are now logged out", 5);
    };

    const menu = (
        <Menu>
            <Menu.Item key="profile" className="header__itemDropdown">
                Profile
                <UserOutlined />
            </Menu.Item>
            <Menu.Item
                key="logout"
                className="header__itemDropdown"
                onClick={onLogout}
            >
                Logout
                <LogoutOutlined style={{ marginLeft: 20 }} />
            </Menu.Item>
        </Menu>
    );

    const extra = () => {
        if (user.isLoggedIn) {
            return (
                <Dropdown
                    key="dropdown-user"
                    overlay={menu}
                    trigger={["click"]}
                >
                    <Button shape="square" size="large" type="primary">
                        <UserOutlined />
                    </Button>
                </Dropdown>
            );
        } else {
            return (
                <div key="login-signup">
                    <Button>
                        <Link to="/login">Sign In</Link>
                    </Button>
                    <Button>
                        <Link to="/signup">Sign Up</Link>
                    </Button>
                </div>
            );
        }
    };

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
            extra={[extra()]}
        />
    );
}

export default Header;
