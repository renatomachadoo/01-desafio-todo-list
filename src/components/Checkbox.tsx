import { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css"

import { Check } from "@phosphor-icons/react"

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Checkbox({...props}: CheckboxProps){
    return (
        <label className={styles.checkboxWrapper} htmlFor={props.id}>
            <input type="checkbox" {...props} />
            <div className={styles.checkMark}>
                <Check size={12} />
            </div>
        </label>
    )
}