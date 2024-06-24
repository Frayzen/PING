import React, { useState } from "react";


const SearchDir = () => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
        setInputValue(event.target.value);
        window.electronAPI.fetchTree(event.target.value)
    };

    return (
        <input 
            type="text" 
            placeholder="Enter text here" 
            value={inputValue} 
            onChange={handleChange} 
        />
    );
}
export default SearchDir;

