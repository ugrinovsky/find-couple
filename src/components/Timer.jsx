import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './../styles/Timer.css';

@inject('store') @observer class Timer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			time: this.props.time
		}
	}
	tick() {
		if (this.state.time > 0) {
			this.setState({
				time: this.state.time - 1
			});
		}else{
			this.stop();
		}

		if (this.state.time === 0) {
			this.props.store.fail = true;
		}
	}
	stop() {
		clearInterval(this.timerID)
	}
	componentDidMount() {
		this.timerID = setInterval(() => {
			this.tick();
		}, 1000);
	}
	componentWillUnmount(){
		this.stop();
	}
	render() {

		const timeString = `Время до проигрыша: ${this.state.time}`;
		const store = this.props.store;

		return(
			<div className="timer">{store.finish ? 'Вы выиграли! ☺️' : (  !store.fail ? timeString : 'Вы проиграли... 😔')}</div>
		);
	}
}

export default Timer;