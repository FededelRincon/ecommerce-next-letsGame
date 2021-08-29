import React, { useState } from 'react';
import { Form, Button} from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../../hooks/useAuth';
import { createAddressApi, updateAddressApi } from '../../../api/address';
import { toast } from 'react-toastify';


export default function AddressForm(props) {
    const { setShowModal, setRealoadAddresses, newAddress, address } = props;
    const [loading, setLoading] = useState(false);
    const { auth, logout } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(address),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (formData) => {
            newAddress 
                ? createAddress(formData) 
                : updateAddress(formData)
        }
    })


    const createAddress = async (formData) => {
        setLoading(true);

        const formDataTemp = {
            ...formData,
            // user: auth.idUser    //endpoint original
            users_permissions_user: auth.idUser
        };
        const response = await createAddressApi(formDataTemp, auth.idUser, logout);
        // const response = await createAddressApi(formDataTemp, logout);   //endpoint original

        if (!response) {
            toast.warning('Error al crear la direccion')
            setLoading(false)
        } else {
            formik.resetForm();
            setRealoadAddresses(true);
            setLoading(false);
            toast.info('Direccion creada correctamente');
            setShowModal(false);
        }
        
    }

    const updateAddress = (formData) => {
        setLoading(true);

        const formDataTemp = {
            ...formData,
            user: auth.idUser
            // users_permissions_user: auth.idUser
        };
        console.log(address);
        // const response = updateAddressApi(address._id, formDataTemp, logout);
        // const response = updateAddressApi(formDataTemp.user, formDataTemp, logout);
        console.log(address.users_permissions_user._id)
        const response = updateAddressApi(address.users_permissions_user._id, formDataTemp, logout);

        if (response) {
            toast.warning('Sistema desabilitado momentaneamente, disculpe las molestias');
            setLoading(false);
        } else {
            formik.resetForm();
            setRealoadAddresses(true);
            setLoading(false);
            setShowModal(false);
        }
    }

    return (
        <>
            <Form
                // autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <Form.Input
                    name="title"
                    type="text"
                    label="Titulo de la direccion"
                    placeholder="Titulo de la direccion ..."
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    error={formik.errors.title}
                    // autoComplete="none"
                />
                <Form.Group widths="equal" >
                    <Form.Input
                        name="name"
                        type="text"
                        label="Nombre y Apellido"
                        placeholder="Nombre y Apellido ..."
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.errors.name}
                        // autoComplete="asdasdada"
                    />

                    <Form.Input
                        name="address"
                        type="text"
                        label="Direccion"
                        placeholder="Direccion ..."
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        error={formik.errors.address}
                        // autoComplete="none2"
                    />
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Input
                        name="city"
                        type="text"
                        label="Ciudad"
                        placeholder="Ciudad ..."
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        error={formik.errors.city}
                    />

                    <Form.Input
                        name="state"
                        type="text"
                        label="Provincia/Estado/Region"
                        placeholder="Provincia/Estado/Region ..."
                        onChange={formik.handleChange}
                        value={formik.values.state}
                        error={formik.errors.state}
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Input
                        name="postalCode"
                        type="text"
                        label="Codigo Postal"
                        placeholder="Codigo Postal ..."
                        onChange={formik.handleChange}
                        value={formik.values.postalCode}
                        error={formik.errors.postalCode}
                    />

                    <Form.Input
                        name="phone"
                        type="text"
                        label="Numero de Telefono"
                        placeholder="Numero de Telefono ..."
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        error={formik.errors.phone}
                    />
                </Form.Group>
                <div className="actions">
                    <Button
                        className="submit"
                        type="submit"
                        loading={loading}
                    >
                        { newAddress ? `Crear direccion` : `Actualizar direccion` }
                    </Button>
                </div>
            </Form>
        </>
    )
}


function initialValues(address) {
    return {
        title: address?.title || '',
        name: address?.name || '',
        address: address?.address || '',
        city: address?.city || '',
        state: address?.state || '',
        postalCode: address?.postalCode || '',
        phone: address?.phone || '',
    }
}

function validationSchema() {
    return {
        title: Yup.string().required(true),
        name: Yup.string().required(true),
        address: Yup.string().required(true),
        city: Yup.string().required(true),
        state: Yup.string().required(true),
        postalCode: Yup.string().required(true),
        phone: Yup.string().required(true),
    }
}