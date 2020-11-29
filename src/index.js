import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {compose, createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./store/reducers/rootReducer";
import thunk from 'redux-thunk';

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
