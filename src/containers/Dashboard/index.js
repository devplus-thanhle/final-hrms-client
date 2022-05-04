/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Layout, Menu, Space, Avatar, Dropdown, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  AreaChartOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import RootRouter from "./Router";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { logOut } from "../../shared/actions/loginAction";
import { updateCampaignDateNow } from "../../shared/actions/campaignAction";

const { Header, Sider, Content } = Layout;

const navigation = [
  {
    name: "Statistic",
    path: "/dashboard",
    icon: <AreaChartOutlined />,
  },
  {
    name: "Campaign",
    path: "/dashboard/campaign",
    icon: <ReadOutlined />,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: <UserOutlined />,
  },
];

const Dasboard = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        dispatch(logOut());
      }
    } else {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (!token) navigate("/login");
  });

  useEffect(() => {
    dispatch(updateCampaignDateNow());
  });
  const handleLogout = () => {
    dispatch(logOut());
  };

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
          <Header
            className="site-layout-background header-avatar"
            style={{ padding: 0 }}
          >
            {React.createElement(open ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: "trigger",
              onClick: () => setOpen(!open),
            })}
            <Dropdown
              overlay={() => (
                <Menu>
                  <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
                </Menu>
              )}
              placement="bottomRight"
              arrow
            >
              <Avatar src={user.avatar} style={{ marginRight: "20px" }} />
            </Dropdown>
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
