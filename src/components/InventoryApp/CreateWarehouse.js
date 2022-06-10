import React, { useEffect, useState } from 'react';
import { GithubPicker } from 'react-color';
import { useForm } from 'react-hook-form';

import WarehouseService from '../../Services/warehouse-service';
import AddressService from '../../Services/AddressService';

export default function CreateWarehouse() {

  const [formState, setFormState] = useState(null);
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, errors, setValue } = useForm({});

  const onSubmit = (data) => {
    setLoading(true);
    WarehouseService.createWarehouse(data)
    .then(data => {
        if (data.code === 200) {
            setMessage({'header': 'Registro Completado', 'content': 'Se ha creado el almacén con éxito.'})
            setFormState('success');
        } else {
            if (data.msg) {
                setMessage({'header': 'Proceso Fallido', 'content': data.msg});
            } else {
                setMessage({'header': 'Registro Fallido', 'content': 'Se produjo un error al crear el almacén.'});
            }
            setFormState('error');
        }
        setLoading(false);
    })
  }
  
  function setColor(color) {
    setValue('warehouseColorCard', color);
  }

  const [warehouseTypes, setWarehouseTypes] = useState([]);

  const getWarehouseTypes = React.useCallback(async () => {
    WarehouseService.getAllTypes()
    .then(data => {
        if (data.code === 200) {
          setWarehouseTypes(data.list);
        }
        getDepartments();
    })
  }, [])

  const [departments, setDepartments] = useState([]);

  const getDepartments = React.useCallback(async () => {
    AddressService.getAllDepartments()
    .then(data => {
        if (data.code === 200) {
          setDepartments(data.list);
        }
        getVias();
    })
  }, [])

  const [districts, setDistricts] = useState([]);

  const getDistricts = React.useCallback(async (departmentId) => {
    setLoading(true)
    AddressService.getDistrictsByDepartment(departmentId)
    .then(data => {
        if (data.code === 200) {
          setDistricts(data.list);
        }
        setLoading(false)
    })
  }, [])

  const [vias, setVias] = useState([]);

  const getVias = React.useCallback(async () => {
    AddressService.getAllVias()
    .then(data => {
        if (data.code === 200) {
          setVias(data.list);
        }
        setLoading(false);
    })
  }, [])

  React.useEffect(() => {
    getWarehouseTypes();
    register({ name: "warehouseColorCard" })
    setValue('warehouseColorCard', '#18b3c0');
    window['externalDropdownTrigger']()
  }, [getWarehouseTypes])

  return (
    <div className="ui stackable centered grid">
      <div className="fourteen wide column">
        <form className={loading ? "ui loading form segment" : "ui form segment"} onSubmit={handleSubmit(onSubmit)}>
          <h4 className="ui dividing header">Crear Almacén</h4>
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
              <select className="ui dropdown"
                name="warehouseTypeId"
                ref={
                    register({
                        required: {value: true, message: 'El tipo de Almacén es obligatorio'}
                    })
                }>
                <option value="">Categoría de Producto</option>
                {
                    warehouseTypes.map(warehouseType => {
                        return (
                            <option key={warehouseType.warehouseTypeId} value={warehouseType.warehouseTypeId}>{warehouseType.warehouseTypeName}</option>
                        )
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
                name="warehouseTelephone"
                maxLength={9}
                ref={
                  register({
                      required: {value: true, message: 'El número de teléfono del almacén es obligatorio'}
                  })
              }>
              </input>
            </div>
            <div className="four wide field">
              <label>Color</label>
              <ColorPicker setColor={setColor}/>
            </div>
          </div>
          <h4 className="ui dividing header">Definir Dirección</h4>
          <div className="fields">
            <div className="eight wide field">
              <label>Departamento</label>
              <select className="ui search dropdown" onChange={(e) => getDistricts(e.target.value)}
                name="address.departmentId"
                ref={
                    register({
                        required: {value: true, message: 'El Departamento es obligatorio'}
                    })
                }>
                <option value="">Departamentos</option>
                {
                    departments.map(department => {
                        return (
                            <option key={department.departmentId} value={department.departmentId}>{department.departmentName}</option>
                        )
                    })
                }
              </select>
            </div>
            <div className="eight wide field">
              <label>Distrito</label>
              <select className="ui search dropdown"
                name="address.districtId"
                ref={
                    register({
                        required: {value: true, message: 'El Distrito es obligatorio'}
                    })
                }>
                <option value="">Distritos</option>
                {
                    districts.map(district => {
                      return (
                        <option key={district.districtId} value={district.districtId}>{district.districtName} | {district.Department.departmentName}</option>
                      )
                    })
                }
              </select>
            </div>
          </div>
          <div className="fields">
            <div className="four wide field">
              <label>Vía</label>
              <select className="ui dropdown"
                name="address.viaId"
                ref={
                    register({
                        required: {value: true, message: 'La Vía es obligatoria'}
                    })
                }>
                <option value="">Vías</option>
                {
                    vias.map(via => {
                        return (
                            <option key={via.viaId} value={via.viaId}>{via.viaName}</option>
                        )
                    })
                }
              </select>
            </div>
            <div className="four wide field">
              <label>Nombre de vía</label>
              <input 
                type="text"
                placeholder="Nombre de la vía"
                name="address.addressViaName"
                ref={
                    register({
                        required: {value: true, message: 'El Nombre de la Vía es Obligatorio'}
                    })
                }>
              </input>
            </div>
            <div className="four wide field">
              <label>Número de dirección</label>
              <input 
                type="number"
                min="1"
                placeholder="Número de dirección"
                name="address.addressNumber"
                ref={
                    register({
                        required: {value: true, message: 'El Número de la dirección es Obligatorio'}
                    })
                }>
              </input>
            </div>
            <div className="four wide field">
              <label>Referencia</label>
              <input 
                type="text"
                placeholder="Referencia de dirección"
                name="address.addressReference"
                ref={
                    register({
                        required: {value: true, message: 'La referencia es obligatoria'}
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
                <ul class="list">
                  {errors.warehouseName &&
                    <li>{errors.warehouseName.message}</li>
                  }
                  {errors.warehouseTypeId &&
                    <li>{errors.warehouseTypeId.message}</li>
                  }
                  {errors.warehouseTelephone &&
                    <li>{errors.warehouseTelephone.message}</li>
                  }
                  {errors.address?.departmentId &&
                    <li>{errors.address.departmentId.message}</li>
                  }
                  {errors.address?.districtId &&
                    <li>{errors.address.districtId.message}</li>
                  }
                  {errors.address?.viaId &&
                    <li>{errors.address.viaId.message}</li>
                  }
                  {errors.address?.addressViaName &&
                    <li>{errors.address.addressViaName.message}</li>
                  }
                  {errors.address?.addressNumber &&
                    <li>{errors.address.addressNumber.message}</li>
                  }
                  {errors.address?.addressReference &&
                    <li>{errors.address.addressReference.message}</li>
                  }
                </ul>
              </div>
            </div>
          }
      </div>
  </div>
  )
}

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      colorValue: "#18b3c0"
    };
  }

  handlePickClick = () => {
    const { displayColorPicker } = this.state;
    this.setState({
      displayColorPicker: !displayColorPicker
    });
  };

  handleColorChange = color => {
    this.props.setColor(color.hex);
    this.setState({
      colorValue: color.hex
    });
  };

  render() {
    const { displayColorPicker, colorValue } = this.state;

    return (
      <div className="color-picker">
        <div onClick={this.handlePickClick} class="ui segment" style={{height: '37.8px', padding: 0, display: 'flex', cursor: 'pointer'}}>
          <div style={{backgroundColor: this.state.colorValue, height: '60%', width: '94%', margin: 'auto', borderRadius: '.28571429rem', border: '1px solid rgba(34,36,38,.15)'}}></div>
        </div>
        {displayColorPicker && (
          <div>
            <GithubPicker
              color={colorValue}
              onChange={this.handleColorChange}
              colors={['#18B3C0', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
            />
          </div>
        )}
      </div>
    );
  }
}
