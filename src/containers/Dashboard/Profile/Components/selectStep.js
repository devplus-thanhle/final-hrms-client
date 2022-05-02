import { Button, Divider, Modal, Radio, Input } from "antd";
import React, { useState } from "react";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { changeStepSingle } from "../../../../shared/actions/profileAction";

const { Option } = Select;

const SelectStep = ({ record }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalReject, setModalReject] = useState(false);
  const [idProfile, setIdProfile] = useState("");
  const [valueReject, setValueReject] = useState();
  const [status, setStatus] = useState("");
  const [linkDateTime, setLinkDateTime] = useState("");
  const onChangeValue = async (e, id) => {
    setIdProfile(id);
    setStatus(e);
    switch (e) {
      case "new":
        await dispatch(
          changeStepSingle({ id, e, linkDateTime, valueStatus: "processing" })
        );
        break;
      case "test":
        showModal();
        break;
      case "interview":
        showModal();
        break;
      case "consider":
        await dispatch(
          changeStepSingle({ id, e, linkDateTime, valueStatus: "processing" })
        );
        break;
      case "confirm":
        await dispatch(
          changeStepSingle({ id, e, linkDateTime, valueStatus: "processing" })
        );
        break;
      case "reject":
        setModalReject(true);
        break;
      case "employee":
        await dispatch(
          changeStepSingle({
            id,
            e,
            linkDateTime,
            valueStatus: "passed",
            position: record.campaignId.position,
          })
        );
        break;
      default:
        break;
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(
      changeStepSingle({
        id: idProfile,
        e: status,
        linkDateTime,
        valueStatus: "processing",
      })
    );
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalReject(false);
  };
  const onChange = (e) => {
    setValueReject(e.target.value);
  };
  const handleOkReject = () => {
    if (valueReject === "") {
      alert("Please input reason reject");
    } else {
      dispatch(
        changeStepSingle({
          id: idProfile,
          e: status,
          linkDateTime,
          valueStatus: "failed",
          valueReject,
        })
      );
      setModalReject(false);
    }
    setValueReject("");
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
          <Input
            placeholder="Please paste link Date and time"
            onChange={(e) => setLinkDateTime(e.target.value)}
          />
        </>
        <Divider />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button disabled={linkDateTime ? false : true} onClick={handleOk}>
            {linkDateTime ? "😃 OK!" : "😢 Value empty!"}
          </Button>
        </div>
      </Modal>

      <Modal
        title="Choose reason reject"
        visible={modalReject}
        onOk={handleOkReject}
        onCancel={handleCancel}
        footer={null}
      >
        <>
          <Radio.Group onChange={onChange} value={valueReject}>
            <Radio value={1}>Refuse To CV</Radio>
            <Radio value={2}>Refuse To Test/Interview</Radio>
          </Radio.Group>
        </>
        <Divider />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            disabled={valueReject ? false : true}
            onClick={handleOkReject}
          >
            {valueReject ? "😃 OK!" : "😢 Value empty!"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SelectStep;
