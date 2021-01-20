import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ProductService from '../../Services/product-service';
import WarehouseService from '../../Services/warehouse-service';

export default function ProductTransferCreate() {
    const [formState, setFormState] = useState(null);
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(true);

    const [selectedStock, setSelectedStock] = useState({});
    const [maxQuantity, setMaxQuantity] = useState(0)

    const {register, handleSubmit, errors, reset} = useForm({});

    const onSubmit = (data) => {
        data['productQuantity'] = parseInt(data['productQuantity'])
        console.log(data)
        setLoading(true);
        ProductService.createProductTransfer(data)
        .then(data => {
            if (data.code === 200) {
                setMessage({'header': 'Registro Completado', 'content': 'Se ha creado el usuario con éxito.'})
                setFormState('success');
            } else {
                if (data.msg) {
                    setMessage({'header': 'Proceso Fallido', 'content': data.msg});
                } else {
                    setMessage({'header': 'Registro Fallido', 'content': 'Se produjo un error al crear el usuario.'});
                }
                setFormState('error');
            }
            setLoading(false);
        })
    }

    const [warehouses, setWarehouses] = useState([]);
    const [warehousesD, setWarehousesD] = useState([]);

    const getWarehouse = React.useCallback(async () =>{
        WarehouseService.getAll()
        .then(data => {
            if (data.code === 200) {
                setWarehouses(data.list);
                setLoading(false)
            }
        })
    }, [])

    const [variants, setVariants] = useState([]);

    const getVariants = React.useCallback(async (warehouseId) =>{
        console.log(warehouseId)
        ProductService.getProductStockByWarehouse(warehouseId)
        .then(data => {
            console.log(data)
            if (data.code === 200) {
                setVariants(data.object);
                setLoading(false)
            }
        })
    }, [])

    function selectOrigin(originWarehouseId) {
        console.log(originWarehouseId)
        console.log(warehouses.filter(warehouse => warehouse.warehouseId != originWarehouseId))
        setWarehousesD(warehouses.filter(warehouse => warehouse.warehouseId != originWarehouseId))
        getVariants(originWarehouseId)
    } 

    function setMaxStock(variantId) {
        setSelectedStock(variants.find(variant => variant.ProductVariant.productVariantId == variantId))
    }

    React.useEffect(() => {
        console.log(selectedStock)
        console.log(selectedStock.productQuantity)
        setMaxQuantity(selectedStock.productQuantity)
    }, [selectedStock])

    React.useEffect(() => {
        reset({ 
            "userId": JSON.parse(localStorage.getItem('user')).userId
        });
        getWarehouse();
        window['externalDropdownTrigger']();
    }, [getWarehouse])

    return (
        <div className="ui stackable centered grid">
            <div className="fourteen wide column">
                <form className={loading ? "ui loading form segment" : "ui form segment"} onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="ui dividing header">Registrar Stock</h4>
                    <input name="userId" ref={register()} hidden></input>
                    <div className="fields">
                        <div className="four wide required field" onChange={(e) => selectOrigin(e.target.value)}>
                            <label>Almacén de Origen</label>
                            <select className="ui fluid dropdown"
                                name="originWarehouseId"
                                ref={
                                    register({
                                        required: {value: true, message: 'El almacén de origen es Obligatorio'}
                                    })
                                }>
                                    <option value="">Almacén de Origen</option>
                                {
                                    warehouses.map(warehouse => {
                                        if (warehouse.warehouseTypeId === 1)
                                            return <option key={warehouse.warehouseId} value={warehouse.warehouseId}>{warehouse.warehouseName}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="four wide required field">
                            <label>Almacén de Destino</label>
                            <select className="ui fluid dropdown"
                                name="destinationWarehouseId"
                                ref={
                                    register({
                                        required: {value: true, message: 'El almacén de destino es Obligatorio'}
                                    })
                                }>
                                    <option value="">Almacén de Destino</option>
                                {
                                    warehousesD.map(warehouse => {
                                        if (warehouse.warehouseTypeId === 1)
                                            return <option key={warehouse.warehouseId} value={warehouse.warehouseId}>{warehouse.warehouseName}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="eight wide required field">
                            <label>Variante</label>
                            <select className="ui fluid dropdown" onChange={(e) => setMaxStock(e.target.value)}
                                name="productVariantId"
                                ref={
                                    register({
                                        required: {value: true, message: 'La variante de producto es Obligatoria'}
                                    })
                                }>
                                    <option value="">Variante</option>
                                {
                                    variants.map(variant => {
                                        return (
                                            <option key={variant.ProductVariant.productVariantId} value={variant.ProductVariant.productVariantId}>{variant.ProductVariant.Product?.productName} T/{variant.ProductVariant.Size.sizeName} {variant.ProductVariant.Color.colorName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="four wide required field">
                            <label>Cantidad a Trasladar</label>
                            <input 
                                type="number"
                                min="1"
                                step="1"
                                placeholder="Cantidad"
                                name="productQuantity"
                                ref={
                                    register({
                                        required: {value: true, message: 'La cantidad a trasladar es obligatoria'},
                                        max: {value: maxQuantity, message: 'La cantidad máxima a trasladar es de ' + maxQuantity + ' unidades'}
                                    })
                                }>
                            </input>
                        </div>
                    </div>
                    <button className="ui button" type="submit" style={{backgroundColor: '#18b3c0', color: 'white'}}>Submit</button>
                </form>
                {formState !== null &&
                    <div className={"ui " + formState + " message"}>
                        <i className="close icon" onClick={() => setFormState(null)}></i>
                        <div className="header">{message.header}</div>
                        <p>{message.content}</p>
                    </div>
                }
                {Object.entries(errors).length !== 0 &&
                    <div className={"ui warning icon message"}>
                        <i className="inbox icon"></i>
                        <div className="content">
                            <div className="header">{Object.entries(errors).length === 1 ? 'Advertencia' : 'Múltiples Advertencias'}</div>
                            <ul className="list">
                                {errors.productVariantId &&
                                    <li>{errors.productVariantId.message}</li>
                                }
                                {errors.productQuantity &&
                                    <li>{errors.productQuantity.message}</li>
                                }
                                {errors.productPrice &&
                                    <li>{errors.productPrice.message}</li>
                                }
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}