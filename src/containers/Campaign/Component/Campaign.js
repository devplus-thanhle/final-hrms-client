/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Tag,
  Card,
  Col,
  Row,
  Input,
  Pagination,
  Table,
  Carousel,
  Image,
  Layout,
  Divider,
  Typography,
  Radio,
  Space,
  Button,
} from "antd";
import { HomeFilled } from "@ant-design/icons";
import {
  getCampaignActive,
  filterCampaignActive,
} from "../../../shared/actions/campaignActiveAction";
import "./campaign.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const { Meta } = Card;
const { Search } = Input;
const onSearch = (value) => console.log(value);

const Campaign = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { campaigns, count, loading, total } = useSelector(
    (state) => state.campaignCandidates
  );
  const [page, setPage] = useState(1);
  const [position, setPosition] = useState("");
  const [technology, setTechnology] = useState("");
  const [isCollapse, setIsCollapse] = useState(true);
    
  const handleShowCollapse = () => {
    setIsCollapse(!isCollapse);
  };
  const handleSubmit = (value) => {
    navigate({
      pathname: "/campaigns",
      search: `?search=${search}&page=${page}&position=${position}&technology=${technology}`,
    });
    dispatch(filterCampaignActive({ position, technology, page, value }));
  };

  useEffect(() => {
    const page = new URLSearchParams(search).get("page") || 1;
    setPage(Number(page));
  }, [search]);

  useEffect(() => {
    const value = new URLSearchParams(search).get("search") || "";
    const position = new URLSearchParams(search).get("position") || "";
    setPosition(position);

    const technology = new URLSearchParams(search).get("technology") || "";
    setTechnology(technology);
    if (search) {
      dispatch(filterCampaignActive({ position, technology, page, value }));
    } else {
      dispatch(getCampaignActive(page));
    }
  }, [dispatch, page]);
  const handleReset = () => {
    setPosition("");
    setTechnology("");
    navigate({
      pathname: "/campaigns",
    });

    dispatch(getCampaignActive());
  };
  return (
    <div>
       <Row justify="center">
      <Col span={6}>
      <Space className="search_div">
        <Search
          placeholder="Search Keyword skill (NodeJs, ReactJs...), Job Title, Company..."
          allowClear
          enterButton="Search"
          size="large"
          onSearch={(value) => {
            handleSubmit(value);
          }}
          className="search_button"
        />
        <Button className="reset_button" onClick={handleReset} type="primary">
          Reset
        </Button>
      </Space>
      </Col>
    </Row>
     

      <Layout>
        
        <Sider className="sider_campaigns">
          <Title level={3}>
            <Text strong>Filter:</Text>
          </Title>
          <Divider plain></Divider>
          <Radio.Group
            style={{
              width: "100%",
              padding: "10px",
            }}
            onChange={(e) => setPosition(e.target.value)}
            value={position}
          >
            <Title level={5}>
              <Text type="secondary">Position</Text>
            </Title>

            <Space direction="vertical">
              <Radio value="Intern">Intern</Radio>
              <Radio value="Junior">Junior</Radio>
              <Radio value="Senior">Senior</Radio>
              <Radio value="Fresher">Fresher</Radio>
              <Radio value="Middle">Middle</Radio>
              <Radio value="HR">HR</Radio>
            </Space>
          </Radio.Group>
          <Divider plain></Divider>
          <Radio.Group
            style={{
              width: "100%",
              padding: "10px",
            }}
            onChange={(e) => setTechnology(e.target.value)}
            value={technology}
          >
            <Title level={5}>
              <Text type="secondary">Technology</Text>
            </Title>

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
        </Sider>
        <Content className="content_campaigns">
          <Title level={3}>Recommended Jobs</Title>
          <Row gutter={[16, 16]}>
            {campaigns.map((item) => (
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
                xl={8}
                span={5}
                className="cards_item"
              >
                <Card
                  className="card_campaigns"
                  hoverable
                  style={{ width: 320 }}
                  cover={<img className="image_card" src={item.image} />}
                >
                  <Title level={4}>
                    <Text strong>{item.title}</Text>
                  </Title>
                  {item.technology.map((technology) => (
                    <Tag
                      style={{
                        color: "#08979c",
                        backgroundColor: "#e6fffb",
                        borderColor: "#87e8de",
                        borderRadius: "10px",
                      }}
                    >
                      {technology}
                    </Tag>
                  ))}

                  <Title className="title_position" level={5}>
                    <Text type="secondary">Position:</Text>
                    <Tag
                      className="tag_position"
                      style={{
                        color: "green",
                        backgroundColor: "#f6ffed",
                        borderColor: "#b7eb8f",
                      }}
                    >
                      {item.position}
                    </Tag>
                  </Title>
                  <Text className="date_card">
                    {new Date(item.startDate).toLocaleDateString("vi-GB")} -
                    {new Date(item.endDate).toLocaleDateString("vi-GB")}
                  </Text>
                  <br></br>
                  <HomeFilled className="icon_card" />
                  <Text className="text_address" strong>
                    {item.address}
                  </Text>
                  <Button
                    className="button_campaign"
                    type="primary"
                    shape="round"
                    size="large"
                  >
                    Apply
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
      <br></br>
      <Pagination
        style={{ float: "right" }}
        pageSize={9}
        total={total}
        defaultCurrent={10}
        current={page}
        onChange={(num) => {
          dispatch(getCampaignActive(num));
          navigate(`/campaigns/?page=${num}`);
        }}
      />
    </div>
  );
};
export default Campaign;
