import React, { Component } from 'react';
import Devices from './Devices'
import DeviceForm from './DeviceForm'
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import FullDevice from './FullDevice';
import { Nav, NavItem, NavLink } from 'reactstrap';

class DevicesDashboard extends Component {
  render() {
    return (
      <Container>
        <div>
          <header>
            <Nav tabs>
              <NavLink href="/devices/">Dispositivos</NavLink>
              <NavLink href='/new-device'>Novo Dispositivo</NavLink>
            </Nav>
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