import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import { withRouter } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import SignIn from './components/Signin';
import decode from 'jwt-decode';
import PrivateRoute from './common/PrivateRoute';

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    }
  }

  componentWillMount = () => {

    const jwt = JSON.parse(localStorage.getItem('__user'));
    
    if (this.props.location.pathname === '/') {
      this.props.history.push({
        pathname: '/todo'      
      })
    }

    if (this.props.location.pathname !== '/signin' && _.isEmpty(jwt)) {
      this.props.history.push('/signin');
    }

    if (!_.isEmpty(jwt) && this.props.location.pathname !== '/signin') {
      const exp = moment.unix(decode(jwt.token).exp).format('YYYY/MM/DD HH:mm');
      const currentTime = moment(new Date()).format('YYYY/MM/DD HH:mm');
      const isBefore = moment(exp).isBefore(currentTime);
      console.log('exp ', exp);
      if (isBefore) {       
        global.isSignedIn = false;       
      } else {        
        global.isSignedIn = true;        
      }
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={SignIn} />
          {/* <Route path="/" component={TodoList} /> */}
          {/* <Route path="/todo" component={TodoList} /> */}
          <PrivateRoute path="/todo" component={TodoList} />
          <PrivateRoute path="/addtodo" component={AddTodo} />
          {/* <Route path="/addtodo" component={AddTodo} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}
export default withRouter(App);
