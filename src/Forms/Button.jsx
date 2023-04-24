import { forwardRef } from "react";

export const Button = forwardRef(
  ({ children, variant = "primary", ...props }, ref) => {
    return (
      <button ref={ref} className={`btn btn-${variant}`} {...props}>
        {children}
      </button>
    );
  },
);
