import React from 'react';
import { Card, CardText, CardBody, Button } from 'reactstrap';
import './Device.css';

const device = (props)  => {
  return (
    <Card>
      <CardBody onClick={props.clicked}>
        <CardText>{props.desc}</CardText>                    
        <Button outline color="primary" size='sm'>edit</Button>{' '}
      </CardBody>
    </Card>
  );
}


export default device;