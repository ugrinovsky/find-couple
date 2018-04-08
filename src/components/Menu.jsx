import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

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

export default Menu;