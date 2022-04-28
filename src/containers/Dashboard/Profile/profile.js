import { ExportOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Layout, Radio, Space } from "antd";
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
  const { profiles, count } = useSelector((state) => state.profiles);
  const [isCollapse, setIsCollapse] = useState(true);
  const handleShowCollapse = () => {
    setIsCollapse(!isCollapse);
  };
  const { search } = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const page = new URLSearchParams(search).get("page") || 1;
    setPage(Number(page));
  }, [search]);

  const onSearch = (value) => console.log(value);
  const onChange = (e) => {
    dispatch(filterProfiles(e.target.value));
  };

  useEffect(() => {
    dispatch(getProfiles(page));
  }, [dispatch, page]);

  return (
    <>
      <Layout>
        <Content>
          <div
            style={{
              backgroundColor: "#f1f1f1",
              padding: "10px",
              borderRadius: "5px",
              display: "flex",
            }}
          >
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              style={{ width: "30%" }}
              enterButton
            />
            <div
              style={{
                width: "70%",
                textAlign: "end",
                display: "flex",
                justifyContent: "end",
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
          </div>
          <ProfileTable
            profiles={profiles}
            count={count}
            navigate={navigate}
            page={page}
          />
        </Content>
        <Sider
          theme="light"
          collapsed={isCollapse}
          collapsedWidth={0}
          style={{
            border: "1px solid #e8e8e8",
            borderRadius: "5px",
          }}
        >
          <Divider style={{ fontWeight: "inherit" }}>Filter</Divider>

          <Radio.Group
            style={{ width: "100%", padding: "10px" }}
            onChange={onChange}
          >
            <Space direction="vertical">
              <Radio value="new">New</Radio>
              <Radio value="test">Test</Radio>
              <Radio value="interview">InterView</Radio>
              <Radio value="confirm">Confirm</Radio>
              <Radio value="reject">Reject</Radio>
            </Space>
          </Radio.Group>
        </Sider>
      </Layout>
    </>
  );
};

export default Profile;
