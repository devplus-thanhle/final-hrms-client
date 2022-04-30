import { Button, Divider, Modal, DatePicker, TimePicker } from "antd";
import React, { useState } from "react";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import {
  changeStatus,
  changeStepSingle,
} from "../../../../shared/actions/profileAction";

const { Option } = Select;

const SelectStep = ({ record }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [idProfile, setIdProfile] = useState("");

  const [status, setStatus] = useState("");
  const onChangeValue = async (e, id) => {
    setIdProfile(id);
    setStatus(e);
    switch (e) {
      case "new":
        await dispatch(changeStepSingle({ id, e }));
        await dispatch(changeStatus({ id, e: "processing" }));
        break;
      case "test":
        showModal();
        break;
      case "interview":
        showModal();
        break;
      case "consider":
        await dispatch(changeStepSingle({ id, e }));
        await dispatch(changeStatus({ id, e: "processing" }));
        break;
      case "confirm":
        await dispatch(changeStepSingle({ id, e }));
        await dispatch(changeStatus({ id, e: "processing" }));
        break;
      case "reject":
        await dispatch(changeStepSingle({ id, e }));
        await dispatch(changeStatus({ id, e: "failed" }));
        break;
      case "employee":
        await dispatch(changeStepSingle({ id, e }));
        await dispatch(changeStatus({ id, e: "passed" }));
        break;
      default:
        break;
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(changeStepSingle({ id: idProfile, e: status, date, time }));
    dispatch(changeStatus({ id: idProfile, e: "processing" }));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Select
        value={record.step}
        onChange={(e) => {
          onChangeValue(e, record._id);
        }}
        style={{ width: 100, height: "fit-content" }}
      >
        <Option value="new">NEW</Option>
        <Option value="test">TEST</Option>
        <Option value="interview">INTERVIEW</Option>
        <Option value="confirm">CONFIRM</Option>
        <Option value="consider">CONSIDER</Option>
        <Option value="employee">EMPLOYEE</Option>
        <Option value="reject">REJECT</Option>
      </Select>
      <Modal
        title="Enter information"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closeIcon={<span onClick={handleCancel}>X</span>}
      >
        <>
          <DatePicker onChange={(date, dateString) => setDate(dateString)} />
          <TimePicker
            format="HH:mm"
            onOk={(time) => {
              setTime(new Date(time).toLocaleTimeString());
            }}
          />
        </>
        <Divider />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button disabled={date && time ? false : true} onClick={handleOk}>
            {date && time ? "😃 OK!" : "😢 Value empty!"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SelectStep;
