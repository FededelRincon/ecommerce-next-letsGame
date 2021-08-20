import { useState } from 'react';
import { Container, Menu, Grid, Icon, Label } from 'semantic-ui-react';
import Link from 'next/link';
import BasicModal from '../../Modal/BasicModal';
import Auth from '../../Auth';

export default function MenuWeb() {

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('Iniciar Session');

    const onShowModal = () => setShowModal(true);
    const onCloseModal = () => setShowModal(false);

    return (
        <div className="menu">
            <Container>
                <Grid>
                    <Grid.Column className="menu__left" width={6}>
                        <MenuPlatforms />
                    </Grid.Column>

                    <Grid.Column className="menu__right" width={10}>
                        <MenuOptions onShowModal={onShowModal} />
                    </Grid.Column>

                </Grid>
            </Container>
            <BasicModal 
                show={showModal} 
                setShow={setShowModal} 
                title={titleModal}
                size="small"
            >
                <Auth 
                    onCloseModal={onCloseModal}
                    setTitleModal={setTitleModal}
                />
            </BasicModal>
        </div>
    )
}

function MenuPlatforms() {
    return(
        <Menu>
            <Link href="/play-station">
                    <a><Menu.Item> PlayStation </Menu.Item></a>
            </Link>

            <Link href="/xbox">
                    <a><Menu.Item> XBox </Menu.Item></a>
            </Link>

            <Link href="/switch">
                    <a><Menu.Item> Switch </Menu.Item></a>
            </Link>
        </Menu>
    )
}

function MenuOptions(props){
    const { onShowModal } = props;
    
    return(
        <Menu>
            <Menu.Item onClick={ onShowModal }>
                <Icon name="user outline" />
                Mi cuenta
            </Menu.Item>
        </Menu>
    )
}