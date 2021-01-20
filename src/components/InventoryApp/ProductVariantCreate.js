import React, { useState } from 'react';
import ProductService from '../../Services/product-service';
import { useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function ProductVariantCreate() {

    let { product_id } = useParams();

    const [formState, setFormState] = useState(null);
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(true);

    const {register, handleSubmit, errors, reset} = useForm({});

    const onSubmit = (data) => {
        setLoading(true);
        ProductService.createVariant(data)
        .then(data => {
            if (data.code === 200) {
                setMessage({'header': 'Registro Completado', 'content': 'Se ha creado la variante de producto con éxito.'})
                setFormState('success');
            } else {
                if (data.msg) {
                    setMessage({'header': 'Proceso Fallido', 'content': data.msg});
                } else {
                    setMessage({'header': 'Registro Fallido', 'content': 'Se produjo un error al crear la variante de producto.'});
                }
                setFormState('error');
            }
            setLoading(false);
        })
    }

    const [sizes, setSizes] = useState([]);
    
    const getSizes = React.useCallback(async () => {
        ProductService.getAllSizes()
        .then(data => {
            if (data.code === 200) {
                setSizes(data.list);
            }
        })
    }, [])

    const [colors, setColors] = useState([]);
    
    const getColors = React.useCallback(async () => {
        ProductService.getAllColor()
        .then(data => {
            if (data.code === 200) {
                setColors(data.list);
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
                reset({ 
                    "productId": data.object.productId
                });
            }
            setLoading(false);
            getSizes();
            getColors();
        })
    }, [getSizes, getColors, product_id, reset])

    React.useEffect(() => {
        getProduct();
        window['externalDropdownTrigger']();
    }, [getProduct])

    return (
        <div className="ui stackable centered grid">
            <div className="fourteen wide column">
                <form className={loading ? "ui loading form segment" : "ui form segment"} onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="ui dividing header">Crear Variante de {product.productName}</h4>
                    <input name="productId" ref={register()} hidden></input>
                    <div className="fields">
                        <div className="eight wide required field">
                            <label>Talla</label>
                            <select className="ui fluid dropdown"
                                name="sizeId"
                                ref={
                                    register({
                                        required: {value: true, message: 'La Talla es Obligatoria'}
                                    })
                                }>
                                    <option value="">Talla</option>
                                {
                                    sizes.map(size => {
                                        return (
                                            <option key={size.sizeId} value={size.sizeId}>T / {size.sizeName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="eight wide required field">
                            <label>Color</label>
                            <select className="ui dropdown"
                                name="colorId"
                                ref={
                                    register({
                                        required: {value: true, message: 'El Color es Obligatorio'}
                                    })
                                }>
                                    <option value="">Color</option>
                                {
                                    colors.map(color => {
                                        return (
                                            <option key={color.colorId} value={color.colorId}>{color.colorName}</option>
                                        )
                                    })
                                }
                            </select>
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
                                {errors.sizeId &&
                                    <li>{errors.sizeId.message}</li>
                                }
                                {errors.colorId &&
                                    <li>{errors.colorId.message}</li>
                                }
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
