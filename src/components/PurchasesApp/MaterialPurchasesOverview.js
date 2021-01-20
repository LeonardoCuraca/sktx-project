import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { Link, useRouteMatch } from 'react-router-dom';
import PurchasesService from '../../Services/PurchasesService';

export default function MaterialPurchasesOverview() {

    const [purchases, setPurchases] = useState([]);
    const [actualPage, setActualPage] = useState(0);
    const [totalPages, setTotalPages] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    const getCustomers = React.useCallback(async () => {
        PurchasesService.getAllMaterialPurchasesPaginated({
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
                setPurchases(data.list);
            }
        })
    }, [actualPage])

    

    React.useEffect(() => {
        getCustomers();
        window['externalDropdownTrigger']()
    }, [getCustomers])

    let { url } = useRouteMatch();
    return (
        <div className="ui stackable centered grid">
            <div className="fifteen wide column">
                <div className="ui equal width stackable grid">
                    <div className="column">
                        <h1 class="ui header">Listado de Compras ({totalItems})</h1>
                    </div>
                    <div className="column">
                        <Link className="ui right floated basic button" to={`${url}/create`}>
                            <i className="add icon" />
                            Registrar Compra
                        </Link>
                    </div>
                </div>
                <table className="ui selectable compact celled fixed single line table" style={{borderTop: ".2em solid #18b3c0"}}>
                    <thead>
                        <tr>
                            <th className="center aligned">ID</th>
                            <th>Fecha</th>
                            <th>Proveedor</th>
                            <th>Encargado</th>
                            <th>Cantidad de Productos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            purchases.map(purchase => {
                                return <tr key={purchase.materialPurchaseId} style={{cursor: 'pointer'}}>
                                    <td className="center aligned">{purchase.materialPurchaseId}</td>
                                    <td>{moment(purchase.createdAt).format('L, hh:mm:ss')}</td>
                                    <td>{purchase.Provider.providerNames}</td>
                                    <td>{purchase.User.userNames}</td>
                                    <td>{purchase.MaterialPurchaseDetails.length}</td>
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