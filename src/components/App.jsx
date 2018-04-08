import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Menu from './Menu';
import Board from './Board';
import './../styles/App.css';

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

export default App;
