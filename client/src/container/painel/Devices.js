import React, { Component } from 'react';
import Device from './Device';
import Alert from '../ui/AlertLoadingDanger';
import * as clientApi from '../../api/clientApi';
import { Row } from 'reactstrap';

class Devices extends Component {
    state = {
        devices: [],
        serverError: false
    };

    componentDidMount() {
        this.loadDevicesFromServer();
        //setInterval(this.loadDevicesFormServer, 5000);
    }

    loadDevicesFromServer = () => {
        clientApi.getDevices()
            .then(data => {this.setState({devices : data})})
            .catch(()=>{this.setState({serverError: true})});
    };

    postSelectedHandler = ( id ) => {
        this.props.history.push( '/devices/' + id );
    }


    render() {
        let devices = <Alert serverError={this.state.serverError}/>;
        if(this.state.devices && this.state.devices.length !== 0) {
            devices = this.state.devices.map((device) => (
                <Device 
                    key={device.id}
                    id={device.id} 
                    desc={device.desc}
                    topics={device.topics}
                    clicked={() => this.postSelectedHandler( device.id )}/>
            ));
        }

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