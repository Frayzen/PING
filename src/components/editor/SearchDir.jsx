import React from "react";

const SearchDir = ({ onChange, searchString }) => {
    return (
        <div className="input-group" style={{ padding: "0.5rem" }}>
            <input
                type="text"
                className="form-control border-secondary bg-dark text-light"
                placeholder="Search..."
                value={searchString}
                onChange={onChange}
            />
        </div>
    );

}
export default SearchDir;

