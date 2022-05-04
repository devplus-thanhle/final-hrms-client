import React, { useState } from "react";
import { Form, Input, Upload, InputNumber, Button, Breadcrumb, message } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useDispatch, useSelector } from "react-redux";
import { createProfile } from "../../../shared/actions/profileAction";
import { Navigate, useNavigate } from "react-router-dom";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export default function ApplyCV() {
  const navigate = useNavigate()
  const [fileList, setFileList] = useState("");
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [pdf, setPdf] = useState("");
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    const file = e.file;
    setFileList(file);
  };

  const data = new FormData();
  const onChange1 = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };
  const onChange2 = (e) => {
    const pdf = e.target.files[0];
    setPdf(pdf);
  };

  const paramId = window.location.pathname.split("/").pop();
  const onFinish = (values) => {
    data.append("fullname", values.name);
    data.append("email", values.email);
    data.append("phone", values.phone);
    data.append("detail", values.detail);
    data.append("image", image);
    data.append("pdf", pdf);
    data.append("id", paramId);
    navigate('/campaigns');
    message.success('Thank You!');
    dispatch(createProfile(data, paramId));
  };
  return (
    <div>
      <Breadcrumb
        style={{
          margin: "16px 0",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        <Breadcrumb.Item>Apply CV</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="phone" label="Phone"   rules={[
            {
              required: true,
            },
          ]}>
          <Input type='number'/>
        </Form.Item>
        <Form.Item name="detail" label="Detail"  rules={[
            {
              required: true,
            },
          ]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="image"
          label="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="Upload Avatar"
          
        >
         
            <Input
              accept=".png, .jpg"
              type="file"
              name="image"
              onChange={(e) => {
                onChange1(e);
              }}
              rules={[
                {
                  required: true,
                },
              ]}
            ></Input>
        </Form.Item>

        <Form.Item label="CV">
          <Form.Item
            name="dragger"
            valuePropName="filelist"
            getValueFromEvent={normFile}
            noStyle
            
          >
            <Input
              accept=".pdf"
              type="file"
              name="image"
              onChange={(e) => {
                onChange2(e);
              }}
              rules={[
                {
                  required: true,
                },
              ]}
            ></Input>
          </Form.Item>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
