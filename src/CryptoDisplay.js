import React, { Component } from 'react';
import axios from 'axios';

function FormattedDate(props) {
	return (
		<h5>Last updated: {props.date.toLocaleTimeString()}</h5>
	);
}

function NameDisplay(props) {
	return (
		<h2>{props.name}</h2>
	);
}

function PriceDisplay(props) {
	return (
		<h3>{props.price}</h3>
	);
}

function VolumeDisplay(props) {
	return (
		<div>
			<h4>volume:</h4>
			<h4>{props.volume}</h4>
		</div>
	);
}

function ChangeDisplay(props) {
	return (
		<div>
			<h4>change:</h4>
			<h4>{props.change}</h4>
		</div>
	);
}

class CryptoDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			lastUpdate: new Date(),
			price: 'loading',
			volume: 'loading',
			change: 'loading', 
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
			<div>
				<NameDisplay name={this.props.name} />
				<PriceDisplay price={this.state.price} />
				<VolumeDisplay volume={this.state.volume} />
				<ChangeDisplay change={this.state.change} />
				<FormattedDate date={this.state.lastUpdate} />
			</div>
		);
	}
}

export default CryptoDisplay;