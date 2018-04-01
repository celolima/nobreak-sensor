import React, { Component } from 'react';
import DeviceTopicInfo from './DeviceTopicInfo'
import * as clientApi from '../../api/clientApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button, Alert, Row } from 'reactstrap'
import './FullDevice.css'

class FullDevice extends Component {
    state = {
        loadedDevice: null
    }

    componentDidMount () {
        this.loadData();
    }

    loadData () {
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedDevice || (this.state.loadedDevice && this.state.loadedDevice.id !== +this.props.match.params.id) ) {
                clientApi.getDeviceId(this.props.match.params.id).then(data => {this.setState({loadedDevice: data})});
            }
        }
    }

    handleTrashClick = () => {
        clientApi.deleteDevice({id:this.state.loadedDevice.id});
    };

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
        let deviceMsg = <Alert className='center' color='danger'>Favor selecionar um dispositivo!</Alert>;
        let topicsMsg = '';
        
        if ( this.props.match.params.id ) {
            deviceMsg =  <Alert className='center' color="warning">Loading...!</Alert>;
        }

        if ( this.state.loadedDevice ) {
            if(this.state.loadedDevice.topics) {
                topicsMsg = this.state.loadedDevice.topics.map((t, index) => {
                    return (
                        <div key={index}>
                            <DeviceTopicInfo topic={t}/>
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