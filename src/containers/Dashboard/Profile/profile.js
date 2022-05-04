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
import * as XLSX from "xlsx";

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
  // const [searchText, setSearchText] = useState();

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
    const value = new URLSearchParams(search).get("search") || "";
    // setSearchText(value);
    const step = new URLSearchParams(search).get("step") || "";
    setStep(step);
    const status = new URLSearchParams(search).get("status") || "";
    setStatus(status);
    if (search) {
      dispatch(filterProfiles({ step, status, page, value }));
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

  const handleExport = () => {
    console.log(profiles);
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(profiles);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "profiles.xlsx");
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
            }}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12} xl={12}>
                <Search
                  placeholder="Search Name Profile, Email"
                  onSearch={(value) => {
                    handleSubmit(value);
                  }}
                  style={{ width: "50%" }}
                  enterButton
                  allowClear
                />
                <Button onClick={handleReset} type="primary">
                  Reset
                </Button>
              </Col>
              <Col xs={24} md={12} xl={12}>
                <div
                  style={{
                    textAlign: "end",
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
                    <Button
                      onClick={handleExport}
                      type="default"
                      icon={<ExportOutlined />}
                    >
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
                <Radio value="new">New</Radio>
                <Radio value="test">TEST</Radio>
                <Radio value="interview">INTERVIEW</Radio>
                <Radio value="confirm">CONFIRM</Radio>
                <Radio value="consider">CONSIDER</Radio>
                <Radio value="employee">EMPLOYEE</Radio>
                <Radio value="reject">REJECT</Radio>
              </Space>
            </Radio.Group>
            <Typography.Title level={5}>Status</Typography.Title>

            <Radio.Group
              style={{ width: "100%", padding: "10px" }}
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <Space direction="vertical">
                <Radio value="processing">PROCESSING</Radio>
                <Radio value="passed">PASSED</Radio>
                <Radio value="failed">FAILED</Radio>
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
