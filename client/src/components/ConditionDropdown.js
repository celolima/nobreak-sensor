import React from 'react';
import { Alert, FormGroup, Label, Input } from 'reactstrap';

const conditionDropdown = (props) => {
    let devicesInputs = <Alert className='center' color='dark'>Não existem dispositivos!</Alert>;
    let topicsInputs = null;
    let optionItems = [];

    if(props.devicesServer.length !== 0) {
        optionItems = props.devicesServer.map((dev) =>
            <option key={dev.id} value={dev.id}>{dev.desc}</option>
        );
        devicesInputs = (
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for='devs'>Dispositivo <span style={{ color: 'red', fontSize: '10px' }}>{ props.fieldErrors['device'] }</span></Label>
                <Input type="select" name="selectDev" id="devs" bsSize="sm" value={props.device} onChange={props.handleDeviceChange}>
                    <option key='0' value='invalid'></option>
                    {optionItems}
                </Input>
            </FormGroup>
        );
    }

    optionItems = props.topics.map((t) => {
        return <option key={t.id} value={t.id}>{t.param}</option>        
        }
    );

    topicsInputs = (
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label>Parâmetro <span style={{ color: 'red', fontSize: '10px' }}>{ props.fieldErrors['topic'] }</span></Label>
            <Input type="select" name="selectTopic" id="topics" bsSize="sm" value={props.topic} onChange={props.handleTopicChange}>
                <option key='0' value='invalid'></option>
                {optionItems}
            </Input>
        </FormGroup>
    );

    const typesInput = (
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label>Tipo</Label>
        <Input type="select" name="selectType" id="tipos" bsSize="sm" value={props.type} onChange={props.handleBasicChange}>
            {
                props.types.map((t,index) =>
                    <option key={index} value={t}>{t}</option>
                )
            }
        </Input>
    </FormGroup>
    );

    const conditionsInput = (
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label>Condição</Label>
        <Input type="select" name="selectType" id="tipos" bsSize="sm" value={props.cond} onChange={props.handleBasicChange}>
            {
                props.conditions.map((t,index) =>
                    <option key={index} value={t}>{t}</option>
                )
            }
        </Input>
    </FormGroup>
    );    
    return (
        <div>
            {devicesInputs}
            {topicsInputs}
            {typesInput}
            {conditionsInput}
        </div>
    );
};

export default conditionDropdown;