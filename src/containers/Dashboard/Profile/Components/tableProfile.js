import { Button, Divider, Table, Avatar, Image, Spin } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SelectStep from "./selectStep";
import ProgressProfile from "./progress";
import { getCampaign } from "../../../../shared/actions/campaignAction";
import SelectStatus from "./selectStatus";
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
        <Avatar src={<Image src={avatar} style={{ width: 32 }} />} />
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
      key: "status",
      render: (record) => <SelectStatus record={record} />,
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
        <Divider>
          <Button style={{ textAlign: "left" }} type="primary">
            <Link to="/dashboard/campaign/create">Add Profile</Link>
          </Button>
        </Divider>

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
