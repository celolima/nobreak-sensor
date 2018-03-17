import React, { Component } from 'react';
import EditableDeviceList from './EditableDeviceList';
import ToggleableDeviceForm from './ToggleableDeviceForm';
import * as ClientApi from '../api/ClientApi';
import * as Helper from '../helpers/Helper'
import { Container } from 'reactstrap';
import axios from 'axios';

class DevicesDashboard extends Component {
  state = {
    devices: [],
  };

  componentDidMount() {
    //this.loadDevicesFormServer();
    //setInterval(this.loadDevicesFormServer, 5000);
    axios.get('https://jsonplaceholder.typicode.com/posts') 
      .then(response => {
        const posts = response.data;
        const devs = posts.map(p =>{
          return {
            id: p.id,
            desc: p.title
          }
        });
        this.setState({devices: devs});

      });

  }

  loadDevicesFormServer = () => {
    ClientApi.getDevices((serverDevices) => (
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
    const d = Helper.newDevice(device);
    this.setState({
      devices: this.state.devices.concat(d),
    });

    //ClientApi.createDevice(d);
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

    //ClientApi.updateDevice(attrs);
  };

  deleteDevice = (deviceId) => {
    this.setState({
      devices: this.state.devices.filter(d => d.id !== deviceId),
    });
    /*
    ClientApi.deleteDevice(
      { id: deviceId }
    );
    */
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