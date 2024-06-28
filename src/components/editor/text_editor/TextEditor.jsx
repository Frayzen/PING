import React, { useState, useEffect } from 'react';
import SaveIndicator from './SaveIndicator.jsx';

const TextEditor = () => {
    const [text, setText] = useState('');
    const [saved, setSaved] = useState(true);

    useEffect(() => {
        // const handleSave = () => {
        //     setSaved(true);
        // };

        // const saveListener = () => handleSave();

        // if (window.api && window.api.onSaveText) {
        //     window.api.onSaveText(saveListener);
        // }

        // return () => {
        //     if (window.api && window.api.removeSaveTextListener) {
        //         window.api.removeSaveTextListener(saveListener);
        //     }
        // };
    }, []);

    const handleTextChange = (event) => {
        setText(event.target.value);
        setSaved(false);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>Text Editor</h5>
                <SaveIndicator saved={saved} />
            </div>
            <textarea
                className="form-control"
                rows="20"
                value={text}
                onChange={handleTextChange}
            ></textarea>
        </div>
    );
};

export default TextEditor;
