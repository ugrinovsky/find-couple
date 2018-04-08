import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './Store';
import App from './App';
import { Provider } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';

const app = (
	<Provider store={store}>
		<App/>
	</Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
