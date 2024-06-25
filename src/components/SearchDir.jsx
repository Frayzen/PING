import React, { useState } from "react";


const SearchDir = () => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
        setInputValue(event.target.value);
        window.electronAPI.fetchTree(event.target.value)
    };


    return (
        <div className="input-group mb-3" style={{ padding: "0.5rem" }}>
            <input
                type="text"
                className="form-control border-secondary bg-dark text-light"
                placeholder="Search..."
                value={inputValue}
                onChange={handleChange}
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

