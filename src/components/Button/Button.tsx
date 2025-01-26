import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button = ({
  children,
  className = "",
  ...props
}: IButtonProps) => {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
};
