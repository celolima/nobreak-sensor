import React, { Component } from 'react';
import EditableDeviceList from './EditableDeviceList';
import ToggleableDeviceForm from './ToggleableDeviceForm';
import * as clientApi from '../api/clientApi';
import * as Helper from '../helpers/Helper'
import { Container } from 'reactstrap';

class DevicesDashboard extends Component {
  state = {
    devices: [],
  };

  componentDidMount() {
    this.loadDevicesFormServer();
    //setInterval(this.loadDevicesFormServer, 5000);
  }

  loadDevicesFormServer = () => {
    clientApi.getDevices().then(data => {this.setState({devices : data})});
  };

  handleCreateFormSubmit = (device) => {
    this.createDevice(device);
  };

  handleEditFormSubmit = (attrs) => {
    this.updateDevice(attrs);
  };

  handleTrashClick = (deviceId) => {
    this.deleteDevice(deviceId);
  };

  createDevice = (device) => {
    const d = Helper.newDevice(device);
    this.setState({
      devices: this.state.devices.concat(d),
    });

    clientApi.createDevice(d);
  };

  updateDevice = (attrs) => {
    this.setState({
      devices: this.state.devices.map((device) => {
        if (device.id === attrs.id) {
          return Object.assign({}, device, {
            desc: attrs.desc,
          });
        } else {
          return device;
        }
      }),
    });
    clientApi.updateDevice(attrs);
  };

  deleteDevice = (deviceId) => {
    this.setState({
      devices: this.state.devices.filter(d => d.id !== deviceId),
    });
    //clientApi.deleteDevice(this.state.devices.find(d=> d.id === deviceId));
    clientApi.deleteDevice({id:deviceId});
  };  

  render() {
    return (
      <Container>        
          <ToggleableDeviceForm
            onFormSubmit={this.handleCreateFormSubmit}
          />
          <EditableDeviceList
            devices={this.state.devices}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
          />
      </Container>
    );
  }
}

export default DevicesDashboard;