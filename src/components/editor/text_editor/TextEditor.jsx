import React, { useState, useEffect, useContext } from 'react';
import SaveIndicator from './SaveIndicator.jsx';

import { Editor, useMonaco } from '@monaco-editor/react';
import { FileManagerContext } from '../../../managers/fileManager.js';

const languages = {
    'py': 'python',
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typeScript',
    'tsx': 'typeScript',
    'html': 'html',
    'md': 'markdown',
    'css': 'css',
    'cpp': 'c',
    'c': 'c',
    'h': 'c',
    'hpp': 'c',
    'h++': 'c',
    'cc': 'c',
    'java': 'java',
}

const TextEditor = ({ file }) => {
    const fileManager = useContext(FileManagerContext);
    const name = file.path.split('.').pop();
    const lang = languages[name] || "Plain Text";
    return (
        <Editor
            onChange={content => {
                file.content = content;
                // append to edited
                fileManager.setEdited([fileManager.edited, file.uid].flat());
            }}
            height="100% !important" language={lang} value={file.content} theme="onedark"
            beforeMount={(monaco) => {
                const backgroundColor = getComputedStyle(document.body).getPropertyValue('--bs-dark');
                console.log(monaco.editor)
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
                //diable minimap
            }}
            options={{
                fontFamily: 'Fira Code',
            }} />
    );
};

export default TextEditor;
