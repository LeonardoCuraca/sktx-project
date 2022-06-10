import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import WarehouseService from '../../Services/warehouse-service';
import { useParams } from 'react-router-dom';

export default function EditWarehouse() {

    let { warehouse_id } = useParams();

  const [formState, setFormState] = useState(null);
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, errors, reset } = useForm({});

  const onSubmit = (data) => {
    setLoading(true);
    WarehouseService.updateWarehouse(data)
    .then(data => {
        if (data.code === 1) {
            setMessage({'header': 'Registro Completado', 'content': 'Se ha actualizado el almacén con éxito.'})
            setFormState('success');
        } else {
            if (data.msg) {
                setMessage({'header': 'Proceso Fallido', 'content': data.msg});
            } else {
                setMessage({'header': 'Registro Fallido', 'content': 'Se produjo un error al actualizar el almacén.'});
            }
            setFormState('error');
        }
        setLoading(false);
    })
  }

  const [warehouseTypes, setWarehouseTypes] = useState([]);

  const getWarehouseTypes = React.useCallback(async () => {
    WarehouseService.getAllTypes()
    .then(data => {
        if (data.code === 200) {
          setWarehouseTypes(data.list);
        }
    })
  }, [])

  const [warehouse, setWarehouse] = useState({});

  const getWarehouse = React.useCallback(async () => {
    WarehouseService.getWarehouseById(warehouse_id)
    .then(data => {
        if (data.code === 200) {
            setWarehouse(data.object)
            reset(data.object);
        }
        setLoading(false);
    })
}, [warehouse_id, reset])

React.useEffect(() => {
    getWarehouse();
    getWarehouseTypes();
    window['externalDropdownTrigger']();
}, [getWarehouse, getWarehouseTypes])

  return (
    <div className="ui stackable centered grid">
      <div className="fourteen wide column">
        <form className={loading ? "ui loading form segment" : "ui form segment"} onSubmit={handleSubmit(onSubmit)}>
          <h4 className="ui dividing header">Editar Almacén</h4>
          <input name="warehouseId" ref={register()} hidden></input>
          <div className="fields">
            <div className="ten wide field">
              <label>Nombre</label>
              <input 
                type="text"
                placeholder="Nombre de Almacén"
                name="warehouseName"
                ref={
                    register({
                        required: {value: true, message: 'El Nombre del Almacén es Obligatorio'}
                    })
                }>
              </input>
            </div>
            <div className="six wide field">
              <label>Tipo de Almacén</label>
              <select className="ui disabled dropdown">
                {
                    warehouseTypes.map(warehouseType => {
                        return warehouse.warehouseTypeId === warehouseType.warehouseTypeId ?
                            <option selected key={warehouseType.warehouseTypeId} value={warehouseType.warehouseTypeId}>{warehouseType.warehouseTypeName}</option>
                            :
                            <option key={warehouseType.warehouseTypeId} value={warehouseType.warehouseTypeId}>{warehouseType.warehouseTypeName}</option>
                    })
                }
              </select>
            </div>
          </div>
          <div className="fields">
            <div className="twelve wide field">
              <label>Teléfono</label>
              <input type="tel"
                placeholder="Número de contacto"
                maxLength={9}
                name="warehouseTelephone"
                ref={
                  register({
                      required: {value: true, message: 'El número de teléfono del almacén es obligatorio'}
                  })
              }>
              </input>
            </div>
            <div className="four disabled wide field">
                <label>Color</label>
                <div className="color-picker">
                    <div className="ui segment" style={{height: '37.8px', padding: 0, display: 'flex'}}>
                    <div style={{backgroundColor: warehouse.warehouseColorCard, height: '60%', width: '94%', margin: 'auto', borderRadius: '.28571429rem', border: '1px solid rgba(34,36,38,.15)'}}></div>
                    </div>
                </div>
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
                <ul class="list">
                  {errors.warehouseName &&
                    <li>{errors.warehouseName.message}</li>
                  }
                  {errors.warehouseTelephone &&
                    <li>{errors.warehouseTelephone.message}</li>
                  }
                </ul>
              </div>
            </div>
          }
      </div>
  </div>
  )
}
