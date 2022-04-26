import React from "react";
import { Button, DatePicker, version } from "antd";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>antd version: {version}</h1>
      <DatePicker />
      <Button type="primary" style={{ marginLeft: 8 }}>
        Primary Button
      </Button>
      <Link to="/dashboard">aaaaa</Link>
    </div>
  );
};

export default HomePage;
