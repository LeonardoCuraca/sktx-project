import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import MaterialService from '../../Services/MaterialService';
import ProductService from '../../Services/product-service';

export default function MaterialList() {

    const [materials, setMaterials] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState({});

    const [messageState, setMessageState] = useState(null);
    const [message, setMessage] = useState({});
    
    const getMaterials = React.useCallback(async () => {
        MaterialService.getAll()
        .then(data => {
            if (data.code === 200) {
                setMaterials(data.list);
            }
        })
    }, [])

    React.useEffect(() => {
        getMaterials()
    }, [getMaterials])

    function openDeleteModal(material) {
        setSelectedMaterial(material);
        window['showModal']();
    }

    function deleteMaterial(materialId) {
        MaterialService.delete(materialId)
        .then(data => {
            console.log(data);
            if (data.code === 0) {
                setMessageState('error');
                setMessage({'header': 'Proceso Fallido', 'content': 'Ocurrió un error al inhabilitar el material.'});
            } else {
                setMessageState('success');
                setMessage({'header': 'Eliminación Lógica Completada', 'content': 'Se inhabilitó correctamente el material.'});
                getMaterials();
            }
        })
    }

    let { url } = useRouteMatch();
    return (
        <div className="ui grid segment">
            <div className="sixteen wide column">
                <Link className="ui basic button" to={`${url}/create`}>
                    <i className="add icon" />
                    Añadir Producto
                </Link>
            </div>
            {messageState !== null &&
                <div className="sixteen wide column">
                    <div className={"ui " + messageState + " message"}>
                        <i className="close icon" onClick={() => setMessageState(null)}></i>
                        <div className="header">{message.header}</div>
                        <p>{message.content}</p>
                    </div>
                </div>
            }
            <div className="sixteen wide column">
                <div className="ui four stackable cards">
                    {
                        materials.map(material => {
                            if (material.enabled)
                                return (
                                    <MaterialCard key={material.materialId} material={material} openDeleteModal={openDeleteModal} />
                                )
                        })
                    }
                </div>
            </div>
            <div className="ui basic modal">
                <div className="ui icon header">
                    <i className="trash icon"></i>
                    Eliminar Material {selectedMaterial.materialName}
                </div>
                <div className="content">
                    <p>¿Está seguro(a) de eliminar el material?</p>
                </div>
                <div className="actions">
                    <div className="ui red basic cancel inverted button">
                        <i className="remove icon"></i>
                        No
                    </div>
                    <div className="ui green ok inverted button" onClick={() => deleteMaterial(selectedMaterial.materialId)}>
                        <i className="checkmark icon"></i>
                        Sí
                    </div>
                </div>
            </div>
        </div>
    )
}

function MaterialCard({material, openDeleteModal}) {

    let { path } = useRouteMatch();

    React.useEffect(() => {
        window['externalDropdownTrigger']();
    }, [])

    return (
        <div className="card">
            <div className="content">
                <div className="header" style={{display: 'flex', justifyContent: 'space-between'}}>
                    {material.materialName}
                    <div className="ui pointing dropdown top right">
                        <i className='right floated dropdown icon'/>
                        <div className="menu" style={{margin: '0.5rem -0.5rem'}}>
                            <Link className="item" to={`${path}/${material.materialId}/edit`}>
                                <i className="pencil icon yellow" />
                                Editar Material
                            </Link>
                            <div className="item" onClick={() => openDeleteModal(material)}>
                                <i className="trash icon red" />
                                Eliminar Material
                            </div>
                        </div>
                    </div>
                </div>
                <div className="meta">{material.materialName}</div>
            </div>
        </div>
    )
}