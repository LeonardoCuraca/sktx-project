import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import CustomerService from '../../Services/CustomerService';
import ProductService from '../../Services/product-service';
import ProviderService from '../../Services/ProviderService';
import PurchasesService from '../../Services/PurchasesService';
import SalesService from '../../Services/SalesService';
import WarehouseService from '../../Services/warehouse-service';

export default function PurchaseCreate() {
    return (
        <Test />
    )
}

function Test() {

    const [formState, setFormState] = useState(null);
    const [message, setMessage] = useState({});

    const [loading, setLoading] = useState(true);
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

    const [providers, setProviders] = useState([]);

    const getProviders = React.useCallback(async () =>{
        ProviderService.getAll()
        .then(data => {
            if (data.code === 200) {
                setProviders(data.list);
                setLoading(false)
            }
        })
    }, [])

    const [warehouses, setWarehouses] = useState([]);

    const getWarehouses = React.useCallback(async () =>{
        WarehouseService.getAll()
        .then(data => {
            if (data.code === 200) {
                setWarehouses(data.list);
                setLoading(false)
            }
        })
    }, [])

    React.useEffect(() => {
        reset({ 
            "userId": JSON.parse(localStorage.getItem('user')).userId
        });
        getWarehouses();
        getProviders();
        window['externalDropdownTrigger']();
    }, [getWarehouses, getProviders])

    const { control, errors, register, handleSubmit, getValues, reset } = useForm();
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
      control,
      name: "products",
    });
    
    const doSubmit = (data) => {
        let returnData = data;
        delete returnData['productQuantity'];
        delete returnData['productVariantId'];
        delete returnData['warehouse-id'];
        console.log(returnData)
        if (!returnData.products) {
            setMessage({'header': 'Advertencia', 'content': 'La compra no contiene productos en su detalle.'})
            setFormState('warning');
            return
        }
        returnData.products.map((e, i) => {
            returnData.products[i].detailTotal = parseFloat(e.detailTotal)
            returnData.products[i].productQuantity = parseFloat(e.productQuantity)
        })
        console.log(returnData)
        setLoading(true);
        PurchasesService.insertPurchase(returnData)
        .then(data => {
            if (data.code === 200) {
                setMessage({'header': 'Registro Completado', 'content': 'Se ha registrado la compra con éxito.'})
                setFormState('success');
            } else {
                if (data.msg) {
                    setMessage({'header': 'Proceso Fallido', 'content': data.msg});
                } else {
                    setMessage({'header': 'Registro Fallido', 'content': 'Se produjo un error al registrar la compra.'});
                }
                setFormState('error');
            }
            setLoading(false);
        })
    }

    function addList() {
        if (!getValues("warehouse-id")) {
            setMessage({'header': 'Advertencia', 'content': 'El almacén es obligatorio.'})
            setFormState('warning');
            return
        } else if (!getValues("productVariantId")) {
            setMessage({'header': 'Advertencia', 'content': 'La Variante de producto es obligatoria.'})
            setFormState('warning');
            return
        } else if (!getValues("productQuantity")) {
            setMessage({'header': 'Advertencia', 'content': 'La Cantidad del Producto es Obligatoria.'})
            setFormState('warning');
            return
        } else if (!getValues("detailTotal")) {
            setMessage({'header': 'Advertencia', 'content': 'El precio total por detalle es obligatorio.'})
            setFormState('warning');
            return
        } else {
            console.log('hooooooooooo')
            append({ productQuantity : getValues("productQuantity"), productVariantId : getValues("productVariantId"), warehouseId : getValues("warehouse-id"), detailTotal: getValues("detailTotal") })
        }
    }

    return (
      <div className="ui stackable centered grid">
          <div className="fifteen wide column">
            <form className={loading ? "ui loading form segment" : "ui form segment"} onSubmit={handleSubmit(doSubmit)}>
                <h4 className="ui dividing header">Información de Compra</h4>
                <input name="userId" ref={register()} hidden></input>
                <div className="eight wide required field">
                    <label>Proveedor</label>
                    <select className="ui fluid dropdown"
                        name="providerId"
                        ref={
                            register({
                                required: {value: true, message: 'El proveedor es obligatorio'}
                            })
                        }>
                            <option value="">Proveedores</option>
                        {
                            providers.map(provider => {
                                return (
                                    <option key={provider.providerId} value={provider.providerId}>{provider.providerTreatment + ' ' + provider.providerNames + ' ' + provider.providerSurnames}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <h4 className="ui dividing header">Agregar Productos a la Compra</h4>
                <div className="fields">
                    <div className="four wide required field">
                        <label>Almacén</label>
                        <select className="ui fluid dropdown" onChange={(e) => getVariants(e.target.value)}
                            name="warehouse-id"
                            ref={register()}
                            >
                                <option value="">Almacén</option>
                            {
                                warehouses.map(warehouse => {
                                    if (warehouse.warehouseTypeId === 1)
                                        return <option key={warehouse.warehouseId} value={warehouse.warehouseId} onClick={() => console.log(warehouse.warehouseId)}>{warehouse.warehouseName}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="six wide required field">
                        <label>Variante</label>
                        <select className="ui fluid dropdown"
                            name="productVariantId"
                            ref={register()}
                            >
                                <option value="">Variante</option>
                            {
                                variants?.map(variant => {
                                    if (variant.productPrice !== null)
                                        return <option key={variant.ProductVariant.productVariantId} value={variant.ProductVariant.productVariantId}>{variant.ProductVariant.Product?.productName} T/{variant.ProductVariant.Size.sizeName} {variant.ProductVariant.Color.colorName}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="three wide required field">
                        <label>Cantidad</label>
                        <input 
                            type="number"
                            min="1"
                            step="1"
                            placeholder="Cantidad"
                            name="productQuantity"
                            ref={register()}>
                        </input>
                    </div>
                    <div className="three wide required field">
                        <label>Total</label>
                        <input 
                            type="number"
                            min="1"
                            step="any"
                            placeholder="Total"
                            name="detailTotal"
                            ref={register()}>
                        </input>
                    </div>
                </div>
                <div className="ui teal button" onClick={() => addList()}>Agregar</div>
                <button className="ui green button" type="submit">Realizar Compra</button>
                <h4 className="ui dividing header">Detalle de Compra</h4>
                <table className="ui very basic celled fluid table">
                    <thead>
                        <tr>
                            <th>Almacén</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {fields.map((field, index) => {
                        const variant = variants.find(variant => variant.ProductVariant.productVariantId == field.productVariantId);
                        const warehouse = warehouses.find(warehouse => warehouse.warehouseId == field.warehouseId);
                        return (
                            <tr key={field.id}>
                                <td>
                                    {warehouse.warehouseName}
                                    <input name={`products[${index}].warehouseId`} ref={register()} defaultValue={field.warehouseId} hidden/>
                                </td>
                                <td>
                                    {variant.ProductVariant.Product?.productName} T/{variant.ProductVariant.Size.sizeName} {variant.ProductVariant.Color.colorName}
                                    <input name={`products[${index}].productVariantId`} ref={register()} defaultValue={field.productVariantId} hidden />
                                </td>
                                <td>
                                    {field.productQuantity}
                                    <input name={`products[${index}].productQuantity`} ref={register()} defaultValue={field.productQuantity} hidden/>
                                </td>
                                <td>
                                    {field.detailTotal}
                                    <input name={`products[${index}].detailTotal`} ref={register()} defaultValue={field.detailTotal} hidden/>
                                </td>
                                <td class="center aligned negative" style={{cursor: "pointer"}} onClick={() => remove(index)}>
                                    <i className="trash icon red"></i>
                                    Quitar
                                </td>
                            </tr>                    
                        )
                    })}
                    </tbody>
                </table>
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
                    {errors.providerId &&
                        <li>{errors.providerId.message}</li>
                    }
                    </ul>
                </div>
                </div>
            }
          </div>
      </div>
    );
  }