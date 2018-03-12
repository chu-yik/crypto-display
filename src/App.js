import React, { Component } from 'react';
import CryptoDisplay from './CryptoDisplay';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Cryptocurrency Realtime Price</h1>
        <CryptoDisplay name='Bitcoin' base='btc' target='usd' />
      </div>
    );
  }
}

export default App;
