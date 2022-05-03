import React, { useEffect, useState } from "react";
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
import {
  getCampaignById,
  updateCampaign,
} from "../../../shared/actions/campaignAction";
import { useParams } from "react-router-dom";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;

const EditCampaign = () => {
  const [componentSize, setComponentSize] = useState("default");
  const { loading, campaign } = useSelector((state) => state.campaigns);
  const [form] = Form.useForm();
  const [text, setText] = useState("");
  const [fileList, setFileList] = useState("");
  const dispatch = useDispatch();

  const { id } = useParams();
  const initState = {
    title: "",
    description: "",
    address: "",
    startDate: "",
    endDate: "",
    quantity: "",
    position: [],
    technology: [],
    image: "",
  };
  const [campaignData, setCampaignData] = useState(initState);
  const {
    title,
    description,
    address,
    startDate,
    endDate,
    quantity,
    position,
    technology,
    image,
    active,
  } = campaignData;

  useEffect(() => {
    dispatch(getCampaignById(id));
  }, [dispatch, id, form]);

  useEffect(() => {
    campaign && setCampaignData(campaign);
  }, [campaign]);
  useEffect(() => {
    form.setFieldsValue({
      title: title,
      description: description,
      address: address,
      rangeTimePicker: [moment(startDate), moment(endDate)],
      status: active === true ? "Active" : "Disable",
      quantity,
      position: position,
      technology: technology,
      image: image,
    });
  });

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
    let startDate = new Date(values.rangeTimePicker[0]);
    let endDate = new Date(values.rangeTimePicker[1]);

    const data = new FormData();
    data.append("recfile", imageUrl);
    data.append("title", values.title);
    data.append("description", values.description);
    data.append("address", values.address);
    data.append("startDate", startDate);
    data.append("endDate", endDate);
    data.append("quantity", values.quantity);
    data.append("technology", values.technology);
    data.append("position", values.position);
    data.append("status", values.status);

    console.log(values.description);

    dispatch(updateCampaign({ id: campaignData._id, data }));
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
          Edit Campaign
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
            form={form}
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            onFinish={onFinish}
          >
            <Form.Item
              name="title"
              label="Title"
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
                {fileList ? (
                  <img src={imageUrl} alt="" />
                ) : image ? (
                  <img src={image} alt="" />
                ) : (
                  <InboxOutlined />
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              name="rangeTimePicker"
              label="Date"
              rules={[
                { required: true, message: "Please input your Date Time" },
              ]}
            >
              <RangePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please input your Status!" }]}
            >
              <Select>
                <Option value={true}>Active</Option>
                <Option value={false}>Disable</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="position"
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
              name="technology"
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
              name="quantity"
              rules={[
                { required: true, message: "Please input your Quantity!" },
              ]}
            >
              <InputNumber min={1} placeholder="Quantity" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              valuePropName="data"
              getValueFromEvent={(event, editor) => {
                const data = editor.getData();
                return data;
              }}
              rules={[
                { required: true, message: "Please input your Description!" },
              ]}
            >
              <CKEditor
                editor={ClassicEditor}
                config={{ placeholder: "Description" }}
                // data={description}
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

export default EditCampaign;
