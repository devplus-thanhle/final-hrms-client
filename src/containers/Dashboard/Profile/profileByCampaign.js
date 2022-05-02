import {
  Avatar,
  Button,
  Divider,
  Image,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProfileByCampaign } from "../../../shared/actions/profileAction";
import ProgressProfile from "./Components/progress";
import SelectStep from "./Components/selectStep";

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
    key: "step",
    align: "center",
    render: (record) => <ProgressProfile record={record} />,
  },
  {
    title: "Step",
    key: "status",
    render: (record) => <SelectStep record={record} />,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (record) => <Tag color="blue">{record}</Tag>,
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

const ProfieByCampaign = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profiles } = useSelector((state) => state);
  const { loading } = useSelector((state) => state.profiles);

  useEffect(() => {
    dispatch(getProfileByCampaign(id));
  }, [dispatch, id]);

  return (
    <>
      <Spin spinning={loading}>
        <Typography.Title level={3}>{profiles.title}</Typography.Title>
        <Divider />

        <Table columns={columns} dataSource={profiles.profiles} />
      </Spin>
    </>
  );
};

export default ProfieByCampaign;
