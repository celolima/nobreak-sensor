import React from 'react';
import { Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle, Col } from 'reactstrap';

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
            <CardTitle>{props.topic.param}</CardTitle>
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