import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { string } from 'yup/lib/locale';
import { updateEmailApi } from '../../../api/user';



export default function ChangeEmailForm(props) {
    const { user, logout, setReloadUser} = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            // console.log(formData) //este formData tiene email y email2
            setLoading(true);

            const response = await updateEmailApi(user.id, formData.email, logout);
            if ( !response || response?.statusCode === 400 ) {  //statusCode === 400 to avoid repeat mail
                toast.error('Error al actualizar el email');
            } else {
                setReloadUser(true);
                toast.info('Email actualizado');
                formik.handleReset();
            }
            setLoading(false);
        }
    })
    
    return (
        <>
            <div className="change-email-form">
                <h4>Cambia tu e-mail <span>(Tu e-mail actual: {user.email})</span> </h4>
                <Form
                    onSubmit={formik.handleSubmit}
                >
                    <Form.Group widths="equal">
                        <Form.Input 
                            name="email"
                            placeholder="Tu nuevo e-mail ..."
                            autoComplete="off"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={formik.errors.email}
                            />
                        <Form.Input 
                            name="email2"
                            placeholder="Confirma tu nuevo e-mail ..."
                            autoComplete="off"
                            onChange={formik.handleChange}
                            value={formik.values.email2}
                            error={formik.errors.email2}
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        className="submit"
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
        email: '',
        email2: ''
    }
}

function validationSchema() {
    return {
        email: Yup.string()
            .email(true)
            .required(true)
            .oneOf([Yup.ref("email2")], true),
        email2: Yup.string().
            email(true).
            required(true).
            oneOf([Yup.ref("email")], true),
    }
}