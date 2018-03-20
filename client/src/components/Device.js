import React from 'react';
import { Card, CardText, CardBody, Col } from 'reactstrap';
import './Device.css';

const device = (props)  => {
  return (
    <Col sm="4">
      <Card>
        <CardBody onClick={props.clicked}>
          <CardText>{props.desc}</CardText>
        </CardBody>
      </Card>
    </Col>
  );
}


export default device;