import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MaterialService from '../../Services/MaterialService';
import ProductService from '../../Services/product-service';
import WarehouseService from '../../Services/warehouse-service';

export default function MaterialAdjustmentCreate() {
    const [formState, setFormState] = useState(null);
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(true);

    const {register, handleSubmit, errors, reset} = useForm({});

    const onSubmit = (data) => {
        setLoading(true);
        MaterialService.insertAdjustment(data)
        .then(data => {
            if (data.code === 200) {
                setMessage({'header': 'Registro Completado', 'content': 'Se ha registrado el ajuste de inventario con éxito.'})
                setFormState('success');
            } else {
                if (data.msg) {
                    setMessage({'header': 'Proceso Fallido', 'content': data.msg});
                } else {
                    setMessage({'header': 'Registro Fallido', 'content': 'Se produjo un error al registrar el ajuste de inventario.'});
                }
                setFormState('error');
            }
            setLoading(false);
        })
    }

    const [warehouses, setWarehouses] = useState([]);

    const getWarehouse = React.useCallback(async () =>{
        WarehouseService.getAll()
        .then(data => {
            if (data.code === 200) {
                setWarehouses(data.list);
                setLoading(false)
            }
        })
    }, [])

    const [materials, setMaterials] = useState([]);

    const getMaterials = React.useCallback(async () =>{
        MaterialService.getAll()
        .then(data => {
            if (data.code === 200) {
                setMaterials(data.list);
                setLoading(false)
            }
        })
    }, [])

    const [adjustmentReasons, setAdjustmentReasons] = useState([]);

    const getAdjustmentReason = React.useCallback(async () =>{
        ProductService.getAdjustmentReason()
        .then(data => {
            if (data.code === 200) {
                setAdjustmentReasons(data.list);
                setLoading(false)
            }
        })
    }, [])

    React.useEffect(() => {
        reset({ 
            "userId": JSON.parse(localStorage.getItem('user')).userId
        });
        getMaterials();
        getWarehouse();
        getAdjustmentReason();
        window['externalDropdownTrigger']();
    }, [getMaterials, getWarehouse])

    return (
        <div className="ui stackable centered grid">
            <div className="fourteen wide column">
                <form className={loading ? "ui loading form segment" : "ui form segment"} onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="ui dividing header">Registrar Stock</h4>
                    <input name="userId" ref={register()} hidden></input>
                    <div className="fields">
                        <div className="four wide required field">
                            <label>Almacén</label>
                            <select className="ui fluid dropdown"
                                name="warehouseId"
                                ref={
                                    register({
                                        required: {value: true, message: 'El almacén es Obligatorio'}
                                    })
                                }>
                                    <option value="">Almacén</option>
                                {
                                    warehouses.map(warehouse => {
                                        if (warehouse.warehouseTypeId === 2)
                                            return <option key={warehouse.warehouseId} value={warehouse.warehouseId}>{warehouse.warehouseName}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="four wide required field">
                            <label>Motivo de Ajuste</label>
                            <select className="ui fluid dropdown"
                                name="adjustmentReasonId"
                                ref={
                                    register({
                                        required: {value: true, message: 'El motivo del ajuste es Obligatorio'}
                                    })
                                }>
                                    <option value="">Motivo de Ajuste</option>
                                {
                                    adjustmentReasons.map(adjustmentReason => {
                                        return <option key={adjustmentReason.adjustmentReasonId} value={adjustmentReason.adjustmentReasonId}>{adjustmentReason.adjustmentReasonName}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="eight wide required field">
                            <label>Material</label>
                            <select className="ui fluid dropdown"
                                name="materialId"
                                ref={
                                    register({
                                        required: {value: true, message: 'El material es obligatorio'}
                                    })
                                }>
                                    <option value="">Material</option>
                                {
                                    materials.map(material => {
                                        return (
                                            <option key={material.materialId} value={material.materialId}>{material.materialName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="four wide required field">
                            <label>Cantidad a Ajustar</label>
                            <input 
                                type="number"
                                min="1"
                                step="1"
                                placeholder="Cantidad"
                                name="materialQuantity"
                                ref={
                                    register({
                                        required: {value: true, message: 'La cantidad a trasladar es obligatoria'}
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