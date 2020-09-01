import reducer from './reducer';

import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

const rootReducer = combineReducers({reducer})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));