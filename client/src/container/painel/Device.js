import React from 'react';
import { Card, CardText, CardBody, Col } from 'reactstrap';
import './Device.css';

const device = (props)  => {
  let topics = props.topics.map((t, index) => (
    <div key={index}>
      <CardText>[{t.id}] {t.param}: {t.topic}</CardText>
    </div>
  ));
  return (
    <Col sm="4">
      <Card>
        <CardBody onClick={props.clicked}>
          <CardText>{props.desc}</CardText>
          {topics}
        </CardBody>
      </Card>
    </Col>
  );
}


export default device;