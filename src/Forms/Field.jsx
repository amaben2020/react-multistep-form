// Forms/Field.js

import React from "react";

export const Field = ({ children, label, error }) => {
  const id = getChildId(children);

  return (
    <div className="col-sm-12 mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {children}
      {error && <small className="error">{error.message}</small>}
    </div>
  );
};

// Get id prop from a child element
export function getChildId(children) {
  const child = React.Children.only(children);

  return child?.props.id;
}
