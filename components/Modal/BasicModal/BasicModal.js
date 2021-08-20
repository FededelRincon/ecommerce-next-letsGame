import { Modal, Icon } from 'semantic-ui-react';

export default function BasicModal(props) {
    // console.log(props)
    const { show, setShow, title, children, ...rest } = props;
    // console.log(setShow)

    const onClose = () => {
        setShow(false);
    }

    return (
        <Modal 
            className="basic-modal" 
            open={show} 
            onClose={onClose} 
            {...rest}
        >
            <Modal.Header>
                <span>{title}</span> <Icon name="close" onClick={onClose} />
            </Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )
}
