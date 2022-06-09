import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import AddressService from '../../Services/AddressService';
import AuthService from '../../Services/AuthService';
import CustomerService from '../../Services/CustomerService';
import RolesService from '../../Services/RolesService';

export default function UserCreate() {

  const [formState, setFormState] = useState(null);
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(true);

  const { watch, register, handleSubmit, errors } = useForm({});

  const onSubmit = (data) => {
    setLoading(true);
    AuthService.signUp(data)
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
        getRoles();
    })
  }, [])

  const [roles, setRoles] = useState([]);

  const getRoles = React.useCallback(async () => {
    RolesService.getAll()
    .then(data => {
        if (data.code === 200) {
          setRoles(data.list);
        }
        setLoading(false);
    })
  }, [])

  React.useEffect(() => {
    getDepartments();
    window['externalDropdownTrigger']()
  }, [getDepartments])

  return (
    <div className="ui stackable centered grid">
      <div className="fourteen wide column">
        <form className={loading ? "ui loading form segment" : "ui form segment"} onSubmit={handleSubmit(onSubmit)}>
          <h4 className="ui dividing header">Registrar Usuario</h4>
          <div className="fields">
            <div className="four wide field">
              <label>Nombres</label>
              <input 
                type="text"
                placeholder="Nombres del Usuario"
                name="userNames"
                ref={
                    register({
                        required: {value: true, message: 'El Nombre del Usuario es Obligatorio'}
                    })
                }>
              </input>
            </div>
            <div className="four wide field">
              <label>Apellidos</label>
              <input 
                type="text"
                placeholder="Apellidos del Usuario"
                name="userSurnames"
                ref={
                    register({
                        required: {value: true, message: 'Los Apellido del Usuario son Obligatorios'}
                    })
                }>
              </input>
            </div>
            <div className="four wide field">
              <label>Correo</label>
              <input 
                type="email"
                placeholder="Correo del Usuario"
                name="userEmail"
                ref={
                    register({
                        required: {value: true, message: 'El correo del Usuario es Obligatorio'}
                    })
                }>
              </input>
            </div>
            <div className="four wide field">
              <label>Contraseña</label>
              <input 
                type="password"
                placeholder="Contraseña"
                name="password"
                ref={
                    register({
                        required: {value: true, message: 'Los Apellido del Usuario son Obligatorios'}
                    })
                }>
              </input>
            </div>
          </div>
          <div className="fields">
            <div className="four wide field">
                <label>Teléfono</label>
                <input type="tel"
                    placeholder="Número de contacto"
                    name="userTelephone"
                    ref={register()}
                >
              </input>
            </div>
            <div className="eight wide field">
              <label>Roles</label>
              <select className="ui search dropdown"
                name="rolesId"
                ref={
                    register({
                        required: {value: true, message: 'El Cargo es obligatorio'}
                    })
                }>
                <option value="">Roles</option>
                {
                    roles.map(role => {
                      return (
                        <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
                      )
                    })
                }
              </select>
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
                <ul className="list">
                  {errors.clientTreatment &&
                    <li>{errors.clientTreatment.message}</li>
                  }
                  {errors.clientNameames &&
                    <li>{errors.clientNameames.message}</li>
                  }
                  {errors.clientSurnames &&
                    <li>{errors.clientSurnames.message}</li>
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

