import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "filter";
  active?: boolean;
};

function Button({
  children,
  onClick,
  active = false,
  variant = "primary",
  type = "button",
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
    ${styles.button}
    ${styles[variant]}
    ${active ? styles.active : ""}
  `}
    >
      {children}
    </button>
  );
}
export default Button;
