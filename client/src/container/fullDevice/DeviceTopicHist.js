import React, { Component } from 'react';
import DeviceTopicInfo from './DeviceTopicInfo';
import * as clientApi from '../../api/clientApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Row, Button, Table } from 'reactstrap';
import './FullDevice.css';
import mqtt from 'mqtt';
import Alert from '../ui/AlertLoadingDanger';

class DeviceTopicHist extends Component {
    state = {
        loadedTopic: null,
        topicValue: {},
        serverError: false,
        topicHist: [],
        topicEmail: []
    }

    componentDidMount () {
        this.loadData();
    }

    loadData () {
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedTopic || (this.state.loadedTopic && this.state.loadedTopic.id !== this.props.match.params.id) ) {
                clientApi.getParam(this.props.match.params.id)
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
                clientApi.getSendMails(this.props.match.params.id)
                    .then(data => {this.setState({topicEmail: data});})
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
            const list = this.getHistoricData(message);
            this.setState({topicValue: topicValObj, topicHist: list});
        });
    }

    getHistoricData = (val) => {
        let d = new Date();
        let hora = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
        let h = {hora: hora, valor: parseFloat(val.toString())};
        let historico = [...this.state.topicHist];
        if(historico.length > 6) {
            historico.shift();
        }
        historico.push(h);
        return historico;
    };

    goBack = () => {
        this.props.history.push( '/devices/' + this.state.loadedTopic.dev_id );
    }

    render() {
        let deviceMsg = (
            <div>
                <h3>{this.props.match.params.id}</h3>
                <hr/>
                <Row>
                    <Alert serverError={this.state.serverError}/>
                </Row>
            </div>
            
        );
        let topicsMsg = '';
        let tableHistoric = '';
        if ( this.state.loadedTopic ) {
            topicsMsg = (
                <div>
                    <DeviceTopicInfo topic={this.state.loadedTopic} topicValue={this.state.topicValue}/>
                </div>
            );
            let historicoElement = '';
            if(this.state.topicEmail) {
                historicoElement = 
                    this.state.topicEmail.map((e,index) => {
                        return (
                            <tr key={e.id}>
                                <th scope="row">{index}</th>
                                <td>{new Date(e.data_hora)}</td>
                                <td>{e.valor_lido}</td>
                                <td>{e.condition}</td>
                                <td>{e.valor_ref}</td>
                                <td>{e.action_type}</td>
                                <td>{e.endereco}</td>
                            </tr>
                        );
                    });
            }
            tableHistoric = (
                <div>
                    <h4>Alertas enviados</h4>
                    <span class="glyphicon glyphicon-warning-sign"></span>
                    <hr/>
                    <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Hora</th>
                        <th>Valor lido</th>
                        <th>Condition</th>
                        <th>Valor ref.</th>
                        <th>Action</th>
                        <th>To</th>
                    </tr>
                    </thead>
                    <tbody>                   
                        {historicoElement}
                    </tbody>
                    </Table>
                </div>
            );

            deviceMsg = (
                <div>
                    <h3>{this.state.loadedTopic.dev_name}</h3>
                    <hr/>
                    <div>
                        <Row>
                        {topicsMsg}
                        <LineChart width={600} height={300} data={this.state.topicHist}>
                            <Line type="monotone" dataKey="valor" stroke="red" />
                            <CartesianGrid stroke="#ccc" />
                            <Tooltip/>
                            <XAxis dataKey="hora" />
                            <YAxis/>
                        </LineChart>              
                        </Row>
                        <Row>
                            {tableHistoric}
                        </Row>
                    </div>
                    <Button onClick={this.goBack} className="mr-sm-2" color='primary' size='sm'>Voltar</Button>
                </div>
            );
        }
        return deviceMsg;
    }
}

export default DeviceTopicHist;