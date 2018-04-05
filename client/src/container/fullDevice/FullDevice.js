import React, { Component } from 'react';
import DeviceTopicInfo from './DeviceTopicInfo';
import * as clientApi from '../../api/clientApi';
//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Row } from 'reactstrap';
import './FullDevice.css';
import mqtt from 'mqtt';
import Alert from '../ui/AlertLoadingDanger';


class FullDevice extends Component {
    state = {
        loadedDevice: null,
        topicValue: {},
        serverError: false
    }

    componentDidMount () {
        this.loadData();
    }

    loadData () {
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedDevice || (this.state.loadedDevice && this.state.loadedDevice.id !== this.props.match.params.id) ) {
                clientApi.getDeviceId(this.props.match.params.id)
                    .then(data => {                    
                        const topics = data.topics;
                        if(topics) {
                            let topicValObj = {};
                            topics.forEach((element) => {                           
                                topicValObj[element.topic] = '---';
                                this.setState({topicValue: topicValObj});
                            });
                        }
                        this.setState({loadedDevice: data},this.handleTopicSubscribe());
                    })
                    .catch(()=>{this.setState({serverError: true})});
            }
        }
    }

    handleTrashClick = () => {
        clientApi.deleteDevice({id:this.state.loadedDevice.id});
    };

    handleTopicSubscribe = () => {
        const client  = mqtt.connect('ws://iot.eclipse.org:80/ws');
        //const client  = mqtt.connect('mqtt://localhost:1883');

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
            console.log(topic);
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
                <h3>Dispositivo - {this.props.match.params.id}</h3>
                <hr/>
                <Row>
                    <Alert serverError={this.state.serverError}/>
                </Row>
            </div>
            
        );
        let topicsMsg = '';
        
        if ( this.state.loadedDevice ) {            
            if(this.state.loadedDevice.topics) {
                topicsMsg = this.state.loadedDevice.topics.map((t, index) => {
                    return (
                        <div key={index}>
                            <DeviceTopicInfo topic={t} topicValue={this.state.topicValue}/>
                        </div>
                    )});
            }
            deviceMsg = (
                <div>
                    <h3>{this.state.loadedDevice.desc}</h3>
                    <span className='reacts'>{this.state.loadedDevice.id}</span>
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

export default FullDevice;