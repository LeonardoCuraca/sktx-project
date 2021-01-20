import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import CustomerService from '../../Services/CustomerService';
import MaterialService from '../../Services/MaterialService';
import ProductService from '../../Services/product-service';
import ProviderService from '../../Services/ProviderService';
import PurchasesService from '../../Services/PurchasesService';
import SalesService from '../../Services/SalesService';
import WarehouseService from '../../Services/warehouse-service';

export default function MaterialPurchaseCreate() {
    return (
        <Test />
    )
}

function Test() {

    const [formState, setFormState] = useState(null);
    const [message, setMessage] = useState({});

    const [loading, setLoading] = useState(true);
    const [materials, setMaterials] = useState([]);

    const getMaterials = React.useCallback(async (warehouseId) =>{
        console.log(warehouseId)
        MaterialService.getMaterialStockByWarehouse(warehouseId)
        .then(data => {
            console.log(data)
            if (data.code === 200) {
                setMaterials(data.object);
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
      name: "materials",
    });
    
    const doSubmit = (data) => {
        let returnData = data;
        delete returnData['materialQuantity'];
        delete returnData['materialId'];
        delete returnData['warehouse-id'];
        delete returnData['detailTotal'];
        console.log(returnData)
        if (!returnData.materials) {
            setMessage({'header': 'Advertencia', 'content': 'La compra no contiene materiales en su detalle.'})
            setFormState('warning');
            return
        }
        returnData.materials.map((e, i) => {
            returnData.materials[i].detailTotal = parseFloat(e.detailTotal)
            returnData.materials[i].materialQuantity = parseFloat(e.materialQuantity)
        })
        console.log(returnData)
        PurchasesService.insertMaterialPurchase(returnData)
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
        } else if (!getValues("materialId")) {
            setMessage({'header': 'Advertencia', 'content': 'La Variante de producto es obligatoria.'})
            setFormState('warning');
            return
        } else if (!getValues("materialQuantity")) {
            setMessage({'header': 'Advertencia', 'content': 'La Cantidad del Producto es Obligatoria.'})
            setFormState('warning');
            return
        } else if (!getValues("detailTotal")) {
            setMessage({'header': 'Advertencia', 'content': 'El precio total por detalle es obligatorio.'})
            setFormState('warning');
            return
        } else {
            const m = materials.find(material => material.materialStockId == getValues("materialId"));
            append({ unitId: m.Unit.unitId, materialQuantity : getValues("materialQuantity"), materialId : getValues("materialId"), warehouseId : getValues("warehouse-id"), detailTotal: getValues("detailTotal") })
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
                                required: {value: true, message: 'El provider es obligatorio'}
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
                <h4 className="ui dividing header">Agregar Productos a la Venta</h4>
                <div className="fields">
                    <div className="four wide required field">
                        <label>Almacén</label>
                        <select className="ui fluid dropdown" onChange={(e) => getMaterials(e.target.value)}
                            name="warehouse-id"
                            ref={register()}
                            >
                                <option value="">Almacén</option>
                            {
                                warehouses.map(warehouse => {
                                    if (warehouse.warehouseTypeId === 2)
                                        return <option key={warehouse.warehouseId} value={warehouse.warehouseId} onClick={() => console.log(warehouse.warehouseId)}>{warehouse.warehouseName}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="six wide required field">
                        <label>Material</label>
                        <select className="ui fluid dropdown"
                            name="materialId"
                            ref={register()}
                            >
                                <option value="">Materiales</option>
                            {
                                materials.map(material => {
                                    if (material.productPrice !== null)
                                        return <option key={material.materialStockId} value={material.materialStockId}>{material.Material.materialName}</option>
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
                            name="materialQuantity"
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
                <button className="ui green button" type="submit">Realizar Venta</button>
                <h4 className="ui dividing header">Detalle de Venta</h4>
                <table class="ui very basic celled fluid table">
                    <thead>
                        <tr>
                            <th>Almacén</th>
                            <th>Material</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {fields.map((field, index) => {
                        const material = materials.find(material => material.materialStockId == field.materialId);
                        const warehouse = warehouses.find(warehouse => warehouse.warehouseId == field.warehouseId);
                        return (
                            <tr key={field.id}>
                                <td>
                                    {warehouse.warehouseName}
                                    <input name={`materials[${index}].warehouseId`} ref={register()} defaultValue={field.warehouseId} hidden/>
                                </td>
                                <td>
                                    <input name={`materials[${index}].unitId`} ref={register()} defaultValue={material.Unit.unitId} hidden/>
                                    {material.Unit.unitName + ' de ' + material.Material.materialName}
                                    <input name={`materials[${index}].materialId`} ref={register()} defaultValue={material.Material.materialId} hidden />
                                </td>
                                <td>
                                    {field.materialQuantity}
                                    <input name={`materials[${index}].materialQuantity`} ref={register()} defaultValue={field.materialQuantity} hidden/>
                                </td>
                                <td>
                                    {field.detailTotal}
                                    <input name={`materials[${index}].detailTotal`} ref={register()} defaultValue={field.detailTotal} hidden/>
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