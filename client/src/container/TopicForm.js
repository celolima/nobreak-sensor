import React, { Component } from 'react';
import { Alert, Label, Input} from 'reactstrap';

class TopicForm extends Component {
  state = {
    topicChanged: false
  };

  handleTopicChange = (e,index) => {
      const field = e.target.name;
      this.props.array[index][field] = e.target.value;
      this.setState({topicChanged: true});
  };

  render() {
      let topics = <Alert className='center' color='dark'>Não existem tópicos inscritos!</Alert>;
      if(this.props.array.length !== 0) {    
          topics = this.props.array.map((t, index) => (
    
            <div key={index} className='form-group row'>
              <div className='col-6'>
                <Label for={'title_'+index} className="mr-sm-2">Title</Label>
                <Input className="form-control-sm" type='text' name='title' value={this.props.array[index].title} onChange={(e) => this.handleTopicChange(e,index)} id={'title_'+index}/>
              </div>
              <div className='col-6'>
                <Label for={'name_'+index} className="mr-sm-2">Name</Label>
                <Input className="form-control-sm" type='text' name='name' value={this.props.array[index].name} onChange={(e) => this.handleTopicChange(e,index)} id={'name_'+index}/>
              </div>
            </div>
          ));
      }

      return (<div>{topics}</div>);
  }

};

export default TopicForm;