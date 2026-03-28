'use client'

import {PropsWithChildren} from "react";

type ButtonProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ActionButton = ({onClick, children}: PropsWithChildren<ButtonProps>) => {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    );
}

export default ActionButton;