import React, { Component } from 'react';
import EditableDevice from './EditableDevice';

class EditableDeviceList extends React.Component {
  render() {

    const devices = this.props.devices.map((device) => (
      <EditableDevice
        key={device.id}
        id={device.id}
        desc={device.desc}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
      />
    ));
    return (
      <div id='devices'>
        {devices}
      </div>
    );
  }
}

export default EditableDeviceList;