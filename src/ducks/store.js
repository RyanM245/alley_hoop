import reducer from './reducer';
import gameReducer from './gameReducer'

import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

const rootReducer = combineReducers({reducer,gameReducer})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));