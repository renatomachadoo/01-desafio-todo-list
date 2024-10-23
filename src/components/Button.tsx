import { ButtonHTMLAttributes } from "react";
import { Icon } from "@phosphor-icons/react";

import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: Icon;
}

export function Button({ text, icon: Icon, ...props }: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      {text}
      {Icon && <Icon size={16} />}
    </button>
  );
}
