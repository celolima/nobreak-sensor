import React, { Component } from 'react';
import Devices from './Devices'
import DeviceForm from './DeviceForm'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

class DevicesDashboard extends Component {
  render() {
    return (
      <div>
        <header>
        <nav>
        <ul>
          <li><NavLink
              to="/devices/"
              exact
              activeStyle={{
                  color: '#fa923f',
                  textDecoration: 'underline'
              }}>Dispositivos</NavLink></li>
          <li><NavLink to={{
              pathname: '/new-device',
          }}>Novo Dispositivo</NavLink></li>
        </ul>
        </nav>
        </header> 
        <Switch>
          <Route path="/new-device" component={DeviceForm} />
          <Route path="/devices" component={Devices} />
          <Route render={() => <h1>Not found</h1>}/>
        </Switch>
        <Devices/>
      </div>
    );
  }
}
  
export default DevicesDashboard;