import { Button, Col, Form, Input, Row, Spin } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailResetPassword } from "../../shared/actions/loginAction";
import "./LogIn.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState({ email: "" });
  const { values } = email;
  const { loading } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(emailResetPassword({ email }));
  };
  return (
    <>
      <Spin spinning={loading}>
        <div className="App">
          <Row type="flex" justify="center" align="middle">
            <Col span={8}>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={handleSubmit}
              >
                <h2>Forgot password</h2>

                <Form.Item
                  labelCol={{
                    span: 5,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  label="Email"
                  name="email"
                  rules={[{ required: true }]}
                >
                  <Input
                    value={values}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </Spin>
    </>
  );
};

export default ForgotPassword;
