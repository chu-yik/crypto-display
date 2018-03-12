import React, { Component } from 'react';

const RESPONSE = { 
	"base": "btc", 
	"target": "usd", 
	"change": 38.44495445, 
	"lastUpdated": 1520823901, 
	"price": 9576.23507113, 
	"volume": 112763.99131044 
};

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
		this.state = { lastUpdate: new Date() };
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 5000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		this.setState({ lastUpdate: new Date() });
	}

	render() {
		return (
			<div>
				<NameDisplay name={this.props.name} />
				<PriceDisplay price={RESPONSE.price} />
				<VolumeDisplay volume={RESPONSE.volume} />
				<ChangeDisplay change={RESPONSE.change} />
				<FormattedDate date={this.state.lastUpdate} />
			</div>
		);
	}
}

export default CryptoDisplay;