/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Layout, Menu, Space } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import RootRouter from "./Router";
import { Link, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const navigation = [
  {
    name: "Statistic",
    path: "/dashboard",
    icon: <UserOutlined />,
  },
  {
    name: "Campaign",
    path: "/dashboard/campaign",
    icon: <UserOutlined />,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: <VideoCameraOutlined />,
  },
];

const Dasboard = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  console.log(location);

  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={open} collapsedWidth="70">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["/"]}
            selectedKeys={[location.pathname]}
          >
            {navigation.map((item, index) => (
              <Menu.Item key={item.path} icon={item.icon}>
                <Link to={item.path}>{item.name}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(open ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: "trigger",
              onClick: () => setOpen(!open),
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              height: "100%",
              overflow: "scroll",
            }}
          >
            <RootRouter />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dasboard;
