import React, { Component } from 'react';
import DeviceDashBoard from './DeviceDashBoard'
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <Row>
            <Col>
              <h3>{this.props.title}</h3>
              <hr/>
            </Col>
          </Row>
          <Row>
            <Col>
              <DeviceDashBoard/>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
