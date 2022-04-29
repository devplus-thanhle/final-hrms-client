import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Upload,
  Typography,
  Checkbox,
  Row,
  Col,
  Spin,
} from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { InboxOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign } from "../../../shared/actions/campaignAction";
const { RangePicker } = DatePicker;
const { Title } = Typography;

const CreateCampaign = () => {
  const [componentSize, setComponentSize] = useState("default");
  const { loading } = useSelector((state) => state.campaigns);
  const [text, setText] = useState("");
  const [fileList, setFileList] = useState("");
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
  const onFinish = (values) => {
    let startDate = new Date(values.rangeTimePicker[0]).toLocaleDateString();
    let endDate = new Date(values.rangeTimePicker[1]).toLocaleDateString();

    const data = new FormData();
    data.append("recfile", fileList);
    data.append("title", values.Name);
    data.append("description", text);
    data.append("address", values.Address);
    data.append("startDate", startDate);
    data.append("endDate", endDate);
    data.append("quantity", values.Quantity);
    // data.append("position", values.Position);
    data.append("technology", values.Technology);
    data.append("position", values.Position);

    // values.Technology.forEach((technology) => console.log(technology));

    dispatch(createCampaign(data));
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
            <Form.Item label="Image">
              <Form.Item
                name="dragger"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload.Dragger
                  name="recfile"
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single upload.
                  </p>
                </Upload.Dragger>
              </Form.Item>
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
                format="YYYY-MM-DD HH:mm"
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
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox value="Intern" style={{ margin: "0px 10px" }}>
                      Intern
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Fresher" style={{ margin: "0px 10px" }}>
                      Fresher
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Junior" style={{ margin: "0px 10px" }}>
                      Junior
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              name="Technology"
              label="Technology"
              rules={[
                { required: true, message: "Please check your Technology!" },
              ]}
            >
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox value="ReactJs" style={{ margin: "0px 10px" }}>
                      ReactJS
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="NodeJs" style={{ margin: "0px 10px" }}>
                      NodeJs
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Php" style={{ margin: "0px 10px" }}>
                      PHP
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="Quantity"
              rules={[
                { required: true, message: "Please input your Quantity!" },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item
              label="Address"
              name="Address"
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <Input />
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
                data="<p>What is your description!</p>"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setText(data);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </div>
  );
};

export default CreateCampaign;
