import React, { useState } from 'react';
import ProductService from '../../Services/product-service';
import moment from 'moment';
import 'moment/locale/es';
import WarehouseService from '../../Services/warehouse-service';
import MaterialService from '../../Services/MaterialService';

export default function MaterialStockRecord() {

    const [stockRecords, setStockRecords] = useState([]);
    const [actualPage, setActualPage] = useState(0);
    const [totalPages, setTotalPages] = useState([]);

    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const getStockRecordsByWarehouse = React.useCallback(async () => {
        console.log(selectedWarehouse)
        MaterialService.getMaterialStockRecordsPaginated({
            "page": actualPage,
            "size": 10,
            "warehouseId": selectedWarehouse
        })
        .then(data => {
            if (data.code === 200) {
                console.log(data)
                let tpages = [];
                for (let i = 1; i <= data.totalPages; i++) {
                    tpages.push(i);
                  }
                setTotalPages(tpages)
                setStockRecords(data.list);
            }
        })
    })

    const getStockRecords = React.useCallback(async () => {
        console.log('hihihihih')
        MaterialService.getMaterialStockRecordsPaginated({
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
                setTotalPages(tpages)
                setStockRecords(data.list);
            }
        })
    }, [actualPage])

    WarehouseService.getAll()
    .then(data => {
        if (data.code === 200) {
            setWarehouses(data.list);
        }
    })

    const [warehouses, setWarehouses] = useState([]);

    

    React.useEffect(() => {
        if (selectedWarehouse === null) {
            getStockRecords();
        } else {
            console.log(selectedWarehouse)
            getStockRecordsByWarehouse()
        }
        window['externalDropdownTrigger']()
    }, [selectedWarehouse, actualPage])

    
    return (
        <div className="ui stackable centered grid">
            <div className="fifteen wide column">
                {/* <div className="ui selection dropdown">
                    <i className="dropdown icon"></i>
                    <span className="default text">Filtrar por almacén</span>
                    <div className="menu">
                        <div className="item" onClick={() => setSelectedWarehouse(null)}>
                            Resumen General
                        </div>
                        {
                            warehouses.map(warehouse => {
                                if (warehouse.enabled)
                                    return (
                                        <div className="item" onClick={() => setSelectedWarehouse(warehouse.warehouseId)}>
                                            <i className={warehouse.warehouseTypeId === 1 ? 'right floated tag icon' : 'right floated box icon'} style={{color: warehouse.warehouseColorCard}}/>
                                            {warehouse.warehouseName}
                                        </div>
                                    )
                            })
                        }
                    </div>
                </div> */}
                <table className="ui selectable compact celled fixed single line table" style={{borderTop: ".2em solid #18b3c0"}}>
                    <thead>
                        <tr>
                            <th className="center aligned">ID</th>
                            <th>Fecha</th>
                            <th>Almacén</th>
                            <th>Material</th>
                            <th>Saldo</th>
                            <th>Modificación</th>
                            <th>Cantidad Modificada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stockRecords.map(stockRecord => {
                                const date = new Date(Date.parse(stockRecord.createdAt));
                                return <tr key={stockRecord.materialStockRecordId} style={{cursor: 'pointer'}}>
                                    <td className="center aligned">{stockRecord.materialStockRecordId}</td>
                                    <td>{moment(date.toString()).format('L, h:mm a')}</td>
                                    <td>{stockRecord.MaterialStock.Warehouse.warehouseName}</td>
                                    <td>{stockRecord.MaterialStock.Unit.unitName + ' de ' + stockRecord.MaterialStock.Material.materialName}</td>
                                    <td>{stockRecord.materialBalance}</td>
                                    <td>{stockRecord.ModificationType.modificationTypeName}</td>
                                    <td>{stockRecord.modificationQuantity}</td>
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