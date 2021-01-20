import React, { useState } from 'react';
import UsersService from '../../Services/UsersService';
import 'moment/locale/es';
import { Link, useRouteMatch } from 'react-router-dom';

export default function UserList() {

    const [users, setUsers] = useState([]);
    const [actualPage, setActualPage] = useState(0);
    const [totalPages, setTotalPages] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    const getUsers = React.useCallback(async () => {
        UsersService.getAllPaginated({
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
                setUsers(data.list);
            }
        })
    }, [actualPage])

    

    React.useEffect(() => {
        getUsers();
        window['externalDropdownTrigger']()
    }, [getUsers])

    let { url } = useRouteMatch();
    return (
        <div className="ui stackable centered grid">
            <div className="fifteen wide column">
                <div className="ui equal width stackable grid">
                    <div className="column">
                        <h1 class="ui header">Listado de Usuarios ({totalItems})</h1>
                    </div>
                    <div className="column">
                        <Link className="ui right floated basic button" to={`${url}/create`}>
                            <i className="add icon" />
                            Registrar Usuario
                        </Link>
                    </div>
                </div>
                <table className="ui selectable compact celled fixed single line table" style={{borderTop: ".2em solid #18b3c0"}}>
                    <thead>
                        <tr>
                            <th className="center aligned">ID</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            <th>Dirección</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => {
                                return <tr key={user.userId} style={{cursor: 'pointer'}}>
                                    <td className="center aligned">{user.userId}</td>
                                    <td>{user.userNames}</td>
                                    <td>{user.userSurnames}</td>
                                    <td>{user.userTelephone}</td>
                                    <td>{user.userEmail}</td>
                                    <td>{user.Address.Via.viaName + ' ' + user.Address.addressViaName + ' ' + user.Address.addressNumber}</td>
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