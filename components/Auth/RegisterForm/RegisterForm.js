import { useState } from "react"
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { registerApi } from "../../../api/user";


export default function RegisterForm(props) {
    const { showLoginForm } = props

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await registerApi(formData);
            if (response?.jwt) {
                toast.success('Registrado correctamente');
                showLoginForm();
            } else {
                // console.log('error al registrar el usuario, intentelo mas tarde');
                toast.error('Error al registrar el usuario, intentelo mas tarde')
            }
            setLoading(false);
        }
    });

    return (

        <Form 
            className="login-form"
            onSubmit={formik.handleSubmit}
            // autoComplete="false"
        >
            <Form.Input
                name="username"
                type="text"
                placeholder="Nombre de usuario..."
                // autoComplete="nope"
                autoComplete="ÑÖcompletes"
                onChange={formik.handleChange}
                error={formik.errors.username}
            />
            <Form.Input
                name="name"
                type="text"
                placeholder="Nombre..."
                // autoComplete="nope"
                autoComplete="ÑÖcompletes"
                onChange={formik.handleChange}
                error={formik.errors.name}
                />
            <Form.Input
                name="lastname"
                type="text"
                placeholder="Apellido..."
                // autoComplete="nope"
                autoComplete="ÑÖcompletes"
                onChange={formik.handleChange}
                error={formik.errors.lastname}
                />
            <Form.Input
                name="email"
                type="text" //validate con formik y yup
                placeholder="Correo electronico..."
                // autoComplete="nope"
                autoComplete="ÑÖcompletes"
                onChange={formik.handleChange}
                error={formik.errors.email}
                />
            <Form.Input
                name="password"
                type="password"
                placeholder="Contraseña..."
                // autoComplete="nope"
                autoComplete="ÑÖcompletes"
                onChange={formik.handleChange}
                error={formik.errors.password}
            />

            <div className="actions">
                <Button
                    type="button"
                    basic
                    onClick={showLoginForm}
                >
                    Iniciar sesion
                </Button>
                <Button
                    type="submit"
                    className="submit"
                    loading={loading}
                >
                    Registrar
                </Button>
            </div>
        </Form>
    )
}


function initialValues() {
    return {
        username:'',
        name:'',
        lastname:'',
        email:'',
        password:''
    }
}

function validationSchema() {
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(true),
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        password: Yup.string().min(6, true).max(50, true).required(true)
    }
}