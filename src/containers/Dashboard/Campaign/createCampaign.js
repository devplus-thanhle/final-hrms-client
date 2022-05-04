import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Upload,
  Typography,
  Spin,
  Select,
  Space,
} from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { InboxOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../../shared/actions/campaignAction";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;

const CreateCampaign = () => {
  const [componentSize, setComponentSize] = useState("default");
  const { loading } = useSelector((state) => state.campaigns);
  const [text, setText] = useState("");
  const [fileList, setFileList] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Please select time!",
      },
    ],
  };
  const onFinish = async (values) => {
    let startDate = new Date(values.rangeTimePicker[0]);
    let endDate = new Date(values.rangeTimePicker[1]);
    const data = new FormData();
    data.append("recfile", imageUrl);
    data.append("title", values.Name);
    data.append("description", text);
    data.append("address", values.Address);
    data.append("startDate", startDate);
    data.append("endDate", endDate);
    data.append("quantity", values.Quantity);
    data.append("technology", values.Technology);
    data.append("position", values.Position);

    console.log(startDate, endDate);

    await dispatch(createCampaign(data));
    navigate("/dashboard/campaign");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    console.log("text:", text);
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    const file = e.file;

    setFileList(file);
  };
  const [imageUrl, setImageUrl] = useState("");
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const onChanges = (info) => {
    let inforImage = info.file.originFileObj;
    getBase64(inforImage, (imageUrl) => {
      setImageUrl(imageUrl);
    });
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Title
          level={2}
          style={{ color: "rgb(64 169 255)", textAlign: "center" }}
        >
          Create Campaign
        </Title>
        <div>
          <Form
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 8,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
              Address: "368 Trần Hưng Đạo - Đà Nẵng",
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="Name"
              label="Name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Image"
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              required={true}
            >
              <Upload
                name="recfile"
                listType="picture-card"
                beforeUpload={false}
                showUploadList={false}
                onChange={onChanges}
              >
                {fileList ? <img src={imageUrl} alt="" /> : <InboxOutlined />}
              </Upload>
            </Form.Item>
            <Form.Item
              name="rangeTimePicker"
              label="Date"
              {...rangeConfig}
              rules={[
                { required: true, message: "Please input your Date Time" },
              ]}
            >
              <RangePicker
                showTime
                format="DD-MM-YYYY"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="Position"
              label="Position"
              rules={[
                { required: true, message: "Please check your Position!" },
              ]}
            >
              <Select placeholder="Position">
                <Option value="intern">Intern</Option>
                <Option value="fresher">Fresher</Option>
                <Option value="middle">Middle</Option>
                <Option value="junior">Junior</Option>
                <Option value="senior">Senior</Option>
                <Option value="hr">HR</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="Technology"
              label="Technology"
              rules={[
                { required: true, message: "Please check your Technology!" },
              ]}
            >
              <Select mode="tags" placeholder="Technology">
                <Option value="reactjs">ReactJs</Option>
                <Option value="vuejs">VueJs</Option>
                <Option value="nodejs">NodeJs</Option>
                <Option value="php">PHP</Option>
                <Option value="java">Java</Option>
                <Option value="python">Python</Option>
                <Option value="blockchain">BlockChain</Option>
                <Option value=".net">.Net</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="Quantity"
              rules={[
                { required: true, message: "Please input your Quantity!" },
              ]}
            >
              <InputNumber
                min={1}
                placeholder="Quantity"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              label="Address"
              name="Address"
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="Description"
              rules={[
                { required: true, message: "Please input your Description!" },
              ]}
            >
              <CKEditor
                editor={ClassicEditor}
                config={{ placeholder: "Description" }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setText(data);
                }}
              />
            </Form.Item>
            <Form.Item style={{ justifyContent: "center", textAlign: "end" }}>
              <Space>
                <Button>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </div>
  );
};

export default CreateCampaign;
