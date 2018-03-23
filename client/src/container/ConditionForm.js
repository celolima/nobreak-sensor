import React, { Component } from 'react';
import * as clientApi from '../api/clientApi';
import ConditionDropdown from '../components/ConditionDropdown'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

let devicesServer = [];
let topics = [];
const types = ['Inteiro','String','Boleano'];
const conditions = ['maior que','maior ou igual que','menor que','menor ou igual que', 'igual a', 'diferente de'];

class ConditionForm extends Component {    
    state = {
        device: [],
        topic: [],
        type: 'Inteiro',
        condition: 'maior que',
        value: '',
        submitted: false
    };

    componentDidMount() {
        clientApi.getDevices().then(data => {devicesServer = data; this.setState({submitted:false})});
    };
   
    handleDeviceChange = (event) => {
        const id = event.target.value;
        let dev = [];
        topics = [];

        if(id !== 'invalid') {
            dev = devicesServer.find((val) => {return val.id === id});
            topics = [...dev.topics];
        }
        this.setState({device: dev});
        this.setState({topic: []});
    }

    handleTopicChange = (event) => {
        const title = event.target.value;
        let t = [];
        if(title !== 'invalid') {
            t = topics.find((val) => {return val.title === title});
        }
        this.setState({topic: t});
    }

    handleBasicChange = (event) => {
        const val = event.target.value;
        switch(event.target.name) {
            case 'inputValue':
                this.setState({value: val}); break;
            case 'selectType':
                this.setState({type: val}); break;
            case 'selectCond':
                this.setState({condition: val}); break;
            default: console.log('invalid field');
        }
    }

    handleCancelClick = () => {
        this.props.history.push( '/devices/');
    };  

    handleCreateFormSubmit = (e) => {
        console.log('WIP -> creating');
        this.setState({submitted: true});
    }

    render() {
        let redirect = null;
        
        if (this.state.submitted) {
            redirect = <Redirect to="/devices" />;
        }

        return (                
            <div>
                {redirect}
                <h3>Condition</h3>
                <hr/>
                <Form>
                    <ConditionDropdown 
                        devicesServer={devicesServer}
                        topics={topics}
                        types={types}
                        conditions={conditions}
                        handleDeviceChange={this.handleDeviceChange} 
                        device={this.state.device} 
                        handleTopicChange={this.handleTopicChange} 
                        topic={this.state.topic}
                        handleBasicChange={this.handleBasicChange} 
                        type={this.state.type}
                        cond={this.state.condition}/>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label>Valor</Label>
                            <Input type="input" name="inputValue" bsSize="sm" value={this.state.value} onChange={this.handleBasicChange}/>
                        </FormGroup>
                        <Button onClick={this.handleCreateFormSubmit} className="mr-sm-2" color='primary' size='sm'>Save</Button>{' '}
                        <Button className="mr-sm-2" size='sm' onClick={this.handleCancelClick}>Cancel</Button>
                </Form>
            </div>
        );
    };
}

export default ConditionForm;