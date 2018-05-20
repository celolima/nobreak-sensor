import React from 'react';
import { Card, CardBody, CardTitle, Col, Badge } from 'reactstrap';

const deviceTopicInfo = (props)  => {
  let reactsCard = <span className='reacts'>no reacts</span>;

  if(props.topic.reacts) {
    reactsCard = props.topic.reacts.map((react) => {
      return (
              <div className='reacts' key={react.id}>
                {props.topic.param} {react.condition} {react.value} => 
                {' '} envia {react.action['actionType']} para <span className='conditional'>{react.action['email']}{react.action['cel']}</span>
              </div>
              );
    });
  }
  
  return (
    <Col>
        <Card>
          <CardBody onClick={props.clicked}>
            <CardTitle className='d-inline-flex'>{props.topic.param}</CardTitle> 
            <h2>
              <Badge className='float-right' color={props.topicValue[props.topic.topic] === '---' ? 'warning' : 'success'}>
                {props.topicValue[props.topic.topic]}{' '}{props.topic.unMed}
              </Badge>
            </h2>
            <p className='reacts'>{props.topic.topic}</p>
        </CardBody>
        <CardBody>
            {reactsCard}
        </CardBody>
        </Card>
    </Col>
  );
}

export default deviceTopicInfo;