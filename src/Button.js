import React, { useState } from "react";

function Button({ children, onClick, idx, isDark, disabled }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      className="button"
      onClick={(e) => {
        onClick(e, idx);
      }}
      style={{
        backgroundColor: isDark ? "grey" : "wheat",
        color: isDark ? "wheat" : "#333",
        opacity: disabled ? "0.5" : "1",
        cursor: disabled ? "not-allowed" : "pointer",
        transform: isHover && !disabled ? "scale(1.02)" : "scale(1)",
        boxShadow:
          isHover && !disabled ? "0 0 5px 0.3px rgba(0, 0, 0, 0.4)" : "none"
      }}
      disabled={disabled}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {children}
    </button>
  );
}

export default Button;
