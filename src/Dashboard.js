import React from 'react';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import './Dashboard.css';

import Menu from './components/Menu';
import Inventory from './components/InventoryApp';
import Sales from './components/SalesApp';
import Users from './components/UsersApp';
import Purchases from './components/PurchasesApp';

function DashboardMenu() {

  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }

  let { url } = useRouteMatch();
  return (
    <div className="ui left sidebar inverted fixed vertical menu sktxMenu">
      <div className="item">
        <h1>Sukitex</h1>
        {/* <img className="ui medium image" src="https://media.discordapp.net/attachments/706276646205915208/738279276012634112/unknown.png" alt=""/> */}
      </div>
      <Link className="item" to={url}><p><i style={{marginRight: "8px"}} className="home icon"/>Inicio</p></Link>
      <Link className="item" to={`${url}/inventory`}><p><i style={{marginRight: "8px"}} className="tags icon"/>Inventario</p></Link>
      <Link className="item" to={`${url}/sales`}><p><i style={{marginRight: "8px"}} className="chart line icon"/>Ventas</p></Link>
      <Link className="item" to={`${url}/purchase`}><p><i style={{marginRight: "8px"}} className="chart line icon"/>Compras</p></Link>
      <Link className="item" to={`${url}/users`}><p><i style={{marginRight: "8px"}} className="users icon"/>Usuarios</p></Link>
      <Link className="item" to={`/`} onClick={() => logOut()}><p><i style={{marginRight: "8px"}} className="logout icon"/>Cerrar Sesión</p></Link>
    </div>
  )
}

function Dashboard() {

  let { path } = useRouteMatch();

  return (
      <div className="dashboard">
        {/* Left Content */}
        <DashboardMenu />
        <div className="dashboard-content pusher">
          <div className="toggleIcons">
            <i className="list icon menuTogleIcon" onClick={() => window['externalSktxMenuSidebarTrigger']()}/>
            <i className="list icon menuTogleIcon" onClick={() => window['externalSktxOptionsSidebarTrigger']()}/>
          </div>
          <Switch>
            <Route exact path={`${path}/`}>
              <h4 className="ui horizontal divider header">
                <i className="home icon"></i>
                Inicio
              </h4>
              <Menu />
            </Route>
            <Route path={`${path}/inventory`}>
              <Inventory />
            </Route>
            <Route path={`${path}/sales`}>
              <Sales />
            </Route>
            <Route path={`${path}/purchase`}>
              <Purchases />
            </Route>
            <Route path={`${path}/users`}>
              <Users />
            </Route>
          </Switch>
        </div>
        {/* Right Content */}
        <DashboardOptions />
      </div>
  )
}

function DashboardOptions() {
  let { path, url } = useRouteMatch();
  return (
    <div className="ui right sidebar fixed inverted vertical menu sktxOptions">
      <Switch>
        <Route path={`${path}/inventory`}>
          <div className="item">
            <div className="header">Gestión de almacenes</div>
            <div className="menu">
              <Link className="item" to={`${url}/inventory/warehouse`}>Listar almacenes</Link>
            </div>
            <div className="menu">
              <Link className="item" to={`${url}/inventory/warehouse/create`}>Crear almacén</Link>
            </div>
          </div>
          <div className="item">
            <div className="header">Productos</div>
            <div className="menu">
              <Link className="item" to={`${url}/inventory/product`}>Listar productos</Link>
            </div>
            <div className="menu">
              <Link className="item" to={`${url}/inventory/product/create`}>Crear producto</Link>
            </div>
          </div>
          <div className="item">
            <div className="header">Materiales</div>
            <div className="menu">
              <Link className="item" to={`${url}/inventory/material`}>Listar materiales</Link>
            </div>
            <div className="menu">
              <Link className="item" to={`${url}/inventory/material/create`}>Crear material</Link>
            </div>
          </div>
          <div className="item">
            <div className="header">Informes</div>
            <div className="menu">
              <Link className="item" to={`${url}/inventory/productKardex`}>Kardex de Productos</Link>
            </div>
            <div className="menu">
              <Link className="item" to={`${url}/inventory/materialKardex`}>Kardex de Materiales</Link>
            </div>
          </div>
          <div className="item">
            <div className="header">Operaciones</div>
            <div className="menu">
              <Link className="item" to={`${url}/inventory/productTransfers`}>Transferencias de Productos</Link>
            </div>
            <div className="menu">
              <Link className="item" to={`${url}/inventory/materialTransfers`}>Transferencias de Materiales</Link>
            </div>
            <div className="menu">
              <Link className="item" to={`${url}/inventory/productAdjustments`}>Ajustes de Inventario (Productos)</Link>
            </div>
            <div className="menu">
              <Link className="item" to={`${url}/inventory/materialAdjustments`}>Ajustes de Inventario (Materiales)</Link>
            </div>
          </div>
        </Route>
        <Route path={`${path}/purchase`}>
          <div className="item">
            <div className="header">Ordenes</div>
            <div className="menu">
              <Link className="item" to={`${url}/purchase/create`}>Registrar Compra de Productos</Link>
            </div>
            <div className="menu">
              <Link className="item" to={`${url}/purchase/materialsPurchases/create`}>Registrar Compra de Materiales</Link>
            </div>
          </div>
          <div className="item">
            <div className="header">Compras</div>
            <div className="menu">
              <Link className="item" to={`${url}/purchase`}>Listar Compras de Productos</Link>
            </div>
            <div className="menu">
              <Link className="item" to={`${url}/purchase/materialsPurchases`}>Listar Compras de Materiales</Link>
            </div>
          </div>
          <div className="item">
            <div className="header">Proveedor</div>
            <div className="menu">
              <Link className="item" to={`${url}/purchase/vendors`}>Listar Proveedores</Link>
            </div>
            <div className="menu">
              <Link className="item" to={`${url}/purchase/vendors/create`}>Registrar Proveedor</Link>
            </div>
          </div>
        </Route>
        <Route path={`${path}/sales`}>
          <div className="item">
            <div className="header">Punto de venta</div>
            <div className="menu">
              <Link className="item" to={`${url}/sales/POS`}>Abrir Punto de Venta</Link>
            </div>
          </div>
          <div className="item">
            <div className="header">Clientes</div>
            <div className="menu">
              <Link className="item" to={`${url}/sales/customers`}>Listar Clientes</Link>
            </div>
            <div className="menu">
              <Link className="item" to={`${url}/sales/customers/create`}>Crear cliente</Link>
            </div>
          </div>
          <div className="item">
            <div className="header">Productos</div>
            <div className="menu">
              <Link className="item" to={`${url}/purchase/product`}>Listar productos</Link>
            </div>
            <div className="menu">
              <Link className="item" to={`${url}/purchase/product/create`}>Crear producto</Link>
            </div>
          </div>
        </Route>
        <Route path={`${path}/projects`}>
          <div className="item">
            <div className="header">Proyectos</div>
            <div className="menu">
              <Link className="item" to={`${url}/sales/quotation`}>Listar Proyectos</Link>
            </div>
            <div className="menu">
              <Link className="item" to={`${url}/sales/order`}>Crear Proyecto</Link>
            </div>
          </div>
          <div className="item">
            <div className="header">Tareas</div>
            <div className="menu">
              <Link className="item" to={`${url}/sales/quotation`}>Listar Tareas</Link>
            </div>
            <div className="menu">
              <Link className="item" to={`${url}/sales/order`}>Crear Tarea</Link>
            </div>
            <div className="menu">
              <Link className="item" to={`${url}/sales/order`}>Asignar Tarea</Link>
            </div>
          </div>
          <div className="item">
            <div className="header">Informes</div>
            <div className="menu">
              <Link className="item" to={`${url}/sales/quotation`}>Análisis de Tareas</Link>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default Dashboard;
