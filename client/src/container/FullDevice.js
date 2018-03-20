import React, { Component } from 'react';
import * as clientApi from '../api/clientApi';

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
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return device;        
    }
}

export default FullDevice;