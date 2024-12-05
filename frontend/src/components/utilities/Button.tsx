import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "primary" }) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      style={{ margin: "0.5rem" }}
    >
      {label}
    </button>
  );
};

export default Button;
