import React, { Component } from 'react';
import DeviceDashBoard from './painel/DeviceDashBoard'
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <DeviceDashBoard/>
      </BrowserRouter>
    );
  }
}

export default App;
