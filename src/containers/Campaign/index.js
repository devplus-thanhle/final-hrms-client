import React from "react";
import { Layout, Menu, Breadcrumb} from "antd";
import RootRouter from "./Router";
import "./index.css";
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;
export default function index() {
  return (
    <>
      <header>
        <div className="overlay">
          <Link to ={`/`}>
          <img src="https://devplus.asia/assets/images/devplus/Artboard_2.png"></img>
          </Link>
          <h3 style={{color: "white"}}>WE DEVELOP | WE SUPPORT | WE IMPROVE</h3>
        
        </div>
      </header>
      <Layout className="layout">
        <Content style={{ padding: "20px 50px", backgroundColor: "white" }}>
          <div className="site-layout-content">
            <RootRouter />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}
