import React, { Component } from 'react';

class DeviceForm extends React.Component {
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
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Descrição</label>
              <input
                type='text'
                value={this.state.desc}
                onChange={this.handleDescChange}
              />
            </div>
            <div className='ui two bottom attached'>
              <button
                className='ui basic blue button'
                onClick={this.handleSubmit}
              >
                {submitText}
              </button>
              <button
                className='ui basic red button'
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeviceForm;