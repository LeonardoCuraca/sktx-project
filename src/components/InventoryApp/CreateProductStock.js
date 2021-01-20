import React, { useState } from 'react';
import ProductService from '../../Services/product-service';
import { useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function CreateProductStock() {

    let { warehouse_id } = useParams();

    const [formState, setFormState] = useState(null);
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(true);

    const {register, handleSubmit, errors, reset} = useForm({});

    const onSubmit = (data) => {
        setLoading(true);
        ProductService.createProductStock(data)
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

    const [variants, setVariants] = useState([]);

    const getVariants = React.useCallback(async () => {
      ProductService.getAllVariants()
      .then(data => {
        if (data.code === 200) {
            setVariants(data.list);
            console.log(data.list);
            setLoading(false)
            reset({ 
                "warehouseId": warehouse_id
            });
        }
      })
    }, [warehouse_id])

    React.useEffect(() => {
        getVariants();
        window['externalDropdownTrigger']();
    }, [getVariants])

    return (
        <div className="ui stackable centered grid">
            <div className="fourteen wide column">
                <form className={loading ? "ui loading form segment" : "ui form segment"} onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="ui dividing header">Registrar Stock</h4>
                    <input name="warehouseId" ref={register()} hidden></input>
                    <div className="fields">
                        <div className="eight wide required field">
                            <label>Variante</label>
                            <select className="ui fluid dropdown"
                                name="productVariantId"
                                ref={
                                    register({
                                        required: {value: true, message: 'La Talla es Obligatoria'}
                                    })
                                }>
                                    <option value="">Variante</option>
                                {
                                    variants.map(variant => {
                                        return (
                                            <option key={variant.productVariantId} value={variant.productVariantId}>{variant.Product.productName} T/{variant.Size.sizeName} {variant.Color.colorName}</option>
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
                                step="1"
                                placeholder="Cantidad"
                                name="productQuantity"
                                ref={
                                    register({
                                        required: {value: true, message: 'La cantidad inicial es obligatoria'}
                                    })
                                }>
                            </input>
                        </div>
                        <div className="four wide required field">
                            <label>Precio</label>
                            <input 
                                type="number"
                                min="1"
                                step="any"
                                placeholder="Precio"
                                name="productPrice"
                                ref={
                                    register({
                                        required: {value: true, message: 'El Precio es obligatorio'}
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
