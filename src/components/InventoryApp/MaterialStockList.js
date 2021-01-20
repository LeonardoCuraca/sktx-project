import React, { useState } from 'react';
import WarehouseService from '../../Services/warehouse-service';
import { Link, useParams, useRouteMatch } from "react-router-dom";

export default function MaterialStockList() {

  let { warehouse_id } = useParams();

  const [materialStocks, setMaterialStocks] = useState([]);

  const getMaterialStocks = React.useCallback(async () => {
      WarehouseService.getMaterialStocks(warehouse_id)
      .then(data => {
        if (data.code === 200) {
            setMaterialStocks(data.object);
        }
      })
  }, [warehouse_id])

  React.useEffect(() => {
    getMaterialStocks()
      window['externalDropdownTrigger']()
  }, [getMaterialStocks])

  let { url } = useRouteMatch();
  return (
    <div className="ui stackable centered grid">
      <div className="fifteen wide column">
        <Link className="ui basic button" to={`${url}/create`}>
          <i className="add icon" />
          Registrar Stock
        </Link>
        <table className="ui compact celled fixed table" style={{borderTop: ".2em solid #18b3c0"}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Material</th>
              <th>Unidad</th>
              <th>Proveedor</th>
              <th>Cantidad</th>
              <th colSpan="2" className="center aligned">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              materialStocks.map(materialStock => {
                return <tr key={materialStock.materialStockId}>
                    <td>{materialStock.materialStockId}</td>
                    <td>{materialStock.Material.materialName}</td>
                    <td>{materialStock.Unit.unitName}</td>
                    <td>{materialStock.Provider.providerTreatment + ' ' + materialStock.Provider.providerNames + ' ' + materialStock.Provider.providerSurnames}</td>
                    <td>{materialStock.materialQuantity}</td>
                    <td className="selectable positive center aligned">
                        <a href='/'><i className="eye icon" /> Visualizar</a>
                    </td>
                    <td className="selectable negative center aligned">
                        <a href="/"><i className="trash icon"/> Quitar</a>
                    </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
