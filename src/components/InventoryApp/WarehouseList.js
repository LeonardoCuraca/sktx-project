import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import WarehouseService from '../../Services/warehouse-service';

export default function WarehouseList() {

    const [warehouses, setWarehouses] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState({});

    const [messageState, setMessageState] = useState(null);
    const [message, setMessage] = useState({});
    
    const getWarehouses = React.useCallback(async () => {
        WarehouseService.getAll()
        .then(data => {
            if (data.code === 200) {
                setWarehouses(data.list);
            }
        })
    }, [])

    React.useEffect(() => {
        getWarehouses()
        window['externalDropdownTrigger']()
    }, [getWarehouses])

    function openDeleteModal(warehouse) {
        setSelectedWarehouse(warehouse);
        window['showModal']();
    }

    function deleteWarehouse(warehouseId) {
        WarehouseService.deleteWarehouse(warehouseId)
        .then(data => {
            console.log(data);
            if (data.code === 0) {
                setMessageState('error');
                setMessage({'header': 'Proceso Fallido', 'content': 'Ocurrió un error al inhabilitar el almacén.'});
            } else {
                setMessageState('success');
                setMessage({'header': 'Eliminación Lógica Completada', 'content': 'Se inhabilitó correctamente el almacén.'});
                getWarehouses();
            }
        })
    }

    let { url } = useRouteMatch();
    return (
        <div className="ui grid segment">
            <div className="sixteen wide column">
                <Link className="ui basic button" to={`${url}/create`}>
                    <i className="add icon" />
                    Añadir Almacén
                </Link>
                {/* <button className="ui basic button right floated">
                    <i className="clipboard list icon" />
                    Generar Reporte
                </button> */}
            </div>
            {messageState !== null &&
                <div className="sixteen wide column">
                    <div className={"ui " + messageState + " message"}>
                        <i className="close icon" onClick={() => setMessageState(null)}></i>
                        <div className="header">{message.header}</div>
                        <p>{message.content}</p>
                    </div>
                </div>
            }
            <div className="sixteen wide column">
                <div className="ui three stackable cards">
                    {
                        warehouses.map(warehouse => {
                            if (warehouse.enabled)
                                return (
                                    <WarehouseCard key={warehouse.warehouseId} warehouse={warehouse} openDeleteModal={openDeleteModal}/>
                                )
                        })
                    }
                </div>
            </div>
            <div className="ui basic modal">
                <div className="ui icon header">
                    <i className="trash icon"></i>
                    Eliminar Almacén {selectedWarehouse.warehouseName}
                </div>
                <div className="content">
                    <p>¿Está seguro(a) de eliminar el almacén?</p>
                </div>
                <div className="actions">
                    <div className="ui red basic cancel inverted button">
                        <i className="remove icon"></i>
                        No
                    </div>
                    <div className="ui green ok inverted button" onClick={() => deleteWarehouse(selectedWarehouse.warehouseId)}>
                        <i className="checkmark icon"></i>
                        Sí
                    </div>
                </div>
            </div>
        </div>
    )
}

function WarehouseCard({ warehouse, openDeleteModal}) {

    let { path } = useRouteMatch();

    console.log(warehouse);

    React.useEffect(() => {
        window['externalDropdownTrigger']()
    })

    return (
        <div className="card" style={{borderLeft: '16px solid' + warehouse.warehouseColorCard}}>
            <div className="content">
                <div className="header" style={{display: 'flex', justifyContent: 'space-between'}}>
                    {warehouse.warehouseName}
                    <div class="ui pointing dropdown top right">
                        <i className={warehouse.warehouseTypeId === 1 ? 'right floated tag icon' : 'right floated box icon'} style={{color: warehouse.warehouseColorCard}}/>
                        <div class="menu" style={{margin: '0.5rem -0.5rem'}}>
                            <Link className="item" to={warehouse.warehouseTypeId === 1 ? `${path}/${warehouse.warehouseId}/productStock` : `${path}/${warehouse.warehouseId}/materialStock`}>
                                <i className="eye icon" style={{color: '#18b3c0'}} />
                                Visualizar Registros
                            </Link>
                            <Link className="item" to={`${path}/${warehouse.warehouseId}/edit`}>
                                <i className="pencil icon yellow" />
                                Editar Almacén
                            </Link>
                            <div className="item" onClick={() => openDeleteModal(warehouse)}>
                                <i className="trash icon red" />
                                Eliminar Almacén
                            </div>
                        </div>
                    </div>
                </div>
                <div className="meta">{warehouse.WarehouseType.warehouseTypeName}</div>
            </div>
            <div className="content">
                <div class="ui list">
                    <div class="item">
                        <i class="phone icon"></i>
                        <div class="content">
                            <div class="header">Teléfono</div>
                            <div class="description">{warehouse.warehouseTelephone}</div>
                        </div>
                    </div>
                    <div class="item">
                        <i class="map marker alternate icon"></i>
                        <div class="content">
                            <div class="header">Dirección</div>
                            <div class="description">{warehouse.Address.Via.viaName + ' ' + warehouse.Address.addressViaName + ' ' + warehouse.Address.addressNumber}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}