import React from 'react';
import * as clientApi from '../api/clientApi';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const actionTypes = ['e-mail','sms'];

const reactForm = (props) => {
    const actionTypesInput = (
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 col-6">            
            <Input type="select" name="selectActionType" id="action" bsSize="sm" value={props.reactObj['actionType']} onChange={props.handleBasicChange}>
                {
                    actionTypes.map((t,index) =>
                        <option key={index} value={t}>{t}</option>
                    )
                }
            </Input>
        </FormGroup>
    );
    let inputField = '';
    if(props.reactObj['actionType'] === 'e-mail') {
        inputField =  (
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 col-6">
                <Label for="emailAddress" className="mr-sm-2"><span className='fieldError'>{ props.fieldErrors['email'] }</span></Label>
                <Input type="text" name="email" id="emailAddress" value={props.reactObj['email']} placeholder="something@gmail.com" onChange={props.handleBasicChange}/>
            </FormGroup>
        );
    } else if(props.reactObj['actionType'] === 'sms') {
        inputField =  (
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 col-6">
                <Label for="celSms" className="mr-sm-2"><span className='fieldError'>{ props.fieldErrors['cel'] }</span></Label>
                <Input type="text" name="cel" id="celSms" value={props.reactObj['cel']} placeholder="+55(31)99728046" onChange={props.handleBasicChange}/>
            </FormGroup>
        );
    }
    let inputTextArea = (
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input type="textarea" name="message" id="messageInput" value={props.reactObj['message']} placeholder="Mensagem" onChange={props.handleBasicChange}/>
        </FormGroup>
    );
    return (
        <div>
            <div className='row'>
                {actionTypesInput}
                {inputField}
            </div>
                {inputTextArea}
        </div>
    );
};

export default reactForm;