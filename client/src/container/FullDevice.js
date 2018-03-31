import React, { Component } from 'react';
import * as clientApi from '../api/clientApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button, Alert } from 'reactstrap'

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
                topicsMsg = this.state.loadedDevice.topics.map((topic) => {
                    let t = [];
                    t.push(<p>{topic.topic}</p>);
                    if(topic.reacts) {
                        let r = topic.reacts.map((react) => {
                            return <p>if ({topic.param} {react.condition} {react.value}) then ({react.action['actionType']} to {react.action['email']}{react.action['cel']})</p>
                        });
                        t.push(r);
                    }
                    return t;
                });
            }
            console.log(topicsMsg);
            deviceMsg = (
                <div>
                    <h3>{this.state.loadedDevice.desc}</h3>
                    <hr/>
                    <p>{this.state.loadedDevice.id}</p>                    
                    {topicsMsg}
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
        return deviceMsg;        
    }
}

export default FullDevice;