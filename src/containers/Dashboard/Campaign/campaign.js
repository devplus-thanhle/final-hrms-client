/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCampaign,
  filterCampaign,
} from "../../../shared/actions/campaignAction";
import {
  Table,
  Tag,
  Button,
  Divider,
  Space,
  Spin,
  Typography,
  Input,
  Col,
  Row,
  Radio,
  Layout,
} from "antd";

import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  ExportOutlined,
  FilterOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";

const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const columns = [
  {
    title: "Name",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
    render: (text) => <Tag color="blue">{text}</Tag>,
    filters: [
      {
        text: "Intern",
        value: "Intern",
      },
      {
        text: "Junior",
        value: "Junior",
      },
      {
        text: "Senior",
        value: "Senior",
      },
      {
        text: "Fresher",
        value: "Fresher",
      },
      {
        text: "Middle",
        value: "Middle",
      },
      {
        text: "HR",
        value: "HR",
      },
    ],
    onFilter: (value, record) => record.position.indexOf(value) === 0,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Technology",
    dataIndex: "technology",
    key: "technology",
    render: (technology) =>
      technology.map((tech, index) => (
        <Tag key={index} color="orange">
          {tech}
        </Tag>
      )),
  },
  {
    title: "Start Day",
    dataIndex: "startDate",
    key: "startDate",
    render: (record) => (
      <React.Fragment>
        {new Date(record).toLocaleDateString("vi-GB")}
      </React.Fragment>
    ),
    sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
  },
  {
    title: "End Day",
    dataIndex: "endDate",
    key: "endDate",
    render: (record) => (
      <React.Fragment>
        {new Date(record).toLocaleDateString("vi-GB")}
      </React.Fragment>
    ),
    sorter: (a, b) => moment(a.endDate).unix() - moment(b.endDate).unix(),
  },
  {
    title: "Status",
    dataIndex: "active",
    key: "active",
    render: (active) => (
      <React.Fragment>
        {active ? (
          <Tag color="blue">active</Tag>
        ) : (
          <Tag color="red">disable</Tag>
        )}
      </React.Fragment>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (record) => (
      <Space>
        <Button type="primary">
          <Link to={`/dashboard/campaign/${record._id}/profile`}>
            <span>Profile</span>
          </Link>
        </Button>
        <Divider type="vertical" />
        <Button type="danger">
          <Link to={`/dashboard/campaign/${record._id}/edit`}>
            <span>Edit</span>
          </Link>
        </Button>
      </Space>
    ),
  },
];

const Campaign = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
  const { campaigns, total, loading } = useSelector((state) => state.campaigns);
  const [page, setPage] = useState(1);
  const [position, setPosition] = useState("");
  const [technology, setTechnology] = useState("");
  const [isCollapse, setIsCollapse] = useState(true);
  const handleShowCollapse = () => {
    setIsCollapse(!isCollapse);
  };
  const handleSubmit = (value) => {
    navigate({
      pathname: "/dashboard/campaign",
      search: `?search=${value}&page=${page}&position=${position}&technology=${technology}`,
    });
    dispatch(filterCampaign({ position, technology, page, value }));
  };
  const handleReset = () => {
    setPosition("");
    setTechnology("");
    navigate({
      pathname: "/dashboard/campaign",
    });

    dispatch(getCampaign());
  };
  useEffect(() => {
    const page = new URLSearchParams(search).get("page") || 1;
    setPage(Number(page));
  }, [search]);

  useEffect(() => {
    dispatch(getCampaign(page));
  }, [dispatch, page]);

  const handleExport = () => {
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(campaigns);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "campaigns.xlsx");
  };

  return (
    <>
      <Layout>
        <Content>
          <Spin spinning={loading}>
            <Typography.Title level={4}>Campaigns</Typography.Title>
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
                    placeholder="Search name, address,...."
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

            <Divider orientation="right" orientationMargin={10}>
              <Button type="primary">
                <Link to="/dashboard/campaign/create">Create Campaign</Link>
              </Button>
            </Divider>
            <Table
              columns={columns}
              dataSource={campaigns}
              size={"middle"}
              scroll={{ x: "700px" }}
              pagination={{
                pageSize: 5,
                total: total,
                current: page,
                onChange: (num) => {
                  dispatch(getCampaign(num));
                  navigate(`/dashboard/campaign/?page=${num}`);
                },
              }}
            ></Table>
          </Spin>
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
            <Typography.Title level={5}>Position</Typography.Title>
            <Radio.Group
              style={{
                width: "100%",
                padding: "10px",
              }}
              onChange={(e) => setPosition(e.target.value)}
              value={position}
            >
              <Space direction="vertical">
                <Radio value="Intern">Intern</Radio>
                <Radio value="Junior">Junior</Radio>
                <Radio value="Senior">Senior</Radio>
                <Radio value="Fresher">Fresher</Radio>
                <Radio value="Middle">Middle</Radio>
                <Radio value="HR">HR</Radio>
              </Space>
            </Radio.Group>
            <Typography.Title level={5}>Technology</Typography.Title>

            <Radio.Group
              style={{ width: "100%", padding: "10px" }}
              onChange={(e) => setTechnology(e.target.value)}
              value={technology}
            >
              <Space direction="vertical">
                <Radio value="NodeJs">NodeJs</Radio>
                <Radio value="ReactJs">ReactJs</Radio>
                <Radio value="Php">Php</Radio>
                <Radio value="VueJs">VueJs</Radio>
                <Radio value="Python">Python</Radio>
                <Radio value="Blockchain">Blockchain</Radio>
                <Radio value="Java">Java</Radio>
                <Radio value=".Net">.Net</Radio>
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

export default Campaign;
