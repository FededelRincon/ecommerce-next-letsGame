import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";


export default function Auth(props) {

    const { onCloseModal, setTitleModal } = props;

    const [showLogin, setShowLogin] = useState(true);   //this state its shows loginForm or registerForm

    const showLoginForm = () => {
        setTitleModal('IniciarSesion')
        setShowLogin(true);
    };
    
    const showRegisterForm = () => {
        setTitleModal('Crear nuevo usuario')
        setShowLogin(false)
    };

    return showLogin ? (
        <LoginForm showRegisterForm={showRegisterForm} onCloseModal={onCloseModal} />
    ) : (
        <RegisterForm showLoginForm={showLoginForm} />
    );
}
