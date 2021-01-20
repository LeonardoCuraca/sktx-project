import React, { useState } from 'react';
import WarehouseService from '../../Services/warehouse-service';
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function InventoryTable() {

  const {register, handleSubmit } = useForm({});

  const [messageState, setMessageState] = useState(null);
  const [message, setMessage] = useState({});

  let { warehouse_id } = useParams();

  const [productStocks, setProductStocks] = useState([]);
  const [selectedProductStock, setSelectedProductStock] = useState({});

  const getProductStocks = React.useCallback(async () => {
      WarehouseService.getProductStocks(warehouse_id)
      .then(data => {
        if (data.code === 200) {
          console.log(data.object)
          setProductStocks(data.object);
        }
      })
  }, [warehouse_id])

  React.useEffect(() => {
    getProductStocks()
      window['externalDropdownTrigger']()
  }, [getProductStocks])

  function openPriceEditModal(productStock) {
    console.log(productStock)
    setSelectedProductStock(productStock);
    window['showNormalModal']();
  }

  const updateStockPrice = (data) => {
    WarehouseService.updateProductStock(data)
    .then(data => {
        console.log(data);
        if (data.code === 0) {
            setMessageState('error');
            setMessage({'header': 'Proceso Fallido', 'content': 'Ocurrió un error al actualizar el precio.'});
        } else {
            setMessageState('success');
            setMessage({'header': 'Actualización de Precio Completada', 'content': 'Se actualizó correctamente el precio.'});
            getProductStocks();
        }
    })
  }

  let { url } = useRouteMatch();
  return (
    <div className="ui stackable centered grid">
      {messageState !== null &&
          <div className="sixteen wide column">
              <div className={"ui " + messageState + " message"}>
                  <i className="close icon" onClick={() => setMessageState(null)}></i>
                  <div className="header">{message.header}</div>
                  <p>{message.content}</p>
              </div>
          </div>
      }
      <div className="fifteen wide column">
        <Link className="ui basic button" to={`${url}/create`}>
          <i className="add icon" />
          Registrar Stock
        </Link>
        <table className="ui compact celled fixed table" style={{borderTop: ".2em solid #18b3c0"}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Talla</th>
              <th>color</th>
              <th>Stock</th>
              <th>Precio</th>
              <th colspan="2" className="center aligned">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              productStocks.map(productStock => {
                return <tr key={productStock.productStockId}>
                  <td>{productStock.productStockId}</td>
                  <td>{productStock.ProductVariant.Product.productName}</td>
                  <td>{productStock.ProductVariant.Size.sizeName}</td>
                  <td>{productStock.ProductVariant.Color.colorName}</td>
                  <td>{productStock.productQuantity}</td>
                  <td>S/. {productStock.productPrice}</td>
                  <td colspan="2" className="selectable positive center aligned" style={{cursor: 'pointer'}} onClick={() => openPriceEditModal(productStock)}>
                    <i className="pencil icon"></i> Actualizar Precio de Venta S/.
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
      <div className="ui modal">
        <div className="ui icon header">
          <i className="pencil icon"></i>
          Actualizar Precio del producto {selectedProductStock.ProductVariant?.Product.productName + ' T / ' + selectedProductStock.ProductVariant?.Size.sizeName + ' ' + selectedProductStock.ProductVariant?.Color.colorName}
        </div>
        <div className="content">
          <div className="fourteen wide column">
            <form className="ui form segment">
              <input hidden name="productStockId" value={selectedProductStock.productStockId} ref={register()}></input>
              <div className="required field">
                <label>Precio</label>
                <input 
                  type="number"
                  min="1"
                  step="any"
                  placeholder="Precio"
                  name="productPrice"
                  required
                  ref={
                    register({
                        required: {value: true, message: 'El Precio es obligatorio'}
                    })
                  }>
                </input>
              </div>
            </form>
          </div>
        </div>
        <div className="actions">
          <div className="ui red basic cancel button">
            <i className="remove icon"></i>
            Cancelar
          </div>
          <div className="ui right floated green approve button" onClick={handleSubmit(updateStockPrice)}>
            Confirmar
          </div>
        </div>
      </div>
    </div>
  )
}
