import React, { Component } from 'react';
import EditableDeviceList from './EditableDeviceList';
import ToggleableDeviceForm from './ToggleableDeviceForm';

const client = require('./ClientApi');
const helpers = require('./Helpers');

class DevicesDashboard extends React.Component {
  state = {
    devices: [],
  };

  componentDidMount() {
    this.loadDevicesFormServer();
    setInterval(this.loadDevicesFormServer, 5000);
  }

  loadDevicesFormServer = () => {
    client.getDevices((serverDevices) => (
        this.setState({ devices: serverDevices })
      )
    );
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
    const d = helpers.newDevice(device);
    this.setState({
      devices: this.state.devices.concat(d),
    });

    client.createDevice(d);
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

    client.updateDevice(attrs);
  };

  deleteDevice = (deviceId) => {
    this.setState({
      devices: this.state.devices.filter(d => d.id !== deviceId),
    });

    client.deleteDevice(
      { id: deviceId }
    );
  };  

  render() {
    return (
      <div className='ui two column centered grid'>
        <div className='column'>
          <EditableDeviceList
            devices={this.state.devices}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
          />
          <ToggleableDeviceForm
            onFormSubmit={this.handleCreateFormSubmit}
          />
        </div>
      </div>
    );
  }
}

export default DevicesDashboard;