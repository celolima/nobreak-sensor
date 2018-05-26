import React from 'react';
import { Card, CardBody, CardTitle, Badge } from 'reactstrap';

const deviceTopicInfo = (props)  => {
  let reactsCard = <span className='reacts'>no reacts</span>;

  if(props.topic.reacts) {
    reactsCard = props.topic.reacts.map((react) => {
      return (
              <div className='reacts' key={react.id}>
                {props.topic.name} {react.condition} {react.valor_ref} => 
                {' '} envia {react['action_type']} para <span className='conditional'>{react['endereco']}</span>
              </div>
              );
    });
  }
  
  return (
        <Card>
          <CardBody onClick={props.clicked}>
            <CardTitle className='d-inline-flex'>{props.topic.name}</CardTitle> 
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
  );
}

export default deviceTopicInfo;