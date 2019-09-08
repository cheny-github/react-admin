import {createStore} from 'redux';
import {calculate} from './reducer';

const store = createStore(calculate)

export {store}