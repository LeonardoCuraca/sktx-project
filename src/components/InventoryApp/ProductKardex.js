import React, { useState, useEffect, useCallback } from 'react';
import ProductService from '../../Services/product-service';
import moment from 'moment';
import 'moment/locale/es';

export default function ProductKardex() {
    
    const [kardex, setKardex] = useState([]);
    const [firstDay, setFirstDay] = useState(null)
    const [endDay, setEndDay] = useState(null)
    const [loading, setLoading] = useState(false);
    
    const getKardex = useCallback(async () => {
        setLoading(true);
        ProductService.getKardex({
            "firstDay": firstDay,
            "endDay": endDay
        }).then(data => {
            if (data.code === 200) {
                setLoading(false);
            }
        })
    }, [firstDay, endDay])

    const getStockRecords = React.useCallback(async () => {
        ProductService.getAllStockRecord()
        .then(data => {
            if (data.code === 200) {
                setKardex(generateKardex(data.list))
            }
        })
    }, [])

    function generateKardex(data) {
        const ordered = data.sort((a, b) => a.productStockId - b.productStockId);
        console.log(ordered)
        const info = groupBy(ordered, "productStockId");
        const nkardex = [];
        info.map(e => {
            let ndata = { warehouse: '', productName: '', productSize: '', productColor: '', initialBalance: 0, inputs: 0, outputs: 0, currentBalance: 0 };
            ndata.warehouseName = e[0].ProductStock.Warehouse.warehouseName
            ndata.productName = e[0].ProductStock.ProductVariant.Product.productName
            ndata.productSize = e[0].ProductStock.ProductVariant.Size.sizeName
            ndata.productColor = e[0].ProductStock.ProductVariant.Color.colorName
            if (e[e.length - 1].modificationTypeId === 5) {
                ndata.initialBalance = 0   
            } else {
                ndata.initialBalance = e[e.length - 1].productBalance
            }
            ndata.currentBalance = e[0].productBalance
            e.map(n => {
                if (n.modificationTypeId === 2 || n.modificationTypeId === 4 || n.modificationTypeId === 6) {
                    ndata.outputs += n.modificationQuantity
                } else if (n.modificationTypeId === 3 || n.modificationTypeId === 5) {
                    ndata.inputs += n.modificationQuantity
                }
            })
            nkardex.push(ndata)
        })
        return nkardex
    }

    function groupBy(collection, property) {
        var i = 0, val, index,
            values = [], result = [];
        for (; i < collection.length; i++) {
            val = collection[i][property];
            index = values.indexOf(val);
            if (index > -1)
                result[index].push(collection[i]);
            else {
                values.push(val);
                result.push([collection[i]]);
            }
        }
        return result;
    }

    useEffect(() => {
        getKardex();
        getStockRecords();
        console.log('asudbasiudbasidubasid')
    }, [getKardex, getStockRecords])

    return (
        <div className="ui stackable centered grid">
            <div className="fifteen wide column">
                {/* 
                <div className="ui equal width stackable grid">
                    <div className="column">
                        <div class="ui form">
                            <div class="field">
                                <label>Fecha de Inicio</label>
                                <div class="ui input left icon">                        
                                    <i class="calendar icon"></i>
                                    <input type="date" onChange={(event) => setFirstDay(event.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div class="ui form">
                            <div class="field">
                                <label>Fecha Final</label>
                                <div class="ui input left icon">                        
                                    <i class="calendar icon"></i>
                                    <input type="date" onChange={(event) => setEndDay(event.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 */}
                <div class={loading ? "ui active inverted dimmer" : "ui inverted dimmer"}>
                    <div class="ui text loader">Loading</div>
                </div>
                <table className="ui selectable compact celled single line table" style={{borderTop: ".2em solid #18b3c0"}}>
                    <thead>
                        <tr>
                            <th>Almacén</th>
                            <th>Producto</th>
                            <th>Stock Inicial</th>
                            <th className="positive">Entradas</th>
                            <th>Salidas</th>
                            <th>Stock Actual</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            kardex.map((element, i) => {
                                return <tr key={i} style={{cursor: 'pointer'}}>
                                    <td>{element.warehouseName}</td>
                                    <td>{element.productName + ' T / ' + element.productSize + ' ' + element.productColor}</td>
                                    <td>{element.initialBalance}</td>
                                    <td>{element.inputs}</td>
                                    <td>{element.outputs}</td>
                                    <td>{element.currentBalance}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}