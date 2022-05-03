import React, { useState, useEffect } from "react";
import "./LogIn.css";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import { Form, Input, Button, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../shared/actions/loginAction"
import { useNavigate } from "react-router-dom"

const LogIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const token = useSelector(state => state.login.token);
    const msg = useSelector(state => state.login.message);
    const err = useSelector(state => state.login.error)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            navigate("/dashboard")
        }
    }, [token, navigate])

    const handleSubmit = async () => {
        dispatch(loginAction(username, password))
    };
    return (
        <>
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
                            <h2>Login</h2>
                            {err && <div className="alert">
                                <Alert
                                    message="Error"
                                    description={msg}
                                    type="error"
                                    showIcon
                                    closable
                                />
                            </div>}

                            <Form.Item
                                labelCol={{
                                    span: 5,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                label="Username"
                                name="username"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item
                                labelCol={{
                                    span: 5,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true },
                                ]}
                            >
                                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default LogIn;
