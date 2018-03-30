import React, { Component } from 'react';
import * as clientApi from '../api/clientApi';
import ConditionDropdown from '../components/ConditionDropdown'
import ReactForm from './ReactForm'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

let devicesServer = [];
let topics = [];

class ConditionForm extends Component {    
    state = {
        device: '',
        topic: '',
        type: 'Inteiro',
        condition: 'maior que',
        value: '',
        react: {'actionType': 'e-mail'},
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
        let reactObj = {...this.state.react};

        switch(event.target.name) {
            case 'selectValueType':
                this.setState({type: val}); break;
            case 'selectCond':
                this.setState({condition: val}); break;
            case 'selectActionType':                
                reactObj['actionType'] = val;
                console.log(reactObj);
                this.setState({react: reactObj}); break;
            case 'inputValue':
                if (val === '') { 
                    erros['value'] = 'favor preencher o valor';
                } else { delete erros.value; }
                this.setState({value: val, fieldErrors: erros}); break;                
            case 'email':
                if (val === '') { 
                    erros['email'] = 'favor preencher o email';
                } else { delete erros.email; }                
                reactObj['email'] = val;
                this.setState({react: reactObj, fieldErrors: erros}); break;
            case 'cel':
                if (val === '') { 
                    erros['cel'] = 'favor preencher o telefone';
                } else { delete erros.cel; }                
                reactObj['cel'] = val;
                this.setState({react: reactObj, fieldErrors: erros}); break;
            case 'message':                
                reactObj['message'] = val;
                this.setState({react: reactObj}); break;                
            default: console.log('invalid field');
        }
    }

    handleCancelClick = () => {
        this.props.history.push( '/devices/');
    };

    isValid = () => {
        return Object.keys(this.state.fieldErrors).length === 0 &&
            Object.keys(this.state.react).length === 3 &&
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
                <h3>if</h3>
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
                        <Label>Valor <span className='fieldError'>{ this.state.fieldErrors['value'] }</span></Label>
                        <Input type="input" name="inputValue" bsSize="sm" value={this.state.value} onChange={this.handleBasicChange}/>
                    </FormGroup>
                    <h3>then</h3>
                    <hr/>
                    <ReactForm handleBasicChange={this.handleBasicChange} reactObj={this.state.react} fieldErrors={this.state.fieldErrors}/>           
                    <Button onClick={this.handleCreateFormSubmit} className="mr-sm-2" color='primary' size='sm' disabled={!this.isValid()}>Save</Button>{' '}
                    <Button className="mr-sm-2" size='sm' onClick={this.handleCancelClick}>Cancel</Button>
                </Form>
            </div>
        );
    };
}

export default ConditionForm;