import React, { Component } from 'react';
import EditableDevice from './EditableDevice';
import { CardDeck} from 'reactstrap';

class EditableDeviceList extends Component {
  render() {

    const devices = this.props.devices.map((device) => (
      <CardDeck key={device.id}>
      <EditableDevice       
        id={device.id}
        desc={device.desc}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
      />
      </CardDeck>
    ));
    return (
      <div id='devices'>
        {devices}
      </div>
    );
  }
}

export default EditableDeviceList;