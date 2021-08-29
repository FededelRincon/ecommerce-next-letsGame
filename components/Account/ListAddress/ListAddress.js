import React, { useEffect, useState } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import { deleteAddressApi, getAddressesApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';
import { map, size } from 'lodash'
import { toast } from 'react-toastify';


export default function ListAddress(props) {
    const { realoadAddresses, setRealoadAddresses, openModal } = props;
    const [addresses, setAddresses] = useState(null);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout);
            setAddresses(response || [])
            setRealoadAddresses(false)
        })()
    }, [realoadAddresses])

    if (!addresses) {
        return null;
    }

    return (
        <>
            <div className="list-address">
                {
                    size(addresses) === 0 ? (
                        <h3>No hay ninguna direccion creada</h3>
                    ) : (
                        <Grid>
                            {map(addresses, (address)=> (
                                <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                                    <Address 
                                        address={address} 
                                        logout={logout} 
                                        setRealoadAddresses={setRealoadAddresses}
                                        openModal={openModal} 
                                    />
                                </Grid.Column>
                            ))}
                        </Grid>
                    )
                }
            </div>
        </>
    )
}

function Address(props) {
    const { address, logout, setRealoadAddresses, openModal } = props;
    const [loadingDelete, setLoadingDelete] = useState(false);

    const deleteAddress = async () => {
        setLoadingDelete(true);
        // toast.info('Eliminando direccion');
        const response = await deleteAddressApi (address._id, logout);
        if (response) {
            setRealoadAddresses(true);
        }
        toast.info('Direccion eliminada correctamente');
        setLoadingDelete(false);
    }

    return (
        <>
            <div className="address">
                <p>{address.title}</p>
                <p>{address.name}</p>
                <p>{address.address}</p>
                <p>
                    {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.phone}</p>
                
                <div className="actions">
                    <Button primary onClick={() => openModal(`Editar : ${address.title}`, address) } >Editar</Button>
                    <Button onClick={deleteAddress} loading={loadingDelete} >Eliminar</Button>
                </div>
            </div>
        </>
    )
}