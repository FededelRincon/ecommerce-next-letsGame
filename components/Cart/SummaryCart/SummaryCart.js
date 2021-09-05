import React, { useEffect, useState } from 'react';
import { Table, Image, Icon } from 'semantic-ui-react';
import { forEach, map } from 'lodash';
import useCart from '../../../hooks/useCart';
import { BASE_PATH } from '../../../utils/constants';


export default function SummaryCart(props) {
    const { productsData, setReloadCart, reloadCart } = props; //product es esto
    const [totalPrice, setTotalPrice] = useState(0);
    const { removeProductCart } = useCart();

    useEffect(() => {
        let price = 0;
        forEach(productsData, (product) => {
            price += product.price
        })
        setTotalPrice(price);
    }, [reloadCart, productsData ]);

    const removeProduct = (product) => {
        removeProductCart(product);
        setReloadCart(true);
    }

    return (
        <>
            <div className="summary-cart">
                <div className="title"> Resumen del Carrito</div>
                <div className="data">
                    <Table celled structured >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell> Producto </Table.HeaderCell>
                                <Table.HeaderCell> Plataforma </Table.HeaderCell>
                                <Table.HeaderCell> Entrega </Table.HeaderCell>
                                <Table.HeaderCell> Precio </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {map(productsData, (product => (
                                <Table.Row key={product.id} className="summary-cart__product">
                                    <Table.Cell>
                                        <Icon
                                            name="close"
                                            link
                                            onClick={() => removeProduct(product.url)}
                                        />
                                        <Image 
                                            src={`${BASE_PATH}${product.poster.url}`} 
                                            alt={product.title} 
                                        />
                                        { product.title }
                                    </Table.Cell>
                                    <Table.Cell>
                                        {product.platform.title}
                                    </Table.Cell>
                                    <Table.Cell>
                                        Inmediata
                                    </Table.Cell>
                                    <Table.Cell>
                                        {product.price} €
                                    </Table.Cell>
                                </Table.Row>
                            )))}

                            <Table.Row className="summary-cart__resume">
                                <Table.Cell className="clear" />
                                <Table.Cell colSpan="2">Total:</Table.Cell>
                                <Table.Cell className="total-price">{ (totalPrice.toFixed(2)) } €</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    )
}
