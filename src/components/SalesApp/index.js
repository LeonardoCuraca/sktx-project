import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CustomersList from './CustomersList';
import CustomerCreate from './CustomerCreate';
import POS from './POS';
import SalesOverview from './SalesOverview';

export default function Sales() {

  let { path } = useRouteMatch();
  
  return (
    <div>
        <div className="ui header"></div>
        <h4 className="ui horizontal divider header">
            <i className="chart line icon"></i>
            Ventas
        </h4>
        <Switch>
            <Route exact path={`${path}`}>
                <SalesOverview />
            </Route>
            <Route exact path={`${path}/POS`}>
                <POS />
            </Route>
            <Route exact path={`${path}/customers`}>
                <CustomersList />
            </Route>
            <Route exact path={`${path}/customers/create`}>
                <CustomerCreate />
            </Route>
        </Switch>
    </div>
  )
}
