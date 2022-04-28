import React from 'react';
import image1 from '../../../assets/images/modern-design.jpg';
import image2 from '../../../assets/images/clean-design.jpg';
import image3 from '../../../assets/images/great-support.jpg';
import { Row, Col } from 'antd';
import { Card } from 'antd';
const { Meta } = Card;

function AppFeature() {
  return (
    <div id="feature" className="block featureBlock bgGray">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Key Features and Benefits</h2>
          <p>What you can expect from the company</p>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              cover={<img alt="Feature 1" src={image1} />}
            >
              <Meta title="Inhouse Workstation" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              cover={<img alt="Feature 2" src={image2} />}
            >
              <Meta title="Open Workspace for Communication" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              cover={<img alt="Feature 3" src={image3} />}
            >
              <Meta title="Flexible Work Time" />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AppFeature;