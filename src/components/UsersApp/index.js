import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import UserList from './UserList';
import UserCreate from './UserCreate';

export default function Users() {

  let { path } = useRouteMatch();
  
  return (
    <div>
        <div className="ui header"></div>
        <h4 className="ui horizontal divider header">
            <i className="home icon"></i>
            Usuarios
        </h4>
        <Switch>
            <Route exact path={`${path}`}>
                <UserList />
            </Route>
            <Route exact path={`${path}/create`}>
                <UserCreate />
            </Route>
        </Switch>
    </div>
  )
}
