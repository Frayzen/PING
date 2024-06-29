import React, { useState, useEffect } from 'react';
import SaveIndicator from './SaveIndicator.jsx';

import { Editor, useMonaco } from '@monaco-editor/react';


function setEditorTheme(monaco) {
    //retrieving value of css variables
    const backgroundColor = getComputedStyle(document.body).getPropertyValue('--bs-dark');
    console.log(backgroundColor);
    monaco.editor.defineTheme('onedark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: '', fontFamily: 'inherit' },
            { token: 'constant', foreground: '#e06c75' }
        ],
        colors: {
            'editor.background': backgroundColor
        }
    });
}

const TextEditor = ({ content }) => {
    // const [saved, setSaved] = useState(true);

    // useEffect(() => {
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
    // }, []);

    return (
        <Editor height="100%" defaultLanguage="python" defaultValue={content} theme="onedark" beforeMount={setEditorTheme} options={{
            fontFamily: 'inherit',
        }} />
    );
};

export default TextEditor;
