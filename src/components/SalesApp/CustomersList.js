import React, { useState } from 'react';
import CustomerService from '../../Services/CustomerService';
import moment from 'moment';
import 'moment/locale/es';
import { Link, useRouteMatch } from 'react-router-dom';

export default function CustomersList() {

    const [customers, setCustomers] = useState([]);
    const [actualPage, setActualPage] = useState(0);
    const [totalPages, setTotalPages] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    const getCustomers = React.useCallback(async () => {
        CustomerService.getAllPaginated({
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
                setCustomers(data.list);
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
                        <h1 class="ui header">Listado de Clientes ({totalItems})</h1>
                    </div>
                    <div className="column">
                        <Link className="ui right floated basic button" to={`${url}/create`}>
                            <i className="add icon" />
                            Registrar Cliente
                        </Link>
                    </div>
                </div>
                <table className="ui selectable compact celled fixed single line table" style={{borderTop: ".2em solid #18b3c0"}}>
                    <thead>
                        <tr>
                            <th className="center aligned">ID</th>
                            <th>Cliente</th>
                            <th>RUC</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            <th>Dirección</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers.map(customer => {
                                return <tr key={customer.clientId} style={{cursor: 'pointer'}}>
                                    <td className="center aligned">{customer.clientId}</td>
                                    <td>{customer.clientTreatment + ' ' + customer.clientNames + ' ' + customer.clientSurnames}</td>
                                    <td>{customer.clientRuc}</td>
                                    <td>{customer.clientTelephone}</td>
                                    <td>{customer.clientEmail}</td>
                                    <td>{customer.Address.Via.viaName + ' ' + customer.Address.addressViaName + ' ' + customer.Address.addressNumber}</td>
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