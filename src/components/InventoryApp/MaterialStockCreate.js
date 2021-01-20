import React, { useState } from 'react';
import ProductService from '../../Services/product-service';
import { useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import ProviderService from '../../Services/ProviderService';
import MaterialService from '../../Services/MaterialService';
import UnitService from '../../Services/UnitService';

export default function MaterialStockCreate() {

    let { warehouse_id } = useParams();

    const [formState, setFormState] = useState(null);
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(true);

    const {register, handleSubmit, errors, reset} = useForm({});

    const onSubmit = (data) => {
        setLoading(true);
        MaterialService.createMaterialStock(data)
        .then(data => {
            if (data.code === 200) {
                setMessage({'header': 'Registro Completado', 'content': 'Se ha creado el stock el material con éxito.'})
                setFormState('success');
            } else {
                if (data.msg) {
                    setMessage({'header': 'Proceso Fallido', 'content': data.msg});
                } else {
                    setMessage({'header': 'Registro Fallido', 'content': 'Se produjo un error al crear el stock del material.'});
                }
                setFormState('error');
            }
            setLoading(false);
        })
    }

    const [providers, setProviders] = useState([]);

    const getProviders = React.useCallback(async () => {
      ProviderService.getAll()
      .then(data => {
        if (data.code === 200) {
            setProviders(data.list);
            setLoading(false)
            reset({ 
                "warehouseId": warehouse_id
            });
        }
      })
    }, [warehouse_id])

    const [units, setUnits] = useState([]);

    const getUnits = React.useCallback(async () => {
        UnitService.getAll()
        .then(data => {
            if (data.code === 200) {
                setUnits(data.list);
                getProviders();
            }
        })
    }, [])

    const [materials, setMaterials] = useState([]);

    const getMaterials = React.useCallback(async () => {
      MaterialService.getAll()
      .then(data => {
        if (data.code === 200) {
            setMaterials(data.list);
            getUnits();
        }
      })
    }, [])

    React.useEffect(() => {
        getMaterials();
        window['externalDropdownTrigger']();
    }, [getMaterials])

    return (
        <div className="ui stackable centered grid">
            <div className="fourteen wide column">
                <form className={loading ? "ui loading form segment" : "ui form segment"} onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="ui dividing header">Registrar Stock de Material</h4>
                    <input name="warehouseId" ref={register()} hidden></input>
                    <div className="fields">
                        <div className="four wide required field">
                            <label>Proveedor</label>
                            <select className="ui fluid dropdown"
                                name="providerId"
                                ref={
                                    register({
                                        required: {value: true, message: 'El proveedor es Obligatorio'}
                                    })
                                }>
                                    <option value="">Proveedor</option>
                                {
                                    providers.map(provider => {
                                        if (provider.enabled)
                                            return (
                                                <option key={provider.providerId} value={provider.providerId}>{provider.providerTreatment + ' ' + provider.providerNames + ' ' + provider.providerSurnames}</option>
                                            )
                                    })
                                }
                            </select>
                        </div>
                        <div className="four wide required field">
                            <label>Material</label>
                            <select className="ui fluid dropdown"
                                name="materialId"
                                ref={
                                    register({
                                        required: {value: true, message: 'El Material es Obligatorio'}
                                    })
                                }>
                                    <option value="">Material</option>
                                {
                                    materials.map(material => {
                                        if (material.enabled)
                                            return (
                                                <option key={material.materialId} value={material.materialId}>{material.materialName}</option>
                                            )
                                    })
                                }
                            </select>
                        </div>
                        <div className="four wide required field">
                            <label>Unidad</label>
                            <select className="ui fluid dropdown"
                                name="unitId"
                                ref={
                                    register({
                                        required: {value: true, message: 'La Unidad es Obligatoria'}
                                    })
                                }>
                                    <option value="">Unidad</option>
                                {
                                    units.map(unit => {
                                        return (
                                            <option key={unit.unitId} value={unit.unitId}>{unit.unitName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="four wide required field">
                            <label>Cantidad Inicial</label>
                            <input 
                                type="number"
                                min="0"
                                step="any"
                                placeholder="Cantidad"
                                name="materialQuantity"
                                ref={
                                    register({
                                        required: {value: true, message: 'La cantidad inicial es obligatoria'}
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
                                {errors.providerId &&
                                    <li>{errors.providerId.message}</li>
                                }
                                {errors.materialId &&
                                    <li>{errors.materialId.message}</li>
                                }
                                {errors.unitId &&
                                    <li>{errors.unitId.message}</li>
                                }
                                {errors.materialQuantity &&
                                    <li>{errors.materialQuantity.message}</li>
                                }
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
