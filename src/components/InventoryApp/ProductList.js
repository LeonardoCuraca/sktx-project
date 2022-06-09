import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import ProductService from '../../Services/product-service';

export default function ProductList() {

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});

    const [messageState, setMessageState] = useState(null);
    const [message, setMessage] = useState({});
    
    const getProducts = React.useCallback(async () => {
        ProductService.getAll()
        .then(data => {
            if (data.code === 200) {
                setProducts(data.list);
            }
        })
    }, [])

    React.useEffect(() => {
        getProducts()
    }, [getProducts])

    function openDeleteModal(product) {
        setSelectedProduct(product);
        window['showModal']();
    }

    function deleteProduct(productId) {
        ProductService.deleteProduct(productId)
        .then(data => {
            console.log(data);
            if (data.code === 0) {
                setMessageState('error');
                setMessage({'header': 'Proceso Fallido', 'content': 'Ocurrió un error al inhabilitar el producto.'});
            } else {
                setMessageState('success');
                setMessage({'header': 'Eliminación Lógica Completada', 'content': 'Se inhabilitó correctamente el producto.'});
                getProducts();
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
                {/* <button className="ui basic button right floated">
                    <i className="clipboard list icon" />
                    Generar Reporte
                </button> */}
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
                        products.map(product => {
                            if (product.enabled)
                                return (
                                    <ProductCard key={product.productId} product={product} openDeleteModal={openDeleteModal} />
                                )
                        })
                    }
                </div>
            </div>
            <div className="ui basic modal">
                <div className="ui icon header">
                    <i className="trash icon"></i>
                    Eliminar Producto {selectedProduct.productName}
                </div>
                <div className="content">
                    <p>¿Está seguro(a) de eliminar el producto?</p>
                </div>
                <div className="actions">
                    <div className="ui red basic cancel inverted button">
                        <i className="remove icon"></i>
                        No
                    </div>
                    <div className="ui green ok inverted button" onClick={() => deleteProduct(selectedProduct.productId)}>
                        <i className="checkmark icon"></i>
                        Sí
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProductCard({product, openDeleteModal}) {

    let { path } = useRouteMatch();

    React.useEffect(() => {
        window['externalDropdownTrigger']();
    }, [])

    return (
        <div className="card">
            <div className="content">
                <div className="header" style={{display: 'flex', justifyContent: 'space-between'}}>
                    {product.productName}
                    <div className="ui pointing dropdown top right">
                        <i className='right floated dropdown icon'/>
                        <div className="menu" style={{margin: '0.5rem -0.5rem'}}>
                            <Link className="item" to={`${path}/${product.productId}/variant`}>
                                <i className="eye icon" style={{color: '#18b3c0'}} />
                                Revisar Variantes
                            </Link>
                            <Link className="item" to={`${path}/${product.productId}/edit`}>
                                <i className="pencil icon yellow" />
                                Editar Producto
                            </Link>
                            <div className="item" onClick={() => openDeleteModal(product)}>
                                <i className="trash icon red" />
                                Eliminar Producto
                            </div>
                        </div>
                    </div>
                </div>
                <div className="meta">{product.ProductCategory.productCategoryName}</div>
                <div className="description">
                    {product.productDescription}
                </div>
            </div>
        </div>
    )
}