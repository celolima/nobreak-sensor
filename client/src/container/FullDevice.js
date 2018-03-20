import React, { Component } from 'react';
import * as clientApi from '../api/clientApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from 'reactstrap'

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
        let device = <p style={{ textAlign: 'center' }}>Favor selecionar um dispositivo!</p>;
        if ( this.props.match.params.id ) {
            device = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if ( this.state.loadedDevice ) {
            device = (
                <div className="FullPost">
                    <h1>{this.state.loadedDevice.id}</h1>
                    <p>{this.state.loadedDevice.desc}</p>
                    <LineChart
                        width={600}
                        height={300}
                        data={this.getData()}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <Line
                            type='monotone'
                            dataKey='temp'
                            stroke='#8884d8'
                            activeDot={{r: 8}}/>
                        <CartesianGrid strokeDasharray='3 3'/>
                        <Tooltip/>
                        <YAxis/>
                        <XAxis dataKey='name'/>
                        <Legend />
                    </LineChart>                    
                    <Button outline color="danger" size='sm' onClick={this.handleTrashClick}>delete</Button>{' '}
                </div>
            );            
        }
        return device;        
    }
}

export default FullDevice;