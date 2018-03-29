import React, { Component } from 'react';
import { Alert, Label, Input} from 'reactstrap';
import Field from '../components/Field'

class TopicForm extends Component {
  state = {
    topicChanged: false,
    fieldErrors: {}
  };

  onInputChange = ({ name, value, error }) => {
    const field = name.split('_');
    this.props.array[field[0]][field[1]] = value;
    this.props.array[field[0]]['topic'] = '/'.concat(this.props.dev.toLowerCase(),'/',value.toLowerCase() + '/');
    this.setState({topicChanged: true});
  };

  render() {
      let topics = <Alert className='center' color='dark'>Não existem parâmetros!</Alert>;
      if(this.props.array.length !== 0) {    
          topics = this.props.array.map((t, index) => (
    
            <div key={index} className='form-group row'>
              <div className='col-6'>
                <Field
                title='Parâmetro'
                name={index+'_param'}
                value={this.props.array[index].param}
                onChange={this.onInputChange}
                validate={(val) => (val ? false : '*')}
              />
              </div>
              <div className='col-6'>
                <Label for={index+'_topic'} className="mr-sm-2">Tópico</Label>
                <Input className="form-control-sm disabled" type='text' value={this.props.array[index].topic} id={index+'_topic'}/>
              </div>
            </div>
          ));
      }

      return (<div>{topics}</div>);
  }

};

export default TopicForm;