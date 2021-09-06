import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import useCart from '../../../hooks/useCart';
import { useRouter } from 'next/router'


export default function Payment(props) {
    const { productsData, totalPrice } = props;
    const [loading, setLoading] = useState(false);
    const { removeAllProductsCart } = useCart();
    const router = useRouter();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (formData) => {
            // console.log(productsData)
            setLoading(true);
            setTimeout(() => {

                setLoading(false);
                
                Swal.fire({
                    title: `Confirmacion de compra`,
                    text: `El monto total de la operacion es de: ${(totalPrice).toFixed(2)} €`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, comprar!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        setLoading(true);

                        setTimeout(() => {
                            Swal.fire(
                                'Compra realizada con exito!',
                                `Muchas gracias por su compra !!!`,
                                'success'
                            )
                            setLoading(false);
                            formik.resetForm();
                            removeAllProductsCart();
                            router.push('/');
                        }, 4000);
                    }
                  })
            }, 1500);
        }
    });

    return (
        <>
            <div className="payment">
                <div className="title">Pago</div>
                <div className="data">
                    <p>Formulario de Pago: </p>

                    <Form 
                        onSubmit={ formik.handleSubmit } 
                    >
                        <Form.Group widths={2}>
                            <Form.Input 
                                type="text"
                                placeholder='Numero de tarjeta'
                                name="cardNumber"
                                onChange={formik.handleChange}
                                error={formik.errors.cardNumber}
                            />
                            
                            <Form.Input 
                                type="text"
                                placeholder='MM/AA'
                                name="monthYear"
                                onChange={formik.handleChange}
                                error={formik.errors.monthYear}
                            />
                            
                            <Form.Input 
                                type="text"
                                placeholder='CVC'
                                name="cvc"
                                onChange={formik.handleChange}
                                error={formik.errors.cvc} 
                            />
                        </Form.Group>
                        
                        <Button 
                            type='submit' 
                            className="submit" 
                            loading={loading} 
                        >
                            Pagar
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}


function initialValues() {
    return {
        cardNumber:'',
        monthYear:'',
        cvc: ''
    }    
}

function validationSchema() {
    return {
        cardNumber: Yup.string().min(16, true).max(16, true).required(true),
        monthYear: Yup.string().min(5, true).max(5, true).required(true),
        cvc: Yup.string().min(3, true).max(3, true).required(true)
    }
}