import React, { Component } from 'react';
import TopicForm from './TopicForm';
import * as clientApi from '../api/clientApi';
import { Alert, Form, FormGroup, Button, Label, Input} from 'reactstrap';
import { Redirect } from 'react-router-dom';

const uuidv4 = require('uuid/v4');
let arrayTopics = [];

class DeviceForm extends Component {
  state = {
    id: '',
    desc: '',
    sendEmail: false,
    submitted: false
  };

  handleAddTopic = () => {
    arrayTopics.push({title: '', name: ''});
    this.setState({topicChanged: true});
  };

  handleCreateFormSubmit = () => {
    const device = {
      id: uuidv4(),
      desc: this.state.desc,
      topics: arrayTopics
    };
    clientApi.createDevice(device).then(() => {this.setState({submitted: true})});
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

  handleCancelClick = () => {
    this.props.history.push( '/devices/');
  };

  render() {
    let redirect = null;

    if (this.state.submitted) {
        redirect = <Redirect to="/devices" />;
    }

    return (
      <div>
        {redirect}
        <h3>Novo Dispositivo</h3>
        <hr/>
        <Form>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="desc" className="mr-sm-2">Descrição</Label>
            <Input className="form-control-sm" type="text" value={this.state.desc} onChange={( e ) => this.setState( { desc: e.target.value } )} id="desc"/>
            <h4>Topics <Button onClick={this.handleAddTopic} className="mr-sm-2" color='primary' size='sm'>Add</Button>{' '}</h4>
            <hr/>
            <TopicForm array={arrayTopics}/>
          </FormGroup>
          <Button onClick={this.handleCreateFormSubmit} className="mr-sm-2" color='primary' size='sm'>Save</Button>{' '}
          <Button className="mr-sm-2" size='sm' onClick={this.handleCancelClick}>Cancel</Button>
        </Form>
      </div>
    );
  }
}

export default DeviceForm;