import React, { Component } from 'react';
import './App.scss';
import Repositories from './components/Repositories/Repositories';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Repositories/>
      </div>
    );
  }
}

export default App;
