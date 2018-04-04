import React, { Component } from 'react';
import Devices from './Devices'
import DeviceForm from '../deviceForm/DeviceForm'
import FullDevice from '../fullDevice/FullDevice'
import Welcome from '../welcome/Welcome'
import ConditionForm from '../conditionalReact/ConditionForm';
import { Route, Switch } from 'react-router-dom';
import { Container, Row, Col, Jumbotron, Navbar, Nav, NavLink } from 'reactstrap';
import '../App.css';

class DevicesDashboard extends Component {
  render() {
    return (
      <Container>
        <div>        
          <header>
            <Navbar color="dark" light expand="sm">
              <Nav>
                <NavLink href="/devices/">Painel</NavLink>
                <NavLink href='/new-device'>Dispositivo</NavLink>
                <NavLink href='/new-react'>Reacts</NavLink>
              </Nav>
            </Navbar>
          </header>
          <Jumbotron>
            <Row>
              <Col>
              <Switch>
                <Route path="/" exact render={() => <Welcome/>} />
                <Route path="/devices" exact component={Devices} />
                <Route path="/new-react" exact component={ConditionForm} />                
                <Route path="/devices/:id" exact component={FullDevice} />
                <Route path="/new-device" component={DeviceForm} />
                <Route render={() => <h1>Not found</h1>}/>
              </Switch>
              </Col>
            </Row>
            </Jumbotron>
        </div>
      </Container>
    );
  }
}
  
export default DevicesDashboard;