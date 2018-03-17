import React, { Component } from 'react';
import { Form, FormGroup, Button, Label, Input} from 'reactstrap';
import './Device.css'

class DeviceForm extends Component {
  state = {
    desc: this.props.desc || '',
  };

  handleDescChange = (e) => {
    this.setState({ desc: e.target.value });
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id,
      desc: this.state.desc,
    });
  };

  render() {
    const submitText = this.props.id ? 'Update' : 'Create';
    return (
      <Form>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="desc" className="mr-sm-2">Descrição</Label>
          <Input type="text" value={this.state.desc} onChange={this.handleDescChange} id="desc"/>
        </FormGroup>
        <Button onClick={this.handleSubmit} className="mr-sm-2" color='primary' size='sm'>{submitText}</Button>{' '}
        <Button onClick={this.props.onFormClose} className="mr-sm-2" size='sm'>Cancel</Button>
      </Form>
    );
  }
}

export default DeviceForm;