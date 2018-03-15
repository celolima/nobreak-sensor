import React, { Component } from 'react';
import DeviceDashBoard from '../components/DeviceDashBoard'
import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 4, offset: 4 }}>
            <h3>{this.props.title}</h3>
            <hr/>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 4, offset: 4 }}>
            <DeviceDashBoard/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
