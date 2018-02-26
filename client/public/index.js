import React from 'react';
import ReactDOM from 'react-dom';
import DevicesDashboard from './DevicesDashboard';
import './static/App.css';
import './static/semantic-dist/semantic.css';
import './static/vendor/uuid.js';
import './static/vendor/babel-standalone.js';

Alert('TESTe');

ReactDOM.render(<DevicesDashboard />, document.getElementById('content'));