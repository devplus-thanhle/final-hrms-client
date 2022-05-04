/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import { HomeFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Layout,
  Pagination,
  Radio,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import {
  filterCampaignActive,
  getCampaignActive,
} from "../../../shared/actions/campaignActiveAction";
import "./campaign.css";
import ViewDetailCampaign from "./viewDetailCampaign";

const { Header, Footer, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const { Meta } = Card;
const { Search } = Input;
const onSearch = (value) => console.log(value);

const Campaign = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [idCampaigns, setidCampaigns] = useState();
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
      search: `?search=${value}&page=${page}&position=${position}&technology=${technology}`,
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
        <Col   >
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
            <Button
              className="reset_button"
              onClick={handleReset}
              type="primary"
              size="large"
            >
              Reset
            </Button>
          </Space>
        </Col>
      </Row>
       <Row>       
      <Layout className="layout_campaigns">
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

            <Space direction="vertical" wrap={true}>
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

            <Space direction="vertical" wrap={true}>
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
          <div className="campaigns__list--wrapper">
            {campaigns.map((item) => (
              
                <Link to={`/campaigns/detail/${item._id}`}>
                  <Card
                    className="card_campaigns"
                    hoverable
                    // style={{ width: 320 }}
                    cover={<img className="image_card" src={item.image} />}
                  >
                    <Title level={4}>
                      <Text strong>
                        {item.title.length < 30
                          ? item.title
                          : item.title.slice(0, 20) + "..."}
                      </Text>
                    </Title>
                    <div style={{display: "flex", gap: "5px", alignItems: "center", justifyContent: "flex-start"}}>
                      {item?.technology?.map((technology) => (
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
                    </div>

                    <Title className="title_position" level={5}>
                      <Text type="secondary">Position:</Text>
                      <Tag
                        className="tag_position"
                        style={{
                          color: "green",
                          backgroundColor: "#f6ffed",
                          borderColor: "#b7eb8f",
                          width: "fit-content"
                        }}
                      >
                        {item.position}
                      </Tag>
                    </Title>
                    <div style={{marginTop: "auto"}}>
                      <Text className="date_card">
                        {new Date(item.startDate).toLocaleDateString("vi-GB")} -
                        {new Date(item.endDate).toLocaleDateString("vi-GB")}
                      </Text>
                      <br></br>
                      <HomeFilled className="icon_card" />
                      <Text className="text_address" strong>
                        {item.address}
                      </Text>
                      <Link to={`/campaigns/apply/${item._id}`}>
                        <Button
                          className="button_campaign"
                          type="primary"
                          shape="round"
                          size="large"
                        >
                          Apply
                        </Button>
                    </Link>
                    </div>
                  </Card>
                </Link>
            ))}
          </div>
        </Content>
      </Layout>
      </Row>
      <br></br>
      <Pagination
        style={{ float: "right" }}
        pageSize={3}
        total={total}
        // defaultCurrent={3}
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
