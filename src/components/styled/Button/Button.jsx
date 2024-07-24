import React, { useRef } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

const Button = ({ children, onClick, className,...props }) => {
    const buttonRef = useRef(null);

    const createRipple = (event) => {
        const button = event.currentTarget;
        if (button) {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(button.clientWidth, button.clientHeight);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add(styles.ripple);

            button.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        }
    };

    return (
        <button
            ref={buttonRef}
            className={classNames(styles.btn, className)}
            onClick={(e) => {
                createRipple(e);
                if (onClick) onClick(e);
            }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
