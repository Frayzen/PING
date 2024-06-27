import React, { useState, useContext } from "react";
import { FileManagerContext } from "./fileManager";

const filterFiles = (file, searchString = '') => {
    const searchLower = searchString.toLowerCase();
    const process = (file) => {
        if (file.name.toLowerCase().includes(searchLower))
            return file;
        if (file.type === 'folder') {
            const children = file.children.map(child => process(child, searchString));
            const ret = Object.assign({}, file);
            ret.children = children.filter(child => child !== null);
            if (ret.children.length > 0)
                return ret;
        }
        return null;
    }
    const res = process(file);
    if (res === null)
        return {};
    return res;
};

const SearchDir = () => {
    const [inputValue, setInputValue] = useState("");
    const fileManager = useContext(FileManagerContext);
    if (fileManager.root == null)
        fileManager.fetchFiles().then((tree) => {
            fileManager.setRoot(tree);
            fileManager.setFileTree(filterFiles(tree, inputValue));
        });
    return (
        <div className="input-group mb-3" style={{ padding: "0.5rem" }}>
            <input
                type="text"
                className="form-control border-secondary bg-dark text-light"
                placeholder="Search..."
                value={inputValue}
                onChange={(event) => {
                    setInputValue(event.target.value);
                    if (root == null)
                        return;
                    const filtered = filterFiles(fileManager.root, event.target.value);
                    fileManager.setFileTree(filtered);
                }}
                style={{
                    outline: "none",
                    boxShadow: "none",
                    fontSize: "0.875rem",
                    padding: "0.5rem",
                    backgroundColor: "#2b2b2b",
                    color: "#c8c8c8",
                    borderRadius: "0.25rem",
                    marginBottom: "0.5rem"
                }}
            />
        </div>
    );

}
export default SearchDir;

