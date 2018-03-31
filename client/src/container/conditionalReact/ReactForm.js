import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const actionTypes = ['e-mail','sms'];

const reactForm = (props) => {
    const actionTypesInput = (
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="action" className="mr-sm-2">Ação</Label>
            <Input type="select" name="selectActionType" id="action" bsSize="sm" value={props.actionObj['actionType']} onChange={props.handleBasicChange}>
                {
                    actionTypes.map((t,index) =>
                        <option key={index} value={t}>{t}</option>
                    )
                }
            </Input>
        </FormGroup>
    );
    let inputField = '';
    if(props.actionObj['actionType'] === 'e-mail') {
        inputField =  (
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="emailAddress" className="mr-sm-2">e-mail <span className='fieldError'>* { props.fieldErrors['email'] }</span></Label>
                <Input type="text" name="email" id="emailAddress" bsSize='sm' value={props.actionObj['email']} placeholder="something@gmail.com" onChange={props.handleBasicChange}/>
            </FormGroup>
        );
    } else if(props.actionObj['actionType'] === 'sms') {
        inputField =  (
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="celSms" className="mr-sm-2">cel <span className='fieldError'>* { props.fieldErrors['cel'] }</span></Label>
                <Input type="text" name="cel" id="celSms" bsSize='sm' value={props.actionObj['cel']} placeholder="+55(31)99728046" onChange={props.handleBasicChange}/>
            </FormGroup>
        );
    }
    let inputTextArea = (
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input type="textarea" name="message" id="messageInput" value={props.actionObj['message']} placeholder="Mensagem" onChange={props.handleBasicChange}/>
        </FormGroup>
    );
    return (
        <div>
            <div className='row'>
                <div className='col-6'>
                    {actionTypesInput}
                </div>
                <div className='col-6'>
                    {inputField}
                </div>    
            </div>
                {inputTextArea}
        </div>
    );
};

export default reactForm;