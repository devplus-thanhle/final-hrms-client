import React, { useEffect, useState } from "react";
import { Tag, Card, Col, Row, Input, Pagination, Table } from "antd";
import { getCampaignActive } from "../../../shared/actions/campaignActiveAction";
import "./campaign.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
const { Meta } = Card;
const { Search } = Input;
const onSearch = (value) => console.log(value);

export default function Campaign() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { campaigns, count, loading } = useSelector((state) => state.campaignCandidates);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const page = new URLSearchParams(search).get("page") || 1;
    setPage(Number(page));
  }, [search]);

  useEffect(() => {
    dispatch(getCampaignActive(page));
  }, [dispatch, page]);
  return (
    <div className="campaign-container">
       <Row justify="center" >
       <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} span={5} className="cards_item" style={{ width: "20%" }}>
        <Search
          placeholder="Search Campaign"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Col>
      </Row>
      <>
        <Row justify="center" >
          {campaigns.map((campaign) => (
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} span={5} className="cards_item" >
              <Card>
                <div className="card_image">
                  <img
                    src={campaign.image}
                    style={{ aspectRatio: "1", width: "100%" }}
                  />
                </div>
                <div className="card_content">
                  
                  <h2 className="card_title">{campaign.title}</h2>
                  <p className="card_text" style={{ height: "auto" }}>
                    Technologies :   
                    {campaign.technology.map((tl) => (
                      <Tag
                        style={{
                          color: "#08979c",
                          backgroundColor: "#e6fffb",
                          borderColor: "#87e8de",
                        }}
                      >
                        {tl}
                      </Tag>
                    ))}
                  </p>
                  <p className="card_text" > Position: 
                    {campaign.position.map((ps) => (
                      <Tag
                        style={{
                          color: "green",
                          backgroundColor: "#f6ffed",
                          borderColor: "#b7eb8f",
                          
                        }}
                      >
                        {ps}
                      </Tag>
                    ))}
                  </p>
                  <p className="card_text">
                    End Day : {campaign.endDate.slice(0, 10)}
                  </p>
                  {/* <Link to={`/campaigns/detail/${campaign._id}`}>
                    <button className="btn card_btn">View Detail</button>
                  </Link> */}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </>
       <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} span={5}> 
        <Pagination
          defaultCurrent={1}
          pageSize = {8}
          total= {count}
          current={page}
          onChange={(num) => {
            dispatch(getCampaignActive(num));
            navigate(`/campaigns/?page=${num}`);
          }}
        />
      </Col> 
    </div>
  );
}
