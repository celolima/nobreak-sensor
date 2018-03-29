import React, { Component } from 'react';
import TopicForm from './TopicForm';
import Field from '../components/Field'
import * as clientApi from '../api/clientApi';
import { Form, FormGroup, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

const uuidv4 = require('uuid/v4');
let arrayTopics = [];

class DeviceForm extends Component {
  state = {
    id: '',
    desc: '',
    fieldErrors: {},
    submitted: false
  };

  onInputChange = ({ name, value, error }) => {
    const fieldErrors = [...this.state.fieldErrors];
    fieldErrors[name] = error;
    this.setState({ [name] : value, fieldErrors });
  };

  handleAddTopic = () => {
    const nr = arrayTopics.length + 1;
    arrayTopics.push({id: nr, param: '', topic: ''});
    this.setState({topicChanged: true});
  };

  handleCreateFormSubmit = () => {
    if (this.validate()) return;

    const device = {
      id: uuidv4(),
      desc: this.state.desc,
      topics: arrayTopics
    };
    clientApi.createDevice(device).then(() => {this.setState({submitted: true})});
  };

  handleCancelClick = () => {
    this.props.history.push( '/devices/');
  };

  validate = () => {
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!this.state.desc) return true;
    if (arrayTopics.length === 0) return true;
    if (errMessages.length) return true;

    return false;
  };

  handleError = (name) => {
    let erros = [...this.state.fieldErrors];
    erros[name] = 'Empty';
    this.setState({fieldErrors: erros});
  }

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
            <Field
              title='Descrição'
              name='desc'
              value={this.state.desc}
              onChange={this.onInputChange}
              validate={(val) => (val ? false : '*')}
            />
            <h4>Parâmetros <Button onClick={this.handleAddTopic} className="mr-sm-2" color='primary' size='sm' disabled={this.state.desc === ''}>Add</Button>{' '}</h4>
            <hr/>
            <TopicForm array={arrayTopics} dev={this.state.desc} onError={this.handleError}/>
          </FormGroup>
          <Button onClick={this.handleCreateFormSubmit} className="mr-sm-2" color='primary' size='sm' disabled={this.validate()}>Save</Button>{' '}
          <Button className="mr-sm-2" size='sm' onClick={this.handleCancelClick}>Cancel</Button>
        </Form>
      </div>
    );
  }
}

export default DeviceForm;