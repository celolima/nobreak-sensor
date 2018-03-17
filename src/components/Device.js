import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import './Device.css';

const iconGen = require('../helpers/IconGen');

class Device extends Component {

  handleTrashClick = () => {
    this.props.onTrashClick(this.props.id);
  };

  componentDidMount() {
    //const canvasID = 'canvas-' + this.props.id;
    //iconGen.draw(canvasID);
  }
  
  render() {
    return (
      <Card>
        {/*<canvas id={'canvas-' + this.props.id}></canvas>*/}
        <CardBody>
          <CardText>{this.props.desc}</CardText>          
          <Button color="primary" size='sm'>add</Button>{' '}
          <Button color="secondary" size='sm' onClick={this.props.onEditClick}>edit</Button>{' '}          
          <Button color="danger" size='sm' onClick={this.handleTrashClick}>remove</Button>{' '}
        </CardBody>
      </Card>
    );
  }
}

export default Device;