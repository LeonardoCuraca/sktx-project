import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { Link, useRouteMatch } from 'react-router-dom';
import ProductService from '../../Services/product-service';
import MaterialService from '../../Services/MaterialService';

export default function MaterialAdjustmentsList() {

    const [adjustments, setAdjustments] = useState([]);
    const [actualPage, setActualPage] = useState(0);
    const [totalPages, setTotalPages] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    const getAdjustments = React.useCallback(async () => {
        MaterialService.getAdjustmentsPaginated({
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
                setTotalItems(data.list.length)
                setTotalPages(tpages)
                setAdjustments(data.list);
            }
        })
    }, [actualPage])

    

    React.useEffect(() => {
        getAdjustments();
        window['externalDropdownTrigger']()
    }, [getAdjustments])

    let { url } = useRouteMatch();
    return (
        <div className="ui stackable centered grid">
            <div className="fifteen wide column">
                <div className="ui equal width stackable grid">
                    <div className="column">
                        <h1 class="ui header">Ajustes de Inventario de Materiales ({totalItems})</h1>
                    </div>
                    <div className="column">
                        <Link className="ui right floated basic button" to={`${url}/create`}>
                            <i className="add icon" />
                            Ajustar Inventario
                        </Link>
                    </div>
                </div>
                <table className="ui selectable compact celled fixed single line table" style={{borderTop: ".2em solid #18b3c0"}}>
                    <thead>
                        <tr>
                            <th className="center aligned">ID</th>
                            <th>Fecha de Ajuste</th>
                            <th>Almacén</th>
                            <th>Material</th>
                            <th>Cantidad Ajustada</th>
                            <th>Motivo</th>
                            <th>Usuario Encargado</th>
                            <th>Stock Record</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            adjustments.map(adjustment => {
                                return <tr key={adjustment.inventoryAdjustmentId} style={{cursor: 'pointer'}}>
                                    <td className="center aligned">{adjustment.inventoryAdjustmentId}</td>
                                    <td>{moment(adjustment.createdAt.toString()).format('L, h:mm a')}</td>
                                    <td>{adjustment.MaterialStock.Warehouse.warehouseName}</td>
                                    <td>{adjustment.MaterialStock.Unit.unitName + ' de ' + adjustment.MaterialStock.Material.materialName}</td>
                                    <td>{adjustment.materialQuantity}</td>
                                    <td>{adjustment.AdjustmentReason.adjustmentReasonName}</td>
                                    <td>{adjustment.User.userNames + ' ' + adjustment.User.userSurnames}</td>
                                    <td>{adjustment.materialStockRecordId}</td>
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