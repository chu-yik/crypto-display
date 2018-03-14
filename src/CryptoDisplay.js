import React, { Component } from 'react';
import axios from 'axios';
import './CryptoDisplay.css';
import { config } from './config.js';

function LastUpdatedRow(props) {
	return (
		<tr>
			<td className='CryptoDisplay-lastUpdated'>Last updated: {props.date.toLocaleString('en-GB')}</td>
		</tr>
	);
}

function NameDisplayRow(props) {
	return (
		<tr>
			<td className='CryptoDisplay-name'>{props.name}</td>
		</tr>
	);
}

function PriceDisplayRow(props) {
	const price = props.price;
	const display = isNaN(price) ? '-' : '$' + price;
	return (
		<tr>
			<td className='CryptoDisplay-price'>{display}</td>
		</tr>
	);
}

function VolumeDisplayTableData(props) {
	const volume = props.volume;
	const display = (isNaN(volume) || !(volume)) ? '-' : volume;
	return (
		<td className='CryptoDisplay-volume'>{display}</td> 
	);
}

function ChangeDisplayTableData(props) {
	const change = props.change;
	const display = (isNaN(change) || change === 0) ? '-' : change.toFixed(8);
	return ( change >= 0 ?
		<td className='CryptoDisplay-change-pos'>{display}</td> :
		<td className='CryptoDisplay-change-neg'>{display}</td>
	);
}

function AdditionalInfoTable(props) {
	return (
		<table className='CryptoDisplay-nestedTable'>
			<tbody>
				<tr>
					<th className='CryptoDisplay-nestedHeader'>volume:</th>
					<th className='CryptoDisplay-nestedHeader'>change:</th>
				</tr>
				<tr>
					<VolumeDisplayTableData volume={props.volume}/>
					<ChangeDisplayTableData change={props.change}/>
				</tr>
			</tbody>
		</table>
	);
}

class CryptoDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			price: '-',
			volume: '-',
			change: '-',
			lastUpdated: '-' 
		};
	}

	componentDidMount() {
		this.updateCryptoInfo();
		this.timerID = setInterval(() => this.updateCryptoInfo(), config.refreshIntervalMs);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	updateCryptoInfo() {
		const api = config.server + this.props.target + '/' + this.props.base;
		axios.get(api)
			.then(res => {
				if (!res.data.error) {
					this.setState({ price: res.data.price });
					this.setState({ volume: res.data.volume });
					this.setState({ change: res.data.change });
					this.setState({ lastUpdated: new Date() });
				} else {
					console.log('error: ' + res.data.error);
				}
			})
			.catch(err => {
				console.log('error: ' + err);
			});
	}

	render() {
		return (
			<div className='CryptoDisplay'>
				<table className='CryptoDisplay-mainTable'>
					<tbody>
						<NameDisplayRow name={this.props.name} />
						<PriceDisplayRow price={this.state.price} />
						<tr>
							<td>
								<AdditionalInfoTable 
									volume={this.state.volume} 
									change={this.state.change}
								/>
							</td>
						</tr>
						<LastUpdatedRow date={this.state.lastUpdated} />
					</tbody>
				</table>
			</div>
		);
	}
}

export default CryptoDisplay;