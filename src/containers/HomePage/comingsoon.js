import React from 'react'
import './HomePage.css';
import 'antd/dist/antd.min.css';
import { Layout, Carousel, Button, Space } from 'antd';
import { LinkedinOutlined, FacebookOutlined} from "@ant-design/icons";
import AppHeader from './Layout/Header';
import AppFooter from './Layout/Footer';

const { Header,Content,Footer } = Layout;

const comingsoontexts = [
    {
      key: '1',
      title: 'COMING SOON',
      content: 'follow us on social media to know when it is ready!',
    }
  ]

function App() {
  return (
    <Layout className="mainLayout">
    <Header className='header-index'>
        <AppHeader/>
    </Header>
    <Content>
    <div id="comingsoon" className="comingsoonBlock">
    <Carousel >
        {comingsoontexts.map(comingsoontext=>{
            return(
                <div className="container-fluid" key={comingsoontext.key}>
                    <div className="content">
                       <h3>{comingsoontext.title}</h3>
                       <p> {comingsoontext.content}</p>
                       <div className='btnHolder'>
                       <Space direction='vertical'>
                           <Space direction='horizontal'>
                  <a href="https://www.linkedin.com/company/stutd?trk=public_post_share-update_actor-text"><LinkedinOutlined style={{ fontSize: '200%'}}/></a>
                     <a href="https://www.facebook.com/Devplusprogramme"><FacebookOutlined style={{ fontSize: '200%'}}/></a>
                           </Space>
                       <Button type="primary" href="/" size='large'>Turn back</Button>
                  </Space>
                       </div>
                    </div>
                </div>
            )
        })}
  </Carousel>,
   </div>
   
    </Content>
    <Footer>
      <AppFooter/>
    </Footer>
  </Layout>
  );
}

export default App;