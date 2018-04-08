import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './../styles/Cell.css';

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

export default Cell;