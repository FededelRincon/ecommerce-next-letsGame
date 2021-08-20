import { useEffect, useMemo, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';

import { ToastContainer } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import { getToken, setToken } from '../api/token';

import '../scss/global.scss';

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  
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

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout: () => null,
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
          hideProgressBar
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