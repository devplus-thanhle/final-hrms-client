import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"
import { HomeFilled } from "@ant-design/icons";

import { Row, Col, Space, Typography, Button, Image, Tag, Divider  } from "antd";
import { SettingOutlined, CalendarOutlined } from "@ant-design/icons";
import { getCampaignById } from "../../../shared/actions/campaignAction";
const { Text, Title } = Typography;
export default function ViewDetailCampaign() {
  const id = window.location.pathname.split("/").pop();
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(getCampaignById(id));
  }, []);
  const todo = useSelector((state) => state.campaigns.campaigns);

  const viewPageCompany = () => {
    const url = "https://stunited.vn/";
    window.open(url, "_blank");
  };
  return (
    <div>
      <Row  >
        <Col  xs={24} sm={24} md={24} lg={16} xl={16} style={{backgroundColor: "#dfe6e9"}}>
        <Space className="space-apply">
              <div className="title_detail">{todo[0]?.title}</div>
              <Link to={``}>
            <Button className="button-apply" type="primary" danger>
              Apply CV
            </Button>
            </Link>
            </Space>
          <Row justify="center">
          <Col xs={23} sm={23} md={23} lg={15} xl={15}>
              <Divider />
              <div className="position_detail">Position:
              <Tag className="positionTag_detail"
              style={{
                        color: "green",
                        backgroundColor: "#f6ffed",
                        borderColor: "#b7eb8f",
                      }} >
              {todo[0]?.position}
              </Tag>
              </div>
              <div className="position_detail">Technology:
             {todo[0]?.technology.map((technology) => (
                <Tag className="technologyTag_detail"
                  style={{
                    color: "#08979c",
                    backgroundColor: "#e6fffb",
                    borderColor: "#87e8de",
                  }}
                >
                  {technology}
                  </Tag>
              ))}
              </div>

              <Text className="Datelimit_Text" >
                {new Date(todo[0]?.startDate).toLocaleDateString("vi-GB")}-{new Date(todo[0]?.endDate).toLocaleDateString("vi-GB")}
              </Text>
              <br></br>
              <HomeFilled className="icon_card" />
                  <Text className="text_address" strong>
                  {todo[0]?.address}
                  </Text>
              <Divider />
            </Col>
            <Col offset={1} xs={0} sm={0} md={0} lg={6} xl={6}>
              <img src={todo[0]?.image} style={{ width: "100%", objectFit: "contain" }}></img>
           
            </Col>
          </Row>
          <Row  span={24} style={{margin: "0 4%"}} >
            <div className="description_detail" dangerouslySetInnerHTML=
            {{
              __html: todo[0]?.description,
            }}
            style={{ objectFit: "contain" }}
            >
            
            </div>
            <>

            </>
          </Row>  
        </Col>
        <Col className="company_detail" offset={2} xs={0} sm={0} md={0} lg={6} xl={6}>
          <Space
          className="space_company"
            direction="vertical"
            size="middle"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src="https://stunited.vn/wp-content/uploads/2019/09/stunited-e15650013362301.png"
              preview={false}
              style={{ width: "100%", objectFit:'contain' }}
              className="campaign__detail--image"
            />
            <Title level={4}>ST United</Title>
            <Row>
              <Space size={"middle"}>
                <Text>
                  <SettingOutlined /> Products
                </Text>
                <Text>
                  <CalendarOutlined /> Monday - Friday
                </Text>
              </Space>
            </Row>
            <Text>368 Tran Hung Dao - Da Nang</Text>
            <Button type="primary" onClick={() => viewPageCompany()}>
              View Our Company Page
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
