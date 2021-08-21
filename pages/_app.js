import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';


import { toast, ToastContainer } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import { getToken, removeToken, setToken } from '../api/token';

import '../scss/global.scss';


export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
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
      toast.info('Ud se ha deslogeado correctamente')

    }
  }



  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }), [auth])

  if (auth === undefined) return null;

  return (
    <>
      <AuthContext.Provider
        value={authData}
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
        </AuthContext.Provider>
    </>
  )
}