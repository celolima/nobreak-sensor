import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Col, Badge } from 'reactstrap';

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
          <CardBody>
            <CardTitle className='d-inline-flex'>{props.topic.param}</CardTitle> <Badge className='float-right' color="success">{props.topicValue[props.topic.topic]}</Badge>
            <CardSubtitle>{props.topic.topic}</CardSubtitle>
        </CardBody>
        <CardBody>
            {reactsCard}
        </CardBody>
        </Card>
    </Col>
  );
}

export default deviceTopicInfo;