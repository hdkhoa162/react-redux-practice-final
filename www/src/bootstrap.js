
import React from 'react';
import ReactDOM from 'react-dom';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { saveGlobalState } from './common/store/localStateStorage';
import rootReducers from './reducers/index';
import App from './app';


const history = createHistory();
const initialState = {};//window.__INITIAL_STATE__; // eslint-disable-line
const middlewares = process.env.NODE_ENV !== 'production' ? [thunk] : [thunk];
const enhancers = [
  applyMiddleware(...middlewares),
];
const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(rootReducers, fromJS(initialState), composeEnhancers(...enhancers));

store.subscribe(() => saveGlobalState(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);