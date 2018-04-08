import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import store from './stores/Store';
import App from './components/App';
import { Provider } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';

const app = (
	<Provider store={store}>
		<App/>
	</Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
