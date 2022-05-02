import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import RootRouter from "./Router";
import "./campaignActive.css";
import { Link } from "react-router-dom";
import AppFooter from "../HomePage/Layout/Footer";
const { Header, Content, Footer } = Layout;
export default function index() {
  return (
    <>
     {/* fontamily: 'Open Sans', sans-serif, margin-bottom: 30px */}
      <header className="header-campaign">
        <div className="overlay">
          <Link to ={`/`}>
          <img style={{width: "36%"}} src="https://devplus.asia/assets/images/devplus/Artboard_2.png"></img>
          </Link>
          <h3 className="h3_css" style={{color: "white"  }}>WE DEVELOP | WE SUPPORT | WE IMPROVE</h3>
        </div>
      </header>
      <Layout className="layout">
        <Content style={{ padding: "20px 50px", backgroundColor: "white" }}>
          <div className="site-layout-content">
            <RootRouter />
          </div>
        </Content>
        <Footer>
          <AppFooter/>
        </Footer>
      </Layout>
    </>
  );
}
