import { BASE_PATH, CART } from "../utils/constants";
import { toast } from 'react-toastify';
import { size, includes, remove } from 'lodash';

export function getProductsCart() {
    const cart = localStorage.getItem(CART);

    if (!cart) {
        return null;
    } else {
        const products = cart.split(',');

        return products;
    }
}


export function addProductCart(product) {
    const cart = getProductsCart();

    if(!cart){
        localStorage.setItem(CART, product);
        toast.info('Producto añadido al carrito');
    } else {
        const productFound = includes(cart, product);
        if(productFound){
            toast.warning('Este producto ya esta en el carrito');
        } else {
            cart.push(product)
            localStorage.setItem(CART, cart);
            toast.info('Producto añadido correctamente');
        }
    }
}

export function countProductsCart() {
    const cart = getProductsCart();

    if (!cart) {
        return 0
    } else {
        return size(cart);
    }
}

export function removeProductCart(product) {
    const cart = getProductsCart();

    remove(cart, (item) => {
        return item === product
    });

    if (size(cart) > 0) {
        localStorage.setItem(CART, cart)
    } else {
        localStorage.removeItem(CART);
    }
}


export function removeAllProductsCart() {
    localStorage.removeItem(CART)
}