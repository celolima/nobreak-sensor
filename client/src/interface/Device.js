import React, { Component } from 'react';

const iconGen = require('./IconGen');

class Device extends React.Component {
  handleTrashClick = () => {
    this.props.onTrashClick(this.props.id);
  };

  componentDidMount() {
    const canvasID = 'canvas-' + this.props.id;
    iconGen.draw(canvasID);
  }

  render() {
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.desc}
            <canvas id={'canvas-' + this.props.id}></canvas>
          </div>
          <div className='extra content'>
            <span
              className='right floated edit icon'
              onClick={this.props.onEditClick}
            >
              <i className='edit icon' />
            </span>
            <span
              className='right floated plus square outline icon'
            >
              <i className="plus square outline icon"></i>
            </span>
          </div>          
          <div className='extra content'>
          <span
              className='left floated trash icon'
              onClick={this.handleTrashClick}
            >
              <i className='trash icon' />
            </span>
          </div>          
        </div>
      </div>
    );
  }
}

export default Device;