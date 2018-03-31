import PropTypes from 'prop-types';
import React from 'react';
import { Label, Input } from 'reactstrap';

class Field extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    validate: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.value,
    error: false,
  };

  componentWillReceiveProps(update) {
    this.setState({ value: update.value });
  }

  onChange = (evt) => {
    const name = this.props.name;
    const value = evt.target.value;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({ value, error });

    this.props.onChange({ name, value, error });
  };

  render() {
    return (
      <div>
        <Label for={this.props.name} className="mr-sm-2">{this.props.title} <span className='fieldError'>{ this.state.error }</span></Label>
        <Input className="form-control-sm" type="text" value={this.state.value} onChange={this.onChange} id={this.props.name}/>        
      </div>
    );
  }
};

export default Field;