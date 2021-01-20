import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProviderList from './ProviderList';
import ProviderCreate from './ProviderCreate';
import PurchaseCreate from './PurchaseCreate';
import PurchasesOverview from './PurchasesOverview';
import MaterialPurchasesOverview from './MaterialPurchasesOverview';
import MaterialPurchaseCreate from './MaterialPurchaseCreate';
import PurchaseDetail from './PurchaseDetail';

export default function Purchases() {

  let { path } = useRouteMatch();
  
  return (
    <div>
        <div className="ui header"></div>
        <h4 className="ui horizontal divider header">
            <i className="chart line icon"></i>
            Compras
        </h4>
        <Switch>
            <Route exact path={`${path}`}>
                <PurchasesOverview />
            </Route>
            <Route exact path={`${path}/:purchase_id/detail`}>
                <PurchaseDetail />
            </Route>
            <Route exact path={`${path}/create`}>
                <PurchaseCreate />
            </Route>
            <Route exact path={`${path}/materialsPurchases`}>
                <MaterialPurchasesOverview />
            </Route>
            <Route exact path={`${path}/materialsPurchases/create`}>
                <MaterialPurchaseCreate />
            </Route>
            <Route exact path={`${path}/vendors`}>
                <ProviderList />
            </Route>
            <Route exact path={`${path}/vendors/create`}>
                <ProviderCreate />
            </Route>
        </Switch>
    </div>
  )
}
