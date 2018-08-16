import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

import './css/index.css';
import App from './Containers/App';
import registerServiceWorker from './registerServiceWorker';
import { getAllMuseums } from './actions'

const store = createStore(reducers, applyMiddleware(thunk))

store.dispatch(getAllMuseums())

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  , document.getElementById('root'));

registerServiceWorker();
