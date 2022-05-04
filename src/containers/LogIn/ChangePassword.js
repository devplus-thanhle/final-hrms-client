import { Button, Col, Form, Input, Row, Spin } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../shared/actions/loginAction";
import "./LogIn.css";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { id } = useParams();
  const { loading } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    let data = { password, id };
    dispatch(resetPassword(data));
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
                  label="Password"
                  name="password"
                  rules={[{ required: true }]}
                >
                  <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  labelCol={{
                    span: 5,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  label="Repeat Password"
                  name="repeatPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Change
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

export default ChangePassword;
