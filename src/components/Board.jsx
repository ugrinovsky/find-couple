import React, { Component } from 'react';
import Timer from './Timer';
import Cell from './Cell';
import './../styles/Board.css';

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

export default Board;