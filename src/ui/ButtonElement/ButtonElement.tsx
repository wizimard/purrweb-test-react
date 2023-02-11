import React from "react";

import './ButtonElement.css';

type ButtonElementType = {
  attr?: React.ButtonHTMLAttributes<HTMLButtonElement>,
  styleType: "primary" | "secondary" | "text-primary" | "text-secondary";
  children: React.ReactNode;
}

const ButtonElement: React.FC<ButtonElementType> = (props) => {
  return (
    <button {...props.attr}
      className={`fz-14 btn btn-${props.styleType} ${props.attr?.className}`}>
      { props.children }
    </button>
  );
};

export default ButtonElement;