import React, { useState } from 'react';
import ProductService from '../../Services/product-service';
import { useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function ProductEdit() {

    let { product_id } = useParams();

    const [formState, setFormState] = useState(null);
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(true);

    const {register, handleSubmit, errors, reset} = useForm({});

    const onSubmit = (data) => {
        setLoading(true);
        ProductService.updateProduct(data)
        .then(data => {
            if (data.code === 1) {
                setMessage({'header': 'Registro Completado', 'content': 'Se ha actualizado el producto con éxito.'})
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

    const [categories, setCategories] = useState([]);
    
    const getCategories = React.useCallback(async () => {
        ProductService.getAllCategories()
        .then(data => {
            if (data.code === 200) {
                setCategories(data.list);
            }
        })
    }, [])

    const [product, setProduct] = useState({});

    const getProduct = React.useCallback(async () => {
        ProductService.getProductById(product_id)
        .then(data => {
            if (data.code === 200) {
                console.log(data)
                setProduct(data.object);
                reset(data.object);
            }
            setLoading(false);
            getCategories();
        })
    }, [getCategories, product_id, reset])

    React.useEffect(() => {
        getProduct();
        window['externalDropdownTrigger']();
    }, [getProduct])

    return (
        <div className="ui stackable centered grid">
            <div className="fourteen wide column">
                <form className={loading ? "ui loading form segment" : "ui form segment"} onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="ui dividing header">Editar Producto {product_id}</h4>
                    <input name="productId" ref={register()} hidden></input>
                    <div className="fields">
                        <div className="ten wide required field">
                            <label>Nombre</label>
                            <input 
                                type="text" 
                                placeholder="Nombre de Producto" 
                                name="productName"
                                ref={
                                    register({
                                        required: {value: true, message: 'El Nombre de Producto es Obligatorio'}
                                    })
                                }>
                            </input>
                        </div>
                        <div className="six wide required field">
                            <label>Categoría</label>
                            <select className="ui disabled dropdown"
                                name="productCategoryId"
                                ref={
                                    register({
                                        required: {value: true, message: 'La Categoría del Producto es Obligatoria'}
                                    })
                                }>
                                {
                                    categories.map(category => {
                                        return product.productCategoryId === category.productCategoryId ?
                                            <option selected key={category.productCategoryId} value={category.productCategoryId}>{category.productCategoryName}</option>
                                            :
                                            <option key={category.productCategoryId} value={category.productCategoryId}>{category.productCategoryName}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label>Descripción</label>
                        <input type="text" placeholder="Descripción" name="productDescription" ref={register}></input>
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
                                {errors.productName &&
                                    <li>{errors.productName.message}</li>
                                }
                                {errors.productCategoryId &&
                                    <li>{errors.productCategoryId.message}</li>
                                }
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
