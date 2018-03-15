import React, { Component } from 'react';
import DeviceForm from './DeviceForm';
import { Button } from 'reactstrap';

class ToggleableDeviceForm extends Component {
  state = {
    isOpen: false,
  };

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  handleFormClose = () => {
    this.setState({ isOpen: false });
  };

  handleFormSubmit = (device) => {
    this.props.onFormSubmit(device);
    this.setState({ isOpen: false });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <DeviceForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <Button onClick={this.handleFormOpen} color='primary' size='sm'>New</Button>
      );
    }
  }
}

export default ToggleableDeviceForm;