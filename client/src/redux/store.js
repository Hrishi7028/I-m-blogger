import { combineReducers, createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import { postReducer ,getAllPostReducer} from './reducers/postReducer'


const rootReducer = combineReducers({
    AuthReducer,
    postReducer,
    getAllPostReducer
})

const middlewares = [reduxThunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;