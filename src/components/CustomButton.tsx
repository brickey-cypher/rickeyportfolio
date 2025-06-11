import type { ButtonHTMLAttributes } from "react";

import type { ReactNode } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...rest }) => {
  return (
    <button {...rest}>
      {children}
    </button>
  );
};

export default CustomButton;
