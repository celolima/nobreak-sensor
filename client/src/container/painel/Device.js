import React from 'react';
import { Card, CardText, CardBody, Col } from 'reactstrap';
import './Device.css';

const device = (props)  => {
  let topics = props.topics.map((t, index) => (
    <div key={index}>
      <li>{t.name}</li>
    </div>
  ));
  return (
    <Col sm="4">
      <Card>
        <CardBody onClick={props.clicked}>
          <CardText>{props.name}</CardText>
          <ul>
          {topics}
          </ul>
        </CardBody>
      </Card>
    </Col>
  );
}

export default device;