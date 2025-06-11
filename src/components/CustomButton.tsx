import type { ButtonHTMLAttributes } from "react";
import type { ReactNode } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string; // Allow className to be passed in
  onClick?: () => void; // Allow custom click handlers
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, className, onClick, ...rest }) => {
  return (
    <button className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default CustomButton;

