import React from 'react';
import { Card, CardText, CardBody, Button, Col } from 'reactstrap';
import './Device.css';

const device = (props)  => {
  return (
    <Col sm="4">
      <Card>
        <CardBody onClick={props.clicked}>
          <CardText>{props.desc}</CardText>                    
          <Button outline color="primary" size='sm'>edit</Button>{' '}
        </CardBody>
      </Card>
    </Col>
  );
}


export default device;