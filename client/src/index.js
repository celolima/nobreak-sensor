import React from 'react';
import ReactDOM from 'react-dom';
import DevicesDashboard from './DevicesDashboard';
import registerServiceWorker from './registerServiceWorker';
import './static/App.css';
import './static/semantic-dist/semantic.css';
import './static/vendor/uuid.js';
import './static/vendor/babel-standalone.js';

ReactDOM.render(<DevicesDashboard />, document.getElementById('root'));
registerServiceWorker();