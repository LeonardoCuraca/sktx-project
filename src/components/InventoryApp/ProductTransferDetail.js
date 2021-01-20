import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../../Services/product-service';
import moment from 'moment';
import 'moment/locale/es';

export default function ProductTransferDetail() {

    let { productTransfer_id } = useParams();

    const [productTransfer, setProductTransfer] = useState({});

    ProductService.getProductTransfersById(productTransfer_id)
    .then(data => {
        if (data.code === 200) {
            setProductTransfer(data.object);
        }
    })
    
    return (
        <div className="ui stackable centered grid">
            <div className="twelve wide column">
                <div className="ui segment">
                    <h1 className="ui center aligned icon header">
                        <i className="dolly icon"></i>
                        Traslado N° {productTransfer.productTransferId}
                    </h1>
                    <div className="ui vertical segment">
                        <h2 className="ui header">
                            Datos del Trasladado
                        </h2>
                        <div className="ui list">
                            <div className="item">
                                <div className="header">Encargado</div>
                                {productTransfer.User?.userNames + ' ' + productTransfer.User?.userSurnames}   
                            </div>
                            <div className="item">
                                <div className="header">Fecha y Hora de Traslado</div>
                                {moment(productTransfer.createdAt).format('L, h:mm a')}
                            </div>
                        </div>
                    </div>
                    <div className="ui vertical segment">
                        <div className="ui equal width stackable grid">
                            <div className="column">
                                <h2 className="ui header">
                                    Producto Trasladado
                                </h2>
                                <div className="ui list">
                                    <div className="item">
                                        <div className="header">Nombre Completo</div>
                                        {productTransfer.ProductStock?.ProductVariant.Product.productName} Talla {productTransfer.ProductStock?.ProductVariant.Size.sizeName} Color {productTransfer.ProductStock?.ProductVariant.Color.colorName}
                                    </div>
                                    <div className="item">
                                        <div className="header">Códigos</div>
                                        <div className="ui list">
                                            <div className="item">
                                                <div className="header">Stock</div>
                                                {productTransfer.productStockId}        
                                            </div>
                                            <div className="item">
                                                <div className="header">Variante</div>
                                                {productTransfer.ProductStock?.ProductVariant.productVariantId}
                                            </div>
                                            <div className="item">
                                                <div className="header">Producto</div>
                                                {productTransfer.ProductStock?.ProductVariant.productId}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="header">Cantidad Trasladada</div>
                                        {productTransfer.productQuantity} unidades
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <h2 className="ui header">
                                    Almacén de Origen
                                </h2>
                                <div className="ui list">
                                    <div className="item">
                                        <div className="header">Nombre Completo</div>
                                        {productTransfer.originWarehouse?.warehouseName}
                                    </div>
                                    <div className="item">
                                        <div className="header">Tipo</div>
                                        {productTransfer.originWarehouse?.warehouseTypeId === 1 ? 'Productos' : 'Materiales'}
                                    </div>
                                    <div className="item">
                                        <div className="header">Teléfono</div>
                                        {productTransfer.originWarehouse?.warehouseTelephone}
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <h2 className="ui header">
                                    Almacén de Destino
                                </h2>
                                <div className="ui list">
                                    <div className="item">
                                        <div className="header">Nombre Completo</div>
                                        {productTransfer.destinationWarehouse?.warehouseName}
                                    </div>
                                    <div className="item">
                                        <div className="header">Tipo</div>
                                        {productTransfer.destinationWarehouse?.warehouseTypeId === 1 ? 'Productos' : 'Materiales'}
                                    </div>
                                    <div className="item">
                                        <div className="header">Teléfono</div>
                                        {productTransfer.destinationWarehouse?.warehouseTelephone}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
