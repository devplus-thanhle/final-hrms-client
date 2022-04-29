import { BackTop, Typography, Space, Row, Col, Button } from 'antd';
import React from 'react';
import { UpCircleTwoTone, PhoneOutlined, MailOutlined, LinkedinOutlined, HomeOutlined, FacebookOutlined} from "@ant-design/icons";

const { Text, Title } = Typography;

function AppFooter() {
  let getYear = () => {
    let currentYear = new Date().getFullYear();
    return currentYear;
  }
  return (
    <div className="container-fluid">
 <Row style={{ padding: '20px 0' }} gutter={[48, 48]}>
               <Col xs={24} sm={8} lg={4}>
                  <Title level={4} style={{ color: '#000000' }}>
                     <Space size={'small'} >
                        More
                     </Space>
                  </Title>
                  <Space direction='vertical'>
                     <Button 
                        type="text"
                        href='https://stunited.vn/'
                        style={{ display: 'block', width: '120px' }}
                     >
                        ST United
                     </Button>
                     <Button
                        type="text"
                        href='https://devplus.asia/'
                        style={{ display: 'block', width: '120px' }}
                     >
                        DevPlus
                     </Button>
                  </Space>
               </Col>
               <Col xs={24} sm={8} lg={4}>
                  <Title level={4} style={{ color: '#000000' }}>
                     <Space size={'small'}>

                        Social
                     </Space>
                  </Title>
                  <Space direction='vertical'>
                  <a href="https://www.linkedin.com/company/stutd?trk=public_post_share-update_actor-text"><LinkedinOutlined style={{ fontSize: '200%'}}/></a>
                     <a href="https://www.facebook.com/Devplusprogramme"><FacebookOutlined style={{ fontSize: '200%'}}/></a>
                  </Space>
               </Col>
               <Col>
                  <Title level={4} style={{ color: '#000000' }}>
                     <Space size={'small'}>
                        Contact
                     </Space>
                  </Title>
                  <Space
                     direction='vertical'
                     size='small'
                     style={{ display: 'flex' }}
                  >
                     <Text style={{ color: '#000000' }}>
                        <Space>
                           <HomeOutlined />
                           368 Đường Trần Hưng Đạo, An Hải, An Hải Tây, Sơn Trà,
                           Đà Nẵng
                        </Space>
                     </Text>
                     <Text style={{ color: '#000000' }}>
                        <Space>
                           <PhoneOutlined />
                           (+84) 368492885
                        </Space>
                     </Text>
                     <Text style={{ color: '#000000' }}>
                        <Space>
                           <MailOutlined />
                           hello@stunited.vn
                        </Space>
                     </Text>
                  </Space>
               </Col>
               <Col xs={24} sm={8} lg={4}>
                  <Title level={4} style={{ color: '#000000' }}>
                     <Space size={'small'} >
                        Legal
                     </Space>
                  </Title>
                  <Space direction='vertical'>
                     <Button
                        type="text"
                        href='/comingsoon'
                        style={{ display: 'block', width: '120px' }}
                     >
                      Privacy Policy
                     </Button>
                     <Button
                        type="text"
                        href='/comingsoon'
                        style={{ display: 'block', width: '120px' }}
                     >
                      Term of Service
                     </Button>
                  </Space>
               </Col>
            </Row>

        <div>Created by team Felicity on &copy; {getYear()} from STUnited </div>
        <BackTop>
          <div className="goTop"><i><UpCircleTwoTone style={{ fontSize: '200%'}}/></i></div>
        </BackTop>
       </div>
      
  
  );
}

export default AppFooter;