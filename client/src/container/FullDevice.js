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

    getData = () => {
        let data = [
            {name: 'Page A', pv: 2400, amt: 2400},
            {name: 'Page B', pv: 1398, amt: 2210},
            {name: 'Page C', pv: 9800, amt: 2290},
            {name: 'Page D', pv: 3908, amt: 2000},
            {name: 'Page E', pv: 4800, amt: 2181},
            {name: 'Page F', pv: 3800, amt: 2500},
            {name: 'Page G', pv: 4300, amt: 2100},
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
                            dataKey='pv'
                            stroke='#8884d8'
                            activeDot={{r: 8}}/>
                        <CartesianGrid strokeDasharray='3 3'/>
                        <Tooltip/>
                        <YAxis/>
                        <XAxis dataKey='name'/>
                        <Legend />
                    </LineChart>                    
                    <Button outline color="danger" size='sm'>delete</Button>{' '}
                </div>
            );            
        }
        return device;        
    }
}

export default FullDevice;