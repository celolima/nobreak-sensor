import React, { Component } from 'react';
import DeviceTopicInfo from './DeviceTopicInfo';
import * as clientApi from '../../api/clientApi';
import { Row, Col } from 'reactstrap';
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

    postSelectedHandler = ( id ) => {
        this.props.history.push( '/devices/param/' + id );
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
                        <Col xs="6" key={index}>
                            <DeviceTopicInfo topic={t} topicValue={this.state.topicValue} clicked={() => this.postSelectedHandler(t.id )}/>
                        </Col>
                    )});
            }
            deviceMsg = (
                <div>
                    <h3>{this.state.loadedDevice.name}</h3>
                    <span className='reacts'>{this.state.loadedDevice.key}</span>
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