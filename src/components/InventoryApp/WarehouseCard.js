import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export default function WarehouseCard(props) {

    let { path } = useRouteMatch();

    const warehouse = props.warehouse;
    console.log(warehouse);

    React.useEffect(() => {
        window['externalDropdownTrigger']()
    })

    return (
        <div className="card">
            <div className="content">
                <div className="header" style={{display: 'flex', justifyContent: 'space-between'}}>
                    {warehouse.warehouseName}
                    <div class="ui pointing dropdown top right">
                        <i className={warehouse.warehouseTypeId === 1 ? 'right floated tag icon' : 'right floated box icon'} style={{color: warehouse.warehouseColorCard}}/>
                        <div class="menu" style={{margin: '0.5rem -0.5rem'}}>
                            <Link className="item" to={`${path}/${warehouse.warehouseId}/products`}>
                                <i className="eye icon" />
                                Visualizar Registros
                            </Link>
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