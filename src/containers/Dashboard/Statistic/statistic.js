import React, { useEffect } from "react";
import "./statistic.css";
import { Col, Row, Divider, Tag, Progress, Statistic, Spin } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignOfMonth } from "../../../shared/actions/campaignAction";

const TopCard = ({ title, tagContent, tagColor, prefix }) => {
  return (
    <div
      className="whiteBox shadow"
      style={{ color: "#595959", fontSize: 13, height: "106px" }}
    >
      <div
        className="pad15 strong"
        style={{ textAlign: "center", justifyContent: "center" }}
      >
        <h3 style={{ color: "#22075e", marginBottom: 0 }}>{title}</h3>
      </div>
      <Divider style={{ padding: 0, margin: 0 }}></Divider>
      <div className="pad15">
        <Row gutter={[0, 0]}>
          <Col className="gutter-row" span={11} style={{ textAlign: "left" }}>
            <div className="left">{prefix}</div>
          </Col>
          <Col className="gutter-row" span={2}>
            <Divider
              style={{ padding: "10px 0", justifyContent: "center" }}
              type="vertical"
            ></Divider>
          </Col>
          <Col
            className="gutter-row"
            span={11}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Tag
              color={tagColor}
              style={{ margin: "0 auto", justifyContent: "center" }}
            >
              {tagContent}
            </Tag>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const PreviewState = ({ tag, color, value }) => {
  let colorCode = "#000";
  switch (color) {
    case "bleu":
      colorCode = "#1890ff";
      break;
    case "green":
      colorCode = "#95de64";
      break;
    case "red":
      colorCode = "#ff4d4f";
      break;
    case "orange":
      colorCode = "#ffa940";
      break;
    case "purple":
      colorCode = "#722ed1";
      break;
    case "grey":
      colorCode = "#595959";
      break;
    case "cyan":
      colorCode = "#13c2c2";
      break;
    case "brown":
      colorCode = "#614700";
      break;
    default:
      break;
  }
  return (
    <div style={{ color: "#595959", marginBottom: 5 }}>
      <div className="left alignLeft">{tag}</div>
      <div className="right alignRight">{value} %</div>
      <Progress
        percent={value}
        showInfo={false}
        strokeColor={{
          "0%": colorCode,
          "100%": colorCode,
        }}
      />
    </div>
  );
};
const Statistics = () => {
  const dispatch = useDispatch();
  const { campaignOfMonth, loading } = useSelector((state) => state.campaigns);
  useEffect(() => {
    dispatch(getCampaignOfMonth());
  }, [dispatch]);
  return (
    <Spin spinning={loading}>
      <div className="site-card-wrapper">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12} xl={6}>
            <TopCard
              title={"Campaign"}
              tagColor={"cyan"}
              prefix={"This month"}
              tagContent={campaignOfMonth?.campaign}
            />
          </Col>
          <Col xs={24} md={12} xl={6}>
            <TopCard
              title={"Profile"}
              tagColor={"purple"}
              prefix={"This month"}
              tagContent={campaignOfMonth?.profile}
            />
          </Col>
          <Col xs={24} md={12} xl={6}>
            <TopCard
              title={"Accepted"}
              tagColor={"green"}
              prefix={"All"}
              tagContent={campaignOfMonth?.profileAccept}
            />
          </Col>
          <Col xs={24} md={12} xl={6}>
            <TopCard
              title={"Processing"}
              tagColor={"orange"}
              prefix={"All"}
              tagContent={campaignOfMonth?.profileProcessing}
            />
          </Col>
        </Row>
        <div className="space30"></div>
        <Row gutter={[24, 24]}>
          <Col className="gutter-row" span={18}>
            <div className="whiteBox shadow" style={{ height: "380px" }}>
              <Row className="pad10" gutter={[0, 0]}>
                <Col className="gutter-row" span={24}>
                  <div className="pad15">
                    <h3 style={{ color: "#22075e", marginBottom: 15 }}>
                      Percentage of profile's status on all campaigns
                    </h3>
                    <PreviewState
                      tag={"Accepted"}
                      color={"purple"}
                      value={(
                        campaignOfMonth?.profileAccept *
                        (100 / campaignOfMonth?.allProfiles)
                      ).toFixed(2)}
                    />
                    <PreviewState
                      tag={"Processing"}
                      color={"green"}
                      value={(
                        campaignOfMonth?.profileProcessing *
                        (100 / campaignOfMonth?.allProfiles)
                      ).toFixed(2)}
                    />
                    <PreviewState
                      tag={"Rejected"}
                      color={"red"}
                      value={
                        campaignOfMonth?.profileReject *
                        (100 / campaignOfMonth?.allProfiles).toFixed(2)
                      }
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="whiteBox shadow" style={{ height: "380px" }}>
              <div
                className="pad20"
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                <h3 style={{ color: "#22075e", marginBottom: 30 }}>
                  Acceptance Rate
                </h3>
                <Progress
                  type="dashboard"
                  percent={(
                    campaignOfMonth?.profileAccept *
                    (100 / campaignOfMonth?.allProfiles)
                  ).toFixed(2)}
                  width={148}
                />
                <Divider />
                <Statistic
                  title="Up to"
                  value={(
                    campaignOfMonth?.profileAccept *
                    (100 / campaignOfMonth?.allProfiles)
                  ).toFixed(2)}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </div>
            </div>
          </Col>
        </Row>
        <div className="space30"></div>
      </div>
    </Spin>
  );
};

export default Statistics;
