import React, { Component } from 'react';
import Devices from './Devices'
import DeviceForm from './DeviceForm'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import FullDevice from './FullDevice';

class DevicesDashboard extends Component {
  render() {
    return (
      <Container>
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
          <Row>
            <Col>
            <Switch>
              <Route path="/" exact render={() => <h1>Welcome</h1>} />
              <Route path="/devices" exact component={Devices} />
              <Route path="/devices/:id" exact component={FullDevice} />
              <Route path="/new-device" component={DeviceForm} />
              <Route render={() => <h1>Not found</h1>}/>
            </Switch>
            </Col>
          </Row>
      </div>
      </Container>
    );
  }
}
  
export default DevicesDashboard;