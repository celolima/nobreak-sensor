import React from 'react';
import { Alert, Row, Col, Form, FormGroup, FormText, Label, Input } from 'reactstrap';

const conditionDropdown = (props) => {
    let devicesInputs = <Alert className='center' color='dark'>Não existem dispositivos!</Alert>;
    let topicsInputs = null;

    if(props.devicesServer.length !== 0) {
        let optionItems = props.devicesServer.map((dev) =>
            <option key={dev.id} value={dev.id}>{dev.desc}</option>
        );
        devicesInputs = (
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for='devs'>Dispositivo</Label>
                <Input type="select" name="selectDev" id="devs" bsSize="sm" value={props.deviceId} onChange={props.handleDeviceChange}>
                    <option key='0' value='invalid'></option>
                    {optionItems}
                </Input>
            </FormGroup>
        );
    }

    let optionItems = props.topics.map((t) =>
        <option key={t.name} value={t.name}>{t.title}</option>
    );
    topicsInputs = (
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for='devs'>Campo</Label>
            <Input type="select" name="selectTopic" id="topics" bsSize="sm" value={props.topicId} onChange={props.handleTopicChange}>
                {optionItems}
            </Input>
        </FormGroup>
    );    
    return (
        <div>
            {devicesInputs}
            {topicsInputs}
        </div>
    );
};

export default conditionDropdown;