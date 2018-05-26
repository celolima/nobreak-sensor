import React, { Component } from 'react';
import * as clientApi from '../../api/clientApi';
import validator from 'validator';
import ConditionDropdown from './ConditionDropdown'
import ReactForm from './ReactForm'
import { Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import AlertLoadingDanger from '../ui/AlertLoadingDanger';

let devicesServer = [];
let topics = [];

class ConditionForm extends Component {    
    state = {
        device: '',
        topic: '',
        type: 'Inteiro',
        condition: 'maior que',
        value: '',
        action: {'actionType': 'e-mail',
                'email': '',
                'cel': '',
                'message': ''},
        fieldErrors: {},
        serverError: false,
        submitted: false
    };

    componentDidMount() {
        clientApi.getDevices()
            .then(data => {devicesServer = data; this.setState({submitted:false})})
            .catch(()=>{this.setState({serverError: true})});
    };
   
    handleDeviceChange = (event) => {
        let targetVal = event.target.value;
        let erros = {...this.state.fieldErrors};
        topics = [];
        
        if(targetVal !== 'invalid') {
            // eslint-disable-next-line
            let dev = devicesServer.find((val) => {return val.id == targetVal});
            if(dev) {
                topics = [...dev.topics];
                delete erros.device;
            }
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
        let actionObj = {...this.state.action};

        switch(event.target.name) {
            case 'selectValueType':
                this.setState({type: val}); break;
            case 'selectCond':
                this.setState({condition: val}); break;
            case 'selectActionType':                
                actionObj['actionType'] = val;
                this.setState({action: actionObj}); break;
            case 'inputValue':
                if (val === '') { 
                    erros['value'] = 'favor preencher o valor';
                } else { delete erros.value; }
                this.setState({value: val, fieldErrors: erros}); break;                
            case 'email':
                if (val === '') { 
                    erros['email'] = 'favor preencher o email';
                } else if (!validator.isEmail(val)) {
                    erros['email'] = 'favor preencher um email válido';
                } else {                    
                    delete erros.email;
                    actionObj['cel'] = '';
                }
                actionObj['email'] = val;
                this.setState({action: actionObj, fieldErrors: erros}); break;
            case 'cel':
                if (val === '') { 
                    erros['cel'] = 'favor preencher o telefone';
                } else { delete erros.cel; actionObj['email'] = '';}
                actionObj['cel'] = val;
                this.setState({action: actionObj, fieldErrors: erros}); break;
            case 'message':                
                actionObj['message'] = val;
                this.setState({action: actionObj}); break;                
            default: console.log('invalid field');
        }
    }

    handleCancelClick = () => {
        this.props.history.push( '/devices/');
    };

    isValid = () => {
        return Object.keys(this.state.fieldErrors).length === 0 &&
            (this.state.action['email'] !== '' || this.state.action['cel'] !== '') &&
            this.state.device !== '' && 
            this.state.topic !== '' && 
            this.state.value !== '';
    };

    handleCreateFormSubmit = (e) => {     
        if (!this.isValid()) return;

        const data = {
          device: this.state.device,
          topic: this.state.topic,
          type: this.state.type,
          condition: this.state.condition,
          value: this.state.value,
          action: this.state.action
        };

        clientApi.createReaction(data).then(() => {this.setState({submitted: true})});
    }

    render() {
        let redirect = null;
        
        if (this.state.submitted) {
            redirect = <Redirect to="/devices" />;
        }

        let reacts = (
            <div>
                <h3>Reacts</h3>
                <hr/>
                <Row>
                <AlertLoadingDanger serverError={this.state.serverError}/>
                </Row>
            </div>
        );

        if(!this.state.serverError) {
            reacts = (
                <div>
                {redirect}
                <h3>Condition</h3>
                <hr/>
                <Form>
                    <ConditionDropdown
                        devicesServer={devicesServer}
                        topics={topics}
                        handleDeviceChange={this.handleDeviceChange} 
                        device={this.state.device} 
                        handleTopicChange={this.handleTopicChange} 
                        topic={this.state.topic}
                        handleBasicChange={this.handleBasicChange}
                        type={this.state.type}
                        cond={this.state.condition}
                        fieldErrors={this.state.fieldErrors}/>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 row col-6">
                        <Label>Valor <span className='fieldError'>* { this.state.fieldErrors['value'] }</span></Label>
                        <Input type="input" name="inputValue" bsSize="sm" value={this.state.value} onChange={this.handleBasicChange}/>
                    </FormGroup>
                    <h3>Action</h3>
                    <hr/>
                    <ReactForm handleBasicChange={this.handleBasicChange} actionObj={this.state.action} fieldErrors={this.state.fieldErrors}/>
                    <Button onClick={this.handleCreateFormSubmit} className="mr-sm-2" color='primary' size='sm' disabled={!this.isValid()}>Save</Button>{' '}
                    <Button className="mr-sm-2" size='sm' onClick={this.handleCancelClick}>Cancel</Button>
                </Form>
            </div>
            )
        }
        return reacts;
    };
}

export default ConditionForm;