import React, { Component } from 'react';
import { Form, FormGroup, Button, Label, Input} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import * as clientApi from '../api/clientApi';
import uid from 'uuid/v4';

class DeviceForm extends Component {
  state = {
    id: '',
    desc: '',
    submitted: false
  };

  handleCreateFormSubmit = () => {
    const device = {
      id: uid.uuidv4(),
      desc: this.state.desc,      
    };
    clientApi.createDevice(device);
    this.setState({submitted: true});    
  };

  handleEditFormSubmit = (attrs) => {
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

  handleTrashClick = () => {
    clientApi.deleteDevice({id:this.state.id});
  };

  render() {
    const submitText = 'Add';
    const deleteBtn = () => {
      if(this.state.id !== '')
        <Button onClick={this.handleDelete} className="mr-sm-2" color='primary' size='sm'>Delete</Button>
    }
    let redirect = null;
    if (this.state.submitted) {
        redirect = <Redirect to="/devices" />;
    }
    return (
      <span>
        {redirect}
        <Form>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="desc" className="mr-sm-2">Descrição</Label>
            <Input type="text" value={this.state.desc} onChange={( event ) => this.setState( { desc: event.target.value } )} id="desc"/>
          </FormGroup>
          <Button onClick={this.handleCreateFormSubmit} className="mr-sm-2" color='primary' size='sm'>{submitText}</Button>{' '}
          {deleteBtn}        
          <Button className="mr-sm-2" size='sm'>Cancel</Button>
        </Form>
      </span>
    );
  }
}

export default DeviceForm;