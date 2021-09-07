import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';

import { toast, ToastContainer } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import { getToken, removeToken, setToken } from '../api/token';
import { addProductCart, countProductsCart, getProductsCart, removeProductCart, removeAllProductsCart } from '../api/cart';

import '../scss/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id
      })
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser])

  useEffect(() => {
    setTotalProductsCart(countProductsCart());
    setReloadCart(false);
  }, [reloadCart, auth]);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id
    });
  }

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push('/');
      toast.info('Ud se ha deslogeado correctamente');
      cleanCart();
    }
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }), [auth]
  );


  const addProduct = (product) => {
    const token = getToken();
    if(token) {
      addProductCart(product);
      setReloadCart(true);
    } else {
      toast.warning('Para comprar un juego tienes que iniciar session');
    }
  }

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  }

  const cleanCart = () => {
    removeAllProductsCart;
    setTotalProductsCart(0);
  }



  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product) => addProduct(product),
      getProductsCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: cleanCart
    }), [totalProductsCart]
  );


  if (auth === undefined) return null;

  return (
    <>
      <AuthContext.Provider
        value={authData}
      >
        <CartContext.Provider
          value={cartData}
        >
          <Component {...pageProps} />
          <ToastContainer 
            position= 'top-right'
            // position= 'bottom-left'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            />
          </CartContext.Provider>
        </AuthContext.Provider>
    </>
  )
}