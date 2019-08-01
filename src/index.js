import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";
import { configure } from 'mobx';

import './index.css';
import App from './routes/App/App';
import categories from './mobx/store';
configure({ enforceActions: "observed" }); // don't allow state modifications outside actions

ReactDOM.render(
  <Provider categories={categories}>
    <App />
  </Provider>, document.getElementById('root'));