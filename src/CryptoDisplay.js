import React, { Component } from 'react';
import axios from 'axios';
import './CryptoDisplay.css';

function LastUpdatedRow(props) {
	return (
		<tr>
			<td className='CryptoDisplay-lastUpdated'>Last updated: {props.date.toLocaleTimeString()}</td>
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
	return (
		<tr>
			<td className='CryptoDisplay-price'>${props.price}</td>
		</tr>
	);
}

function ChangeDisplayTableData(props) {
	const change = props.change;
	return ( change >= 0 ?
		<td className='CryptoDisplay-change-pos'>{props.change}</td> :
		<td className='CryptoDisplay-change-neg'>{props.change}</td>
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
					<td className='CryptoDisplay-volume'>{props.volume}</td>
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
			lastUpdate: new Date(),
			price: '-',
			volume: '-',
			change: '-', 
		};
	}

	componentDidMount() {
		this.updateCryptoInfo();
		this.timerID = setInterval(() => this.updateCryptoInfo(), 30000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	updateCryptoInfo() {
		const server = 'http://localhost:8080/';
		const api = server + this.props.target + '/' + this.props.base;
		axios.get(api)
			.then(res => {
				if (!res.data.error) {
					this.setState({ price: res.data.price });
					this.setState({ volume: res.data.volume });
					this.setState({ change: res.data.change });
				}
			});
		this.setState({ lastUpdate: new Date() });
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
						<LastUpdatedRow date={this.state.lastUpdate} />
					</tbody>
				</table>
			</div>
		);
	}
}

export default CryptoDisplay;