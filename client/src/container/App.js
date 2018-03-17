import React, { Component } from 'react';
import DeviceDashBoard from '../components/DeviceDashBoard'
import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
