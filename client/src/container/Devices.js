import React, { Component } from 'react';
import Device from '../components/Device'
import * as clientApi from '../api/clientApi';
import { Row, Col } from 'reactstrap';
import { Route } from 'react-router-dom';
import './App.css';


class Devices extends Component {
    state = {
        devices: []
    };

    componentDidMount() {
        console.log(this.props.match.url);
        this.loadDevicesFromServer();
        //setInterval(this.loadDevicesFormServer, 5000);
    }

    loadDevicesFromServer = () => {
        clientApi.getDevices().then(data => {this.setState({devices : data})});
    };

    postSelectedHandler = ( id ) => {
        this.props.history.push( '/devices/' + id );
    }


    render() {
        let devices = <p style={{ textAlign: 'center' }}>Não foi possível obter os dispositivos com o servidor!</p>;
        devices = this.state.devices.map((device) => (
            <Device 
                key={device.id}
                id={device.id} 
                desc={device.desc}
                topics={device.topics}
                clicked={() => this.postSelectedHandler( device.id )}/>
        ));

        return (
            <div>
                <h3>Dispositivos</h3>
                <hr/>
                <Row>
                    {devices}
                </Row>
            </div>
        );
    }
}

export default Devices;