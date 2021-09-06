import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

import { Icon } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import { useRouter } from 'next/router';
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm/ChangePasswordForm";
import BasicModal from '../components/Modal/BasicModal'
import AddressForm from "../components/Account/AddressForm";
import ListAddress from "../components/Account/ListAddress/ListAddress";

export default function Account() {
    const [ user, setUser ] = useState(undefined);
    const { auth, logout, setReloadUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response || null)
        })()

    }, [ auth ]);

    if(user === undefined) return null;
    if (!auth && !user) {
        router.replace('/');
        return null;
    }

    return (
        <>
            <BasicLayout className="account" >
                <Configuration user={user} logout={logout} setReloadUser={setReloadUser} />    
                <Addresses />
            </BasicLayout>
        </>
    )
}

function Configuration(props) {
    const { user, logout, setReloadUser } = props;

    return (
        <div className="account__configuration">
            <div className="title"> Configuracion </div>
            <div className="data"> 
                <ChangeNameForm 
                    user={user} 
                    logout={logout} 
                    setReloadUser={setReloadUser} 
                    />

                <ChangeEmailForm  
                    user={user} 
                    logout={logout} 
                    setReloadUser={setReloadUser} 
                    />

                <ChangePasswordForm 
                    user={user} 
                    logout={logout} 
                />
            </div>
        </div>
    )
}

function Addresses () {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [formModal, setFormModal] = useState(null);
    const [realoadAddresses, setRealoadAddresses] = useState(false);


    const openModal = (title, address) => {
        setTitleModal(title);
        setFormModal(
            <AddressForm 
                setShowModal={setShowModal} 
                setRealoadAddresses={setRealoadAddresses} 
                newAddress={ address ? false : true }
                address={ address || null }
            />)
        setShowModal(true);
    }

    return (
        <div className="account__addresses">
            <div className="title">
                Direcciones
                <Icon 
                    name="plus" 
                    link 
                    size="large"
                    onClick={() => openModal('Nueva direccion123')}
                />
            </div>

            <div className="data">
                <ListAddress 
                    setRealoadAddresses={setRealoadAddresses} 
                    realoadAddresses={realoadAddresses} 
                    openModal={openModal}    
                />
            </div>

            <BasicModal 
                show={showModal}
                setShow={setShowModal}
                title={titleModal}
            >
                {formModal}
            </BasicModal>
        </div>
    )
}