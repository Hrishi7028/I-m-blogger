import { combineReducers, createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import { postReducer ,getAllPostReducer} from './reducers/postReducer'
import {ProfileReducer} from './reducers/ProfileReducer'

const rootReducer = combineReducers({
    AuthReducer,
    postReducer,
    getAllPostReducer,
    ProfileReducer
})

const middlewares = [reduxThunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;