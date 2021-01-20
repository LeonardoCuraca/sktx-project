import React from 'react';
import CustomerService from '../../Services/CustomerService';
import ProviderService from '../../Services/ProviderService';
import PurchasesService from '../../Services/PurchasesService';
import SalesService from '../../Services/SalesService';

import Panel from '../../shared/components/Panel';

export default function Menu() {

  const [purchaseTotal, setPurchaseTotal] = React.useState(0);
  const [purchaseMaterialTotal, setPurchaseMaterialTotal] = React.useState(0);

  const [salesTotal, setSalesTotal] = React.useState(0);

  const [providersTotal, setProvidersTotal] = React.useState(0);
  const [customersTotal, setCustomersTotal] = React.useState(0);

    const getData = React.useCallback(async () => {
      PurchasesService.getAll()
      .then(data => {
          if (data.code === 200) {
              setPurchaseTotal(data.list.length);
          }
      }, [])
      PurchasesService.getAllMaterialPurchases()
      .then(data => {
        if (data.code === 200) {
          setPurchaseMaterialTotal(data.list.length);
        }
      }, [])
      SalesService.getAll()
      .then(data => {
        if (data.code === 200) {
          console.log(data)
          setSalesTotal(data.list.length);
        }
      }, [])
      ProviderService.getAll()
      .then(data => {
        if (data.code === 200) {
          console.log(data)
          setProvidersTotal(data.list.length);
        }
      }, [])
      CustomerService.getAll()
      .then(data => {
        if (data.code === 200) {
          console.log(data)
          setCustomersTotal(data.list.length);
        }
      }, [])
    }, [])

    React.useEffect(() => {
      getData();
        window['externalDropdownTrigger']()
    }, [getData])

  return (
    <div className="ui stackable grid">
      <div className="four wide column">
        <Panel title="Compras de Productos" data={purchaseTotal} color="teal" icon="tag"/>
      </div>
      <div className="four wide column">
        <Panel title="Compras de Materiales" data={purchaseMaterialTotal} color="red" icon="box"/>
      </div>
      <div className="four wide column">
        <Panel title="Ventas de Productos" data={salesTotal} color="green" icon="money bill alternate outline"/>
      </div>
      <div className="four wide column">
        <Panel title="Proveedores" data={providersTotal} color="skyeblue" icon="users"/>
      </div>
      <div className="four wide column">
        <Panel title="Clientes" data={customersTotal} color="blue" icon="users"/>
      </div>
    </div>
  )
}
