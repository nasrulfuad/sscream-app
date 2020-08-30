import React from "react";
import { PageHeader, Button, Menu, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const menu = (
    <Menu>
        <Menu.Item
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            Profile
            <UserOutlined />
        </Menu.Item>
        <Menu.Item
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            Logout
            <LogoutOutlined style={{ marginLeft: 20 }} />
        </Menu.Item>
    </Menu>
);

function Header() {
    return (
        <PageHeader
            ghost={false}
            title="Nabati"
            style={{
                position: "fixed",
                top: 0,
                width: "100%",
                zIndex: 1,
                borderBottom: "1px solid #ececec",
                boxShadow: "0 2px 8px #f0f1f2",
            }}
            extra={[
                <Dropdown overlay={menu} trigger={["click"]}>
                    <Button shape="square" size="large" type="primary">
                        <UserOutlined />
                    </Button>
                </Dropdown>,
            ]}
        />
    );
}

export default Header;
