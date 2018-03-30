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
        device: '',
        topic: '',
        type: 'Inteiro',
        condition: 'maior que',
        value: '',
        fieldErrors: {},
        submitted: false
    };

    componentDidMount() {
        clientApi.getDevices().then(data => {devicesServer = data; this.setState({submitted:false})});
    };
   
    handleDeviceChange = (event) => {
        let targetVal = event.target.value;
        let erros = {...this.state.fieldErrors};
        topics = [];
        
        if(targetVal !== 'invalid') {
            let dev = devicesServer.find((val) => {return val.id === targetVal});
            topics = [...dev.topics];
            delete erros.device;
        } else  {
            erros['device'] = 'favor selecionar um dispositivo';
            targetVal = '';
            delete erros.topic;
        }

        this.setState({device: targetVal, topic: '', fieldErrors: erros});
    }

    handleTopicChange = (event) => {
        let targetVal = event.target.value;        
        let erros = {...this.state.fieldErrors};

        if(targetVal === 'invalid') {
            erros['topic'] = 'favor selecionar um parametro';
            targetVal = '';
        } else {
            delete erros.topic;
        }
        this.setState({topic: targetVal, fieldErrors: erros});
    }

    handleBasicChange = (event) => {
        const val = event.target.value;
        let erros = {...this.state.fieldErrors};

        switch(event.target.name) {
            case 'inputValue':
                if (val === '') { 
                    erros['value'] = 'favor preencher o valor';
                } else { delete erros.value; }
                this.setState({value: val, fieldErrors: erros}); break;
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

    isValid = () => {
        return this.state.fieldErrors != null && 
            this.state.device !== '' && 
            this.state.topic !== '' && 
            this.state.value !== '';
    };

    handleCreateFormSubmit = (e) => {     
        //this.setState({submitted: true});
        console.log(this.state);
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
                        cond={this.state.condition}
                        fieldErrors={this.state.fieldErrors}/>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label>Valor <span style={{ color: 'red', fontSize: '10px' }}>{ this.state.fieldErrors['value'] }</span></Label>
                            <Input type="input" name="inputValue" bsSize="sm" value={this.state.value} onChange={this.handleBasicChange}/>
                        </FormGroup>
                        <Button onClick={this.handleCreateFormSubmit} className="mr-sm-2" color='primary' size='sm' disabled={!this.isValid()}>Save</Button>{' '}
                        <Button className="mr-sm-2" size='sm' onClick={this.handleCancelClick}>Cancel</Button>
                </Form>
            </div>
        );
    };
}

export default ConditionForm;