import {useSelector} from 'react-redux';
import { Redirect, Route } from 'react-router';


const RouteLinks = (props) => {
    const {user} = useSelector((state) => (state.AuthReducer));
    return user ?  <Redirect to='/' />  :<Route exact={props.exact} path={props.path} component={props.component} />
}

export default RouteLinks;