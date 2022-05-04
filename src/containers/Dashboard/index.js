/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Space,
  Avatar,
  Dropdown,
  Button,
  Typography,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  AreaChartOutlined,
  ReadOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import RootRouter from "./Router";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { logOut } from "../../shared/actions/loginAction";
import { updateCampaignDateNow } from "../../shared/actions/campaignAction";

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

const navigation = [
  // {
  //   name: "Dashboard",
  //   path: "/dashboard",
  //   icon: <ThunderboltOutlined />,
  // },
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
const logo = [
  {
    name: "ST United",
    path: "/dashboard",
    icon: <ThunderboltOutlined />,
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
          <div className="logo">
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["/"]}
              selectedKeys={[location.pathname]}
            >
              {logo.map((item, index) => (
                <Menu.Item icon={item.icon}>
                  <Link to={item.path}>{item.name}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </div>
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
            <Space>
              <Dropdown
                overlay={() => (
                  <Menu>
                    <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
                  </Menu>
                )}
                placement="bottomRight"
                arrow
              >
                <Avatar src={user.avatar} style={{ marginRight: "5px" }} />
              </Dropdown>
              <Title className="title_HR" level={5}>
                {user.fullname}
              </Title>
            </Space>
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
