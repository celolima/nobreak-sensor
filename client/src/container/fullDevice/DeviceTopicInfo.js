import React from 'react';
import { Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap';

const deviceTopicInfo = (props)  => {
  let reactsCard = 'no reacts.';

  if(props.topic.reacts) {
    reactsCard = props.topic.reacts.map((react) => {
      return (
              <CardText key={react.id}>
                <span className='conditional'>if (</span>
                {props.topic.param} {react.condition} {react.value}
                <span className='conditional'>) then (</span>
                {react.action['actionType']} 
                <span className='conditional'>to</span> 
                {react.action['email']}{react.action['cel']}
                <span className='conditional'>)</span>
              </CardText>
              );
    });
  }
  
  return (
    <div>
        <Card>
          <CardBody>
            <CardTitle>{props.topic.param}</CardTitle>
            <CardSubtitle>{props.topic.topic}</CardSubtitle>
        </CardBody>
        <CardBody>
          {reactsCard}
        </CardBody>
        </Card>
    </div>
  );
}

export default deviceTopicInfo;