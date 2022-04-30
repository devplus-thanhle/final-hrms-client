import { Button, Divider, Table, Avatar, Image, Spin, Tag } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SelectStep from "./selectStep";
import ProgressProfile from "./progress";
import { getProfiles } from "../../../../shared/actions/profileAction";

const ProfileTable = ({ profiles, navigate, page, total }) => {
  const { loading } = useSelector((state) => state.profiles);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <Avatar
          src={<Image src={avatar} style={{ width: "100%", height: 100 }} />}
        />
      ),
    },
    {
      title: "Name Campaign",
      dataIndex: "campaignId",
      key: "fullname",
      render: (record) => <React.Fragment>{record.title}</React.Fragment>,
    },
    {
      title: "Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Progress",
      // dataIndex: "step",
      key: "step",
      align: "center",
      render: (record) => <ProgressProfile record={record} />,
    },
    {
      title: "Step",
      key: "step",
      render: (record) => <SelectStep record={record} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (record) => (
        <Tag
          color={
            record === "failed"
              ? "#ff0000"
              : record === "passed"
              ? "rgb(82 196 26)"
              : "#FF9800"
          }
        >
          {record}
        </Tag>
      ),
    },
    {
      key: "action",
      render: (record) => (
        <Button type="primary">
          <Link to={`/dashboard/profile/${record._id}`}>
            <span>Profile</span>
          </Link>
        </Button>
      ),
    },
  ];

  return (
    <>
      <Spin spinning={loading}>
        <Divider orientation="right"></Divider>

        <Table
          columns={columns}
          dataSource={profiles}
          size={"middle"}
          scroll={{ x: "700px" }}
          pagination={{
            pageSize: 5,
            total: total,
            current: page,
            onChange: (num) => {
              dispatch(getProfiles(num));
              navigate(`/dashboard/profile/?page=${num}`);
            },
          }}
        />
      </Spin>
    </>
  );
};

export default ProfileTable;
