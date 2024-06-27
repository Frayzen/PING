import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const InputPopup = ({ show, handleClose, handleSave }) => {
    const [input, setInput] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSaveClick = () => {
        handleSave(input);
        setInput('');
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Input</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formInput">
                        <Form.Label>Enter something</Form.Label>
                        <Form.Control
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveClick}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InputPopup;
