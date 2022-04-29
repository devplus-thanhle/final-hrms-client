import { Button, Divider, Modal, Input, Typography, Space } from "antd";
import React, { useState } from "react";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../../../shared/actions/profileAction";

const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;

const SelectStatus = ({ record }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idProfile, setIdProfile] = useState("");
  const [valueReject, setValueReject] = useState("");
  const [status, setStatus] = useState("");
  const onChangeValue = async (e, id) => {
    setIdProfile(id);
    setStatus(e);
    switch (e) {
      case "pending":
        console.log("pending", { e, id });
        await dispatch(changeStatus({ id, e }));
        break;
      case "passed":
        console.log("passed", { e, id });
        await dispatch(changeStatus({ id, e }));
        break;
      case "reject":
        console.log("reject", { e, id });

        showModalReject();
        break;
      default:
        break;
    }
  };

  const showModalReject = () => {
    setIsModalVisible(true);
  };

  const handleReject = () => {
    dispatch(changeStatus({ id: idProfile, e: status, valueReject }));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Select
        value={record.status}
        onChange={(e) => {
          onChangeValue(e, record._id);
        }}
        style={{ width: 100, height: "fit-content" }}
      >
        <Option value="pending">PENDING</Option>
        <Option value="passed">PASSED</Option>
        <Option value="reject">REJECT</Option>
      </Select>
      <Modal
        title="Enter information"
        visible={isModalVisible}
        onOk={handleReject}
        onCancel={handleCancel}
        footer={null}
        closeIcon={<span onClick={handleCancel}>X</span>}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Text>Reason:</Text>
          <TextArea
            placeholder="Reject Reason"
            onChange={(e) => setValueReject(e.target.value)}
          />
        </Space>

        <Divider />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button disabled={valueReject ? false : true} onClick={handleReject}>
            {valueReject ? "😃 OK!" : "😢 Value empty!"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SelectStatus;
