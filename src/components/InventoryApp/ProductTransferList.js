import React, { useState } from 'react';
import CustomerService from '../../Services/CustomerService';
import moment from 'moment';
import 'moment/locale/es';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import ProductService from '../../Services/product-service';

export default function ProductTransferList() {

    const [productTransfers, setProductTransfers] = useState([]);

    const [actualPage, setActualPage] = useState(0);
    const [totalPages, setTotalPages] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    const getProductTransfers = React.useCallback(async () => {
        ProductService.getProductTransfersPaginated({
            "page": actualPage,
            "size": 10
        })
        .then(data => {
            if (data.code === 200) {
                console.log(data)
                let tpages = [];
                for (let i = 1; i <= data.totalPages; i++) {
                    tpages.push(i);
                }
                setTotalItems(data.totalItems)
                setTotalPages(tpages)
                setProductTransfers(data.list);
            }
        })
    }, [actualPage])

    

    React.useEffect(() => {
        getProductTransfers();
        window['externalDropdownTrigger']()
    }, [getProductTransfers])

    let { url } = useRouteMatch();

    const history = useHistory();
    return (
        <div className="ui stackable centered grid">
            <div className="fifteen wide column">
                <div className="ui equal width stackable grid">
                    <div className="column">
                        <h1 className="ui header">Listado de Traslados ({totalItems})</h1>
                    </div>
                    <div className="column">
                        <Link className="ui right floated basic button" to={`${url}/create`}>
                            <i className="add icon" />
                            Trasladar Producto
                        </Link>
                    </div>
                </div>
                <table className="ui selectable compact celled fixed single line table" style={{borderTop: ".2em solid #18b3c0"}}>
                    <thead>
                        <tr>
                            <th className="center aligned">ID</th>
                            <th>Producto</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Cantidad transferida</th>
                            <th>Stock Record ID</th>
                            <th>Usuario encargado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productTransfers.map(productTransfer => {
                                return <tr key={productTransfer.productTransferId} style={{cursor: 'pointer'}} onClick={() => history.push(`${url}/${productTransfer.productTransferId}/detail`)}>
                                    <td className="center aligned">{productTransfer.productTransferId}</td>
                                    <td>{productTransfer.ProductStock.ProductVariant.Product.productName + ' ' + productTransfer.ProductStock.ProductVariant.Size.sizeName + ' ' + productTransfer.ProductStock.ProductVariant.Color.colorName}</td>
                                    <td>{productTransfer.originWarehouse.warehouseName}</td>
                                    <td>{productTransfer.destinationWarehouse.warehouseName}</td>
                                    <td>{productTransfer.productQuantity}</td>
                                    <td>{productTransfer.productStockRecordId}</td>
                                    <td>{productTransfer.User.userNames + ' ' + productTransfer.User.userSurnames}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                {totalPages.length > 1 &&
                    <div className="ui right floated pagination menu">
                        {actualPage === 0 ?
                            <a className="icon disabled item">
                                <i className="left chevron icon"></i>
                            </a>
                            :
                            <a className="icon item" onClick={() => setActualPage(actualPage - 1)}>
                                <i className="left chevron icon"></i>
                            </a>
                        }
                        {
                            totalPages.map(page => {
                                return page === actualPage + 1 ? 
                                    <a className="active item" onClick={() => setActualPage(page - 1)}>{page}</a>
                                    :
                                    <a className="item" onClick={() => setActualPage(page - 1)}>{page}</a>
                            })
                        }
                        {totalPages.length === actualPage + 1 ?
                            <a className="icon disabled item">
                                <i className="right chevron icon"></i>
                            </a>
                            :
                            <a className="icon item" onClick={() => setActualPage(actualPage + 1)}>
                                <i className="right chevron icon"></i>
                            </a>
                        }
                    </div>
                }
            </div>
        </div>
    )
}