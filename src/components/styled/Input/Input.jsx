import styles from './Input.module.css';
import classNames from "classnames";

const Input = ({ className, ...props }) => {
    return <input className={classNames(styles.form_input, className)} {...props} />;
}

export default Input;