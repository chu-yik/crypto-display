import React, { Component } from 'react';
import CryptoDisplay from './CryptoDisplay';
import './App.css';

class App extends Component {    
	render() {
		return (
			<div className='App'>
				<h1>Cryptocurrency Realtime Price</h1>
				<section className='App-cryptos'>
					<CryptoDisplay name='Bitcoin' base='btc' target='usd' />
					<CryptoDisplay name='Ether' base='eth' target='usd' />
					<CryptoDisplay name='Litecoin' base='ltc' target='usd' />
					<CryptoDisplay name='Monero' base='xmr' target='usd' />
					<CryptoDisplay name='Ripple' base='xrp' target='usd' />
					<CryptoDisplay name='Dogecoin' base='doge' target='usd' />
				</section>
			</div>
		);
	}
}

export default App;
