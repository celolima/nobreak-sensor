import React, { Component } from 'react';
import DeviceTopicInfo from './DeviceTopicInfo';
import * as clientApi from '../../api/clientApi';
//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Row } from 'reactstrap';
import './FullDevice.css';
import mqtt from 'mqtt';
import Alert from '../ui/AlertLoadingDanger';

class DeviceTopicHist extends Component {
    state = {
        loadedTopic: null,
        topicValue: {},
        serverError: false
    }

    componentDidMount () {
        this.loadData();
    }

    loadData () {
        if ( this.props.match.params.devId && this.props.match.params.paramId ) {
            if ( !this.state.loadedTopic || (this.state.loadedTopic && this.state.loadedTopic.id !== this.props.match.params.paramId) ) {
                let params = {
                    devId: this.props.match.params.devId,
                    paramId : this.props.match.params.paramId
                };
                console.log(params);
                clientApi.getParamFromDevice(params)
                    .then(data => { 
                        const topic = data.topic;
                        if(topic) {
                            let topicValObj = {};
                            topicValObj[topic] = '---';
                            this.setState({topicValue: topicValObj});
                            this.setState({loadedTopic: data},this.handleTopicSubscribe());
                        }                        
                    })
                    .catch(()=>{this.setState({serverError: true})});
            }
        }
    }

    handleTopicSubscribe = () => {
        const client  = mqtt.connect('ws://iot.eclipse.org:80/ws');
        //const client  = mqtt.connect('ws://localhost:1884');

        client.stream.on('error', (e) => {            
            console.log('Não foi possível conectar!');
            console.log(e);
            client.end();
        });

        client.on('error', (error) => {
            console.log('Error!');
        });
        client.on('offline', () => {
            console.log('Offline');
        });
        client.on('connect', () => {
            console.log('Conectado');
            Object.entries(this.state.topicValue).forEach(([key, value]) => {
                client.subscribe(key);
            });
        });
        client.on('message', (topic, message) => {
            let topicValObj = {...this.state.topicValue};
            topicValObj[topic] = message.toString();
            this.setState({topicValue: topicValObj});
        });
    }

    getData = () => {
        let data = [
            {name: '13:00h', temp: 30},
            {name: '14:00h', temp: 40},
            {name: '15:00h', temp: 35},
            {name: '16:00h', temp: 36},
            {name: '17:00h', temp: 28},
            {name: '18:00h', temp: 50},
            {name: '19:00h', temp: 34}
          ];
        return data;
    }

    render() {
        let deviceMsg = (
            <div>
                <h3>{this.props.match.params.paramId}</h3>
                <hr/>
                <Row>
                    <Alert serverError={this.state.serverError}/>
                </Row>
            </div>
            
        );
        let topicsMsg = '';
        
        if ( this.state.loadedTopic ) {
            topicsMsg = (
                <div>
                    <DeviceTopicInfo topic={this.state.loadedTopic} topicValue={this.state.topicValue}/>
                </div>
            );

            deviceMsg = (
                <div>
                    <h3>{this.state.loadedTopic.param}</h3>
                    <hr/>
                    <Row>
                    {topicsMsg}
                    </Row>
                </div>
            );
        }
        return deviceMsg;
    }
}

export default DeviceTopicHist;