import { combineReducers, createStore ,applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer'

const rootReducer = combineReducers({
    AuthReducer
})

const middlewares = [reduxThunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;