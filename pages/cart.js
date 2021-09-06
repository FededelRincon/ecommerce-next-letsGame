import React, { useEffect, useState } from 'react'
import BasicLayout from '../layouts/BasicLayout/BasicLayout'
import { getGameByUrlApi } from '../api/game';
import useCart from '../hooks/useCart';
import SummaryCart from '../components/Cart/SummaryCart/SummaryCart';
import AddressShipping from '../components/Cart/AddressShipping/AddressShipping';
import Payment from '../components/Cart/Payment/Payment';


export default function cart() {
    const [totalPrice, setTotalPrice] = useState(0);
    const { getProductsCart } = useCart();
    const products = getProductsCart();

    return !products ? <EmptyCart /> : <FullCart products={products} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />

}

function EmptyCart() {
    return (
        <BasicLayout className="empty-cart">
            <h2>No hay productos en el carrito</h2>
        </BasicLayout>
    )
}

function FullCart(props) {
    const {products, totalPrice, setTotalPrice } = props;
    const [productsData, setProductsData] = useState(null);
    const [reloadCart, setReloadCart] = useState(false);
    const [address, setAddress] = useState(null);


    useEffect(() => {
        (async () => {
            const productsTemp = [];
            for await (const product of products) {
                const data = await getGameByUrlApi(product);
                productsTemp.push(data);
            }
            setProductsData(productsTemp);
        })();
        setReloadCart(false);
    }, [reloadCart])

    return (
        <BasicLayout className="empty-cart">
            <SummaryCart productsData={productsData} reloadCart={reloadCart} setReloadCart={setReloadCart} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
            <AddressShipping setAddress={setAddress} />
            {address && <Payment productsData={productsData} totalPrice={totalPrice} />}
        </BasicLayout>
    )
}