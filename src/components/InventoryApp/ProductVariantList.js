import React, { useState } from 'react';
import ProductService from '../../Services/product-service';
import { Link, useRouteMatch } from 'react-router-dom';
import { useParams } from "react-router-dom";

export default function InventoryTable() {

  let { product_id } = useParams();

  const [variants, setVariants] = useState([]);

  const getVariants = React.useCallback(async () => {
      ProductService.getVariantByProduct(product_id)
      .then(data => {
        if (data.code === 200) {
          setVariants(data.list);
        }
      })
  }, [product_id])

  React.useEffect(() => {
    getVariants()
      window['externalDropdownTrigger']()
  }, [getVariants])

  let { url } = useRouteMatch();
  return (
    <div className="ui stackable centered grid">
      <div className="fourteen wide column">
          <Link className="ui basic button" to={`${url}/create`}>
              <i className="add icon" />
              Añadir Variante de Producto
          </Link>
      </div>
      <div className="fourteen wide column">
        <table className="ui compact celled fixed table" style={{borderTop: ".2em solid #18b3c0"}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Talla</th>
              <th>Color</th>
              <th colSpan="2" className="center aligned">Acciones</th>
            </tr>
          </thead>
          <tbody>
              {
                  variants.map(variant => {
                  return <tr key={variant.productVariantId}>
                      <td>{variant.productVariantId}</td>
                      <td>{variant.Product.productName}</td>
                      <td>{variant.Size.sizeName}</td>
                      <td>{variant.Color.colorName}</td>
                      <td className="selectable warning center aligned">
                        <Link to={`${url + '/' + variant.productVariantId}/edit`}>
                          <i className="pencil icon" /> Editar
                        </Link>
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
