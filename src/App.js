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
					<CryptoDisplay name='Dash' base='dash' target='usd' />
					<CryptoDisplay name='MaidSafeeCoin' base='maid' target='usd' />
					<CryptoDisplay name='Lisk' base='lsk' target='usd' />
					<CryptoDisplay name='Storjcoin X' base='storj' target='usd' />
				</section>
			</div>
		);
	}
}

export default App;
