import React from 'react'
import './HomePage.css';
import 'antd/dist/antd.min.css';
import { Layout } from 'antd';
import AppHeader from './Layout/Header';
import AppHome from './home';
import AppFooter from './Layout/Footer';

const { Header,Content,Footer } = Layout;

function App() {
  return (
    
    <Layout className="mainLayout">
    <Header className='header-index'>
        <AppHeader/>
    </Header>
    <Content>
      <AppHome/>
    </Content>
    <Footer>
      <AppFooter/>
    </Footer>
  </Layout>
  );
}

export default App;