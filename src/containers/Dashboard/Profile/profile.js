import {
  ExportOutlined,
  FilterOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Input,
  Layout,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProfiles,
  getProfiles,
} from "../../../shared/actions/profileAction";
import ProfileTable from "./Components/tableProfile";
import { useLocation, useNavigate } from "react-router-dom";

const { Search } = Input;
const { Sider, Content } = Layout;

const Profile = () => {
  const dispatch = useDispatch();
  const { profiles, total } = useSelector((state) => state.profiles);
  const [isCollapse, setIsCollapse] = useState(true);
  const handleShowCollapse = () => {
    setIsCollapse(!isCollapse);
  };
  const { search } = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [step, setStep] = useState("");
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState();

  // console.log(searchText);

  const handleSubmit = (value) => {
    navigate({
      pathname: "/dashboard/profile",
      search: `?search=${value}&page=${page}&step=${step}&status=${status}`,
    });
    dispatch(filterProfiles({ step, status, page, value }));
  };

  useEffect(() => {
    const page = new URLSearchParams(search).get("page") || 1;
    setPage(Number(page));
  }, [search]);

  useEffect(() => {
    const searchParams = new URLSearchParams(search).get("search") || "";
    setSearchText(searchParams);
    const step = new URLSearchParams(search).get("step") || "";
    setStep(step);
    const status = new URLSearchParams(search).get("status") || "";
    setStatus(status);
    if (search) {
      dispatch(filterProfiles({ step, status, page, searchText }));
    } else {
      dispatch(getProfiles(page));
    }
  }, [page, dispatch]);

  const handleReset = () => {
    setStep("");
    setStatus("");
    navigate({
      pathname: "/dashboard/profile",
    });

    dispatch(getProfiles());
  };

  return (
    <>
      <Layout>
        <Content>
          <div
            style={{
              backgroundColor: "#f1f1f1",
              padding: "10px",
              borderRadius: "5px",
              // display: "flex",
            }}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12} xl={12}>
                <Search
                  placeholder="input search text"
                  onSearch={(value) => {
                    setSearchText(value);
                    handleSubmit(value);
                  }}
                  style={{ width: "50%" }}
                  enterButton
                />
                <Button onClick={handleReset} type="primary">
                  Reset
                </Button>
              </Col>
              <Col xs={24} md={12} xl={12}>
                <div
                  style={{
                    // width: "70%",
                    textAlign: "end",
                    // display: "flex",
                    // justifyContent: "end",
                  }}
                >
                  <Space>
                    <Button
                      onClick={handleShowCollapse}
                      type="default"
                      icon={<FilterOutlined />}
                    >
                      Filter
                    </Button>
                    <Button type="default" icon={<ExportOutlined />}>
                      Export
                    </Button>
                  </Space>
                </div>
              </Col>
            </Row>
          </div>
          <ProfileTable
            profiles={profiles}
            navigate={navigate}
            page={page}
            total={total}
          />
        </Content>
        <Sider
          theme="light"
          collapsed={isCollapse}
          collapsedWidth={0}
          style={{
            border: "1px solid #e8e8e8",
            // borderRadius: "5px",
          }}
        >
          <div style={{ padding: "15px" }}>
            <MenuUnfoldOutlined
              onClick={() => setIsCollapse(true)}
              style={{ fontSize: "20px" }}
            />
            <Typography.Title level={4} style={{ textAlign: "center" }}>
              Filter
            </Typography.Title>
            <Typography.Title level={5}>Step</Typography.Title>
            <Radio.Group
              style={{
                width: "100%",
                padding: "10px",
              }}
              onChange={(e) => setStep(e.target.value)}
              value={step}
            >
              <Space direction="vertical">
                <Radio value="cvnew">Cv New</Radio>
                <Radio value="phone">Phone</Radio>
                <Radio value="test">Test</Radio>
                <Radio value="interview">Interview</Radio>
                <Radio value="offer">Offer</Radio>
              </Space>
            </Radio.Group>
            <Typography.Title level={5}>Status</Typography.Title>

            <Radio.Group
              style={{ width: "100%", padding: "10px" }}
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <Space direction="vertical">
                <Radio value="pending">Pending</Radio>
                <Radio value="passed">Passed</Radio>
                <Radio value="reject">Reject</Radio>
              </Space>
            </Radio.Group>
            <Divider />
            <Space style={{ marginLeft: "10px" }}>
              <Button type="primary" danger onClick={handleReset}>
                Reset
              </Button>
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Space>
          </div>
        </Sider>
      </Layout>
    </>
  );
};

export default Profile;
