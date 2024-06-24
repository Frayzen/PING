import React from "react";

const SaveIndicator = ({ saved }) => {
  return (
    <div>
      {saved ? (
        <span className="badge bg-success">Saved</span>
      ): (
        <span className="badge bg-danger">Not saved</span>
      )}
    </div>
  );
};

export default SaveIndicator;
