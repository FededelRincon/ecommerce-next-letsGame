import { useState } from "react";
import { Form, Button} from 'semantic-ui-react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { loginApi, resetPasswordApi } from "../../../api/user";
import useAuth from "../../../hooks/useAuth";


export default function LoginForm(props) {
    const { showRegisterForm, onCloseModal } = props;
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            // console.log(formData);
            setLoading(true);
            const response = await loginApi(formData);
            setLoading(false);
            if (response?.jwt) {
                login(response.jwt);
                onCloseModal();
                toast.success('Ingreso correcto');

            } else {
                toast.error('El email o la contraseña son incorrectos')
            }
        }
    });
    
    const resetPassword = () => {
        formik.setErrors({});
        const validateEmail = Yup.string().email().required();
        
        if (!validateEmail.isValidSync(formik.values.identifier)) {
            formik.setErrors({ identifier: true })
            toast.error('email incorrecto')
        } else {
            // resetPasswordApi(formik.values.identifier);  //404, because we dont have mailing services
            toast.error('servicio deshabilitado, pero gracias por probar ^^')
        }

    }

    return (
        <Form
            className="login-form"
            onSubmit={formik.handleSubmit}
        >
            <Form.Input
                name="identifier"
                type="text"
                placeholder="Email"
                onChange={formik.handleChange}
                error={formik.errors.identifier}
            />
            <Form.Input
                name="password"
                type="password"
                placeholder="Contraseña"
                onChange={formik.handleChange}
                error={formik.errors.password}

            />
            <div className="actions">
                <Button
                    type="button"
                    basic
                    onClick={ showRegisterForm }
                >
                    Registrarse
                </Button>

                <div>
                    <Button
                        className="submit"
                        type="submit"
                        loading={loading}
                    >
                        Entrar
                    </Button>
                
                    <Button
                        type="button"
                        // basic
                        onClick={resetPassword}
                    >
                        ¿Has olvidado tu contraseña?
                    </Button>
                </div>
            </div>

        </Form>
    );
}


function initialValues() {
    return {
        identifier:'',
        password:''
    }    
}

function validationSchema() {
    return {
        identifier: Yup.string().email(true).required(true),
        password: Yup.string().required(true)
    }
}