import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import InventoryTable from './table';
import CreateProductStock from './CreateProductStock';
import CreateWarehouse from './CreateWarehouse';
import WarehouseList from './WarehouseList';
import InventoryOverview from './InventoryOverview';
import ProductList from './ProductList';
import ProductVariantList from './ProductVariantList';
import ProductVariantCreate from './ProductVariantCreate';
import ProductCreate from './ProductCreate';
import ProductEdit from './ProductEdit';
import EditWarehouse from './EditWarehouse';
import ProductTransferList from './ProductTransferList';
import ProductTransferDetail from './ProductTransferDetail';
import ProductTransferCreate from './ProductTransferCreate';
import ProductKardex from './ProductKardex';
import MaterialList from './MaterialList';
import MaterialEdit from './MaterialEdit';
import MaterialStockList from './MaterialStockList';
import MaterialStockCreate from './MaterialStockCreate';
import MaterialCreate from './MaterialCreate';
import ProductAdjustmentsList from './ProductAdjustmentList';
import ProductAdjustmentCreate from './ProductAdjustmentCreate';
import MaterialTransferList from './MaterialTransferList';
import MaterialTransferCreate from './MaterialTransferCreate';
import MaterialStockRecord from './MaterialStockRecord';
import MaterialAdjustmentsList from './MaterialAdjustmentsList';
import MaterialAdjustmentCreate from './MaterialAdjustmentCreate';
import MaterialKardex from './MaterialKardex';

export default function Inventory() {

  let { path } = useRouteMatch();
  
  return (
    <div>
      <div className="ui header"></div>
      <h4 className="ui horizontal divider header">
        <i className="tags icon"></i>
        Inventario
      </h4>
      <Switch>
        <Route exact path={`${path}`}>
          <InventoryOverview />
        </Route>
        <Route exact path={`${path}/materialStockRecord`}>
          <MaterialStockRecord />
        </Route>
        <Route exact path={`${path}/warehouse`}>
          <WarehouseList />
        </Route>
        <Route exact path={`${path}/warehouse/create`}>
          <CreateWarehouse />
        </Route>
        <Route exact path={`${path}/warehouse/:warehouse_id/edit`}>
          <EditWarehouse />
        </Route>
        <Route exact path={`${path}/warehouse/:warehouse_id/productStock`}>
          <InventoryTable />
        </Route>
        <Route exact path={`${path}/warehouse/:warehouse_id/materialStock`}>
          <MaterialStockList />
        </Route>
        <Route exact path={`${path}/warehouse/:warehouse_id/materialStock/create`}>
          <MaterialStockCreate />
        </Route>
        <Route exact path={`${path}/warehouse/:warehouse_id/productStock/create`}>
          <CreateProductStock />
        </Route>
        <Route exact path={`${path}/product`}>
          <ProductList />
        </Route>
        <Route exact path={`${path}/product/create`}>
          <ProductCreate />
        </Route>
        <Route exact path={`${path}/product/:product_id/edit`}>
          <ProductEdit />
        </Route>
        <Route exact path={`${path}/product/:product_id/variant`}>
          <ProductVariantList />
        </Route>
        <Route exact path={`${path}/product/:product_id/variant/create`}>
          <ProductVariantCreate />
        </Route>
        <Route exact path={`${path}/productTransfers`}>
          <ProductTransferList />
        </Route>
        <Route exact path={`${path}/productTransfers/:productTransfer_id/detail`}>
          <ProductTransferDetail />
        </Route>
        <Route exact path={`${path}/productTransfers/create`}>
          <ProductTransferCreate />
        </Route>
        <Route exact path={`${path}/productKardex`}>
          <ProductKardex />
        </Route>
        <Route exact path={`${path}/materialKardex`}>
          <MaterialKardex />
        </Route>
        <Route exact path={`${path}/productAdjustments`}  >
          <ProductAdjustmentsList />
        </Route>
        <Route exact path={`${path}/productAdjustments/create`}  >
          <ProductAdjustmentCreate />
        </Route>
        <Route exact path={`${path}/material`}>
          <MaterialList />
        </Route>
        <Route exact path={`${path}/material/create`}>
          <MaterialCreate />
        </Route>
        <Route exact path={`${path}/material/:material_id/edit`}>
          <MaterialEdit />
        </Route>
        <Route exact path={`${path}/materialTransfers`}>
          <MaterialTransferList />
        </Route>
        <Route exact path={`${path}/materialTransfers/create`}>
          <MaterialTransferCreate />
        </Route>
        <Route exact path={`${path}/materialAdjustments`}  >
          <MaterialAdjustmentsList />
        </Route>
        <Route exact path={`${path}/materialAdjustments/create`}  >
          <MaterialAdjustmentCreate />
        </Route>
      </Switch>
    </div>
  )
}
