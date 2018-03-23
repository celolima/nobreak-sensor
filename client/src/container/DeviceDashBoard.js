import React, { Component } from 'react';
import Devices from './Devices'
import DeviceForm from './DeviceForm'
import FullDevice from './FullDevice';
import ConditionForm from './ConditionForm';
import { Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Nav, NavLink } from 'reactstrap';
import './App.css';

class DevicesDashboard extends Component {
  render() {
    return (
      <Container>
        <div>
          <header>
            <Nav tabs>
              <NavLink href="/devices/">Painel</NavLink>
              <NavLink href='/new-device'>Dispositivo</NavLink>
              <NavLink href='/new-condition'>Condição</NavLink>
            </Nav>
          </header>
            <Row>
              <Col>
              <Switch>
                <Route path="/" exact render={() => <h1>Welcome</h1>} />
                <Route path="/devices" exact component={Devices} />
                <Route path="/new-condition" exact component={ConditionForm} />                
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