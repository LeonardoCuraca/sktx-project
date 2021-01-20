import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../../Services/product-service';
import moment from 'moment';
import 'moment/locale/es';
import PurchasesService from '../../Services/PurchasesService';

export default function PurchaseDetail() {

    let { purchase_id } = useParams();

    const [purchase, setPurchase] = useState({});

    const getPurchase = React.useCallback(async () => {
        PurchasesService.getById(purchase_id)
        .then(data => {
            if (data.code === 200) {
                console.log(data.object)
                setPurchase(data.object);
            }
        }, [])
    }, [purchase_id])

    React.useEffect(() => {
        getPurchase();
        window['externalDropdownTrigger']()
    }, [getPurchase])
    
    return (
        <div className="ui stackable centered grid">
            <div className="twelve wide column">
                <div className="ui segment">
                    <h1 className="ui center aligned icon header">
                        <i className="dolly icon"></i>
                        Compra N° {purchase.productPurchaseId}
                    </h1>
                    <div className="ui vertical segment">
                        <h2 className="ui header">
                            Detalle de la Compra
                        </h2>
                        <div className="ui list">
                        <div className="item">
                                <div className="header">Proveedor</div>
                                {purchase.Provider?.providerTreatment + ' ' + purchase.Provider?.providerNames + ' ' + purchase.Provider?.providerSurnames}   
                            </div>
                            <div className="item">
                                <div className="header">Encargado</div>
                                {purchase.User?.userNames + ' ' + purchase.User?.userSurnames}   
                            </div>
                            <div className="item">
                                <div className="header">Almacén</div>
                                {purchase.ProductPurchaseDetails != null && purchase.ProductPurchaseDetails[0].ProductStock.Warehouse.warehouseName}   
                            </div>
                            <div className="item">
                                <div className="header">Fecha y Hora de Traslado</div>
                                {moment(purchase.createdAt).format('L, h:mm a')}
                            </div>
                        </div>
                    </div>
                    <div className="ui vertical segment">
                        <table className="ui very basic celled fluid table">
                            <thead>
                                <tr>
                                    <th>Detalle (ID)</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchase.ProductPurchaseDetails?.map(detail => {
                                    return (
                                        <tr key={detail.productPurchaseDetailId}>
                                            <td>{detail.productPurchaseDetailId}</td>
                                            <td>{detail.ProductStock.ProductVariant.Product.productName + ' T / ' + detail.ProductStock.ProductVariant.Size.sizeName + ' ' + detail.ProductStock.ProductVariant.Color.colorName}</td>
                                            <td>{detail.productQuantity}</td>
                                            <td>{detail.detailTotal}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
