import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updatePasswordAPI } from '../../../api/user';


export default function ChangePasswordForm(props) {
    const { user, logout } = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updatePasswordAPI(user.id, formData.password, logout);
            if (!response || response?.statusCode === 400 ) {
                toast.error('Error al actualizar la contraseña')
            } else {
                logout();
            }
            setLoading(false);
        }
    })

    return (
        <>
            <div className="change-password-form">
                <h4>Cambiar tu contraseña</h4>
                <Form
                    onSubmit={formik.handleSubmit}
                >
                    <Form.Group widths="equal">
                        <Form.Input 
                            name="password" 
                            type="password" 
                            placeholder="Tu nueva contraseña ..."
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={formik.errors.password} 
                            />
                        <Form.Input 
                            name="password2" 
                            type="password" 
                            placeholder="Confirma tu contraseña ..." 
                            onChange={formik.handleChange}
                            value={formik.values.password2}
                            error={formik.errors.password2} 
                        />
                    </Form.Group>
                    <Button
                        className="submit"
                        type="submit"
                        loading={loading}
                    >
                        Actualizar
                    </Button>
                </Form>
            </div>  
        </>
    )
}

function initialValues() {
    return {
        password: '',
        password2: ''
    }
}

function validationSchema() {
    return {
        password: Yup.string()
            .required(true)
            .min(6, true)
            .max(50, true)
            .oneOf([Yup.ref("password2")], true),
        password2: Yup.string()
            .required(true)
            .min(6, true)
            .max(50, true)
            .oneOf([Yup.ref("password")], true)
    }
}