import React, { Component } from 'react';
import Device from '../components/Device'
import * as clientApi from '../api/clientApi';
import { CardDeck } from 'reactstrap';
import { Route } from 'react-router-dom';


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
            <CardDeck key={device.id}>
                <Device 
                    id={device.id} 
                    desc={device.desc}
                    clicked={() => this.postSelectedHandler( device.id )}/>
            </CardDeck>
        ));

        return (
            <div>
                <h3>Dispositivos</h3>
                <hr/>
                <section>
                    {devices}
                </section>
            </div>
        );
    }
}

export default Devices;