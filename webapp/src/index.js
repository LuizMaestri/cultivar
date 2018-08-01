import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './utils/http';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
