import React from 'react';

import "./App.css";
import SideNav from '../SideNav/SideNav';
import Main from '../Main/Main';

const App = props => (
  <div className="row">
    <SideNav />
    <div className="main">
      <Main/>
    </div>
  </div>
);

export default App;