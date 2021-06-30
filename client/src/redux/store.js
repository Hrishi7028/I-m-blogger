import { combineReducers, createStore ,applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    AuthReducer
})

const middlewares = [reduxThunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;