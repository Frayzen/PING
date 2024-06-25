import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MessagePopup = ({ show, handleClose, message, disableClose = false }) => {
    return (
        <Modal show={show} onHide={disableClose ? null : handleClose} backdrop={disableClose ? "static" : true}>
            <Modal.Header closeButton={!disableClose}>
                <Modal.Title>Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            {!disableClose && (
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default MessagePopup;

