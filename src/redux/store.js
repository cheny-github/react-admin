import {createStore,applyMiddleware} from 'redux';
import {calculate} from './reducer';
import thunk from 'redux-thunk';
const store = createStore(calculate,applyMiddleware(thunk))

export {store}