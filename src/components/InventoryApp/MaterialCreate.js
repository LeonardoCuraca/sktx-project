import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MaterialService from '../../Services/MaterialService';

export default function MaterialCreate() {

    const [formState, setFormState] = useState(null);
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, errors} = useForm({});

    const onSubmit = (data) => {
        console.log(DataTransferItem)
        setLoading(true);
        MaterialService.insert(data)
        .then(data => {
            if (data.code === 200) {
                setMessage({'header': 'Registro Completado', 'content': 'Se ha actualizado el material con éxito.'})
                setFormState('success');
            } else {
                if (data.msg) {
                    setMessage({'header': 'Proceso Fallido', 'content': data.msg});
                } else {
                    setMessage({'header': 'Registro Fallido', 'content': 'Se produjo un error al actualizar el producto.'});
                }
                setFormState('error');
            }
            setLoading(false);
        })
    }

    React.useEffect(() => {
        window['externalDropdownTrigger']();
    }, [])

    return (
        <div className="ui stackable centered grid">
            <div className="fourteen wide column">
                <form className={loading ? "ui loading form segment" : "ui form segment"} onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="ui dividing header">Crear Material</h4>
                    <input name="materialId" ref={register()} hidden></input>
                    <div className="fields">
                        <div className="ten wide required field">
                            <label>Nombre</label>
                            <input 
                                type="text" 
                                placeholder="Nombre de Material" 
                                name="materialName"
                                ref={
                                    register({
                                        required: {value: true, message: 'El Nombre del Material es Obligatorio'}
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
                                {errors.materialName &&
                                    <li>{errors.materialName.message}</li>
                                }
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
