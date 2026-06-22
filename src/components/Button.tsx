import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Props = {
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
  variant?: "primary" | "secondary" | "filter";
};

function Button({
  children,
  onClick,
  active = false,
  variant = "primary",
}: Props) {
  return (
    <button
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
