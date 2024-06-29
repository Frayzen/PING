import React, { useState, useEffect, useContext } from 'react';
import SaveIndicator from './SaveIndicator.jsx';

import { Editor, useMonaco } from '@monaco-editor/react';
import { FileManagerContext } from '../../../managers/fileManager.js';

const TextEditor = ({ file }) => {
    const fileManager = useContext(FileManagerContext);
    return (
        <Editor
            onChange={content => {
                file.content = content;
                // append to edited
                fileManager.setEdited([fileManager.edited, file.uid].flat());
            }}
            height="100%" defaultLanguage="python" value={file.content} theme="onedark"
            beforeMount={(monaco) => {
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
            }}
            options={{
                fontFamily: 'Fira Code',
            }} />
    );
};

export default TextEditor;
