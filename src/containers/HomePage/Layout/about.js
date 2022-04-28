import { Col, Row } from 'antd'
import React from 'react'
import { DesktopOutlined, RiseOutlined, TeamOutlined } from "@ant-design/icons";

const items = [
    {
      key: '1',
      icon: <RiseOutlined />,
      title: 'High Performance',
      content: 'Learn how to use the latest techonology to produce high performance project',
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      title: 'Flat Design',
      content: 'Learn from our senior designers to get the best possible UI/UX experience for a product',
    },
    {
      key: '3',
      icon: <TeamOutlined />,
      title: 'Simplified Workflow',
      content: 'Learn how to work efficiently and effectively with Scrum framework.',
    },
  ]
  

function AppAbout() {
  return (
   <div id='about' className="block aboutBlock">
       <div className="container-fluid">
           <div className="titleHolder">
               <h2>About Us</h2>
           </div>
           <div className="contentHolder">
               <p>Skilled labour shortage for software companies but full of freshers and low level juniors. Our responsibility is filling the gap between the quality of graduate students and the quality of engineers. Devplus will help reducing the cost of re-training and accelerating the skill-up progress of students and freshers.</p>
           </div>
           <Row gutter={[16, 16]}>
               {items.map(item =>{
                   return(
                    <Col md={{span:8}}  key={item.key}>
                        <div className="content">
                            <div className="icon">
                               {item.icon}
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                        </div>
                    </Col>
                   )
               })}
            
           </Row>
       </div>
   </div>
  )
}

export default AppAbout