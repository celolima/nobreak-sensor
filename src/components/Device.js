import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const iconGen = require('../helpers/IconGen');

class Device extends Component {

  handleTrashClick = () => {
    this.props.onTrashClick(this.props.id);
  };

  componentDidMount() {
    const canvasID = 'canvas-' + this.props.id;
    iconGen.draw(canvasID);
  }
  
  render() {
    return (
      <Card>
        <canvas id={'canvas-' + this.props.id}></canvas>
        <CardBody>
          <CardTitle>{this.props.desc}</CardTitle>        
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button color="primary" size='sm'>add</Button>{' '}
          <Button color="secondary" size='sm' onClick={this.props.onEditClick}>edit</Button>{' '}          
          <Button color="danger" size='sm' onClick={this.handleTrashClick}>remove</Button>{' '}
        </CardBody>
      </Card>
    );
  }
}

export default Device;