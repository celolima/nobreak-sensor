import React, { Component } from 'react';
import * as clientApi from '../api/clientApi';
import { Alert, Row, Col, Form, FormGroup, FormText, Label, Input } from 'reactstrap';
import ConditionDropdown from '../components/ConditionDropdown'

let devicesServer = [];
let topics = [];

class ConditionForm extends Component {    
    state = {
        device: [],
        topic: [],
        condition: '',
        value: '',
        submitted: false,
        changedDropdown: false
    };

    componentDidMount() {
        console.log('Yeap! Did mount');
        clientApi.getDevices().then(data => {devicesServer = data; this.setState({changedDropdown:false})});
    };
   
    handleDeviceChange = (event) => {        
        const id = event.target.value;
        const dev = devicesServer.find((val) => {return val.id === id});
        topics = [...dev.topics];
        this.setState({device: dev});
    }

    handleTopicChange = (event) => {
        console.log('Changed:', event.target.value);
    }

    render() {
        return (                
            <div>
                <h3>Condition</h3>
                <hr/>
                <Form>
                    <ConditionDropdown 
                        devicesServer={devicesServer}
                        topics={topics}
                        handleDeviceChange={this.handleDeviceChange} 
                        deviceId={this.state.device.id} 
                        handleTopicChange={this.handleTopicChange} 
                        topicId={this.state.topic.name} />
                </Form>
            </div>
        );
    };
}

export default ConditionForm;