import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './App.css';

@inject('store') @observer class Menu extends Component {
	handleCLick(e) {
		e.preventDefault();

		this.props.store.start = true;
	}
	handleChange(e) {
		this.props.store.complexity = e.target.value;
	}
	render() {
		return (
			<div className="menu">
				<label htmlFor="complexity">Выберите сложность: </label>
				<select id="complexity" onChange={(e) => this.handleChange(e)}>
					<option value="4">4</option>
					<option value="16">16</option>
					<option value="36">36</option>
				</select>
				<button onClick={(e) => this.handleCLick(e)}>Начать</button>
			</div>
		);
	}
}

@inject('store') @observer class App extends Component {
	updateField(newField) {
		this.setState({
			currentField: newField
		});
	}
  	render() {

  		const store = this.props.store;
  		const className = (store.fail || store.finish) ? 'disable' : '';
  		const menu = <Menu/>;
  		const board = <Board fields={store.complexity} time={store.time}/>;

    	return (
      		<div className={className + ' App'}
      		>
      			{!store.start ? menu : board}
      		</div>
    	);
  	}
}

class Board extends Component {
	shuffle(arr) {
	    return arr.sort(() => {
	    	return 0.5 - Math.random();
	    });
	}
	fill(n) {
		return [...Array(n).keys()];
	}
	generate() {
		const half = this.props.fields / 2;
		const arr1 = this.shuffle(this.fill(half)); 
		const arr2 = this.shuffle(this.fill(half));

		return arr1.concat(arr2);
	}
	render() {
		const cells = [];
		const arr = this.generate();
		const fields = this.props.fields;

		for(let i = 0; i < this.props.fields; i++){
			cells.push(<Cell key={i} order={i} index={arr[i]}/>)
		}

		const style = {
			width: Math.sqrt(fields) * 100,
			height: Math.sqrt(fields) * 100
		};

		return(
			<div>
	  			<Timer time={this.props.time}/>
				<div style={style} className="board">{cells}</div>
			</div>
		)
	}
}

@inject( 'store') @observer class Cell extends Component {
	constructor(props){
		super(props);

		this.state = {
			done: false
		};
	}
	handleCLick(e, index, order) {
		e.preventDefault();

		const store = this.props.store;

		if (!this.state.done && !store.blocked && store.selected[order] !== -1) {

			if (store.count % 2 === 1) {

				const prev = store.getIsset(index);
				const prevKey = store.getKey(prev);

				if (prev === index && order !== parseInt(prevKey, 10)) {

					store.updateField(index, order);
					store.state = true;
					store.selected[prevKey] = -1;
					store.selected[order] = -1;

				} else if(prev !== index && store.selected[prev] !== -1 && store.selected[order] !== -1) {

					store.blocked = true;
					setTimeout(() => {
						store.blocked = false;
						store.clear();
					}, 600);
				}
			}

			if (store.state === false) {
				store.updateField(index, order);
			}else{
				store.state = false;
			}

			if (store.count === store.complexity) {
				store.finish = true;
			}
		}
	}
	render() {
		const store = this.props.store;
		const index = this.props.index;
		const order = this.props.order;

		const url = `https://picsum.photos/100?image=${index + 5}`;
		const classCell = `cell${store.selected[index]}`;
		const src = (store.selected[order] === -1 || store.selected[order] === index) ? `${url}` : '';

		return(
			<div 
				onClick={(e) => this.handleCLick(e, index, order)} 
				className={`${classCell} cell`}
			>
				<img 
					src={src}
					alt=''
				/>
			</div>
		);
	}
}

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

export default App;
