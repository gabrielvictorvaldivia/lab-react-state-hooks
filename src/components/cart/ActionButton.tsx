'use client'

import React, {PropsWithChildren} from "react";

type ButtonProps = {
    onClick: () => void;
    text:string
}

const ActionButton = ({onClick, text}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="bg-blue-600 text-white rounded-full px-6 py-2.5 font-medium hover:bg-blue-700 transition duration-150 flex items-center gap-2 shadow-sm"
        >
            <span>{text}</span>
            <span className="text-lg">+</span>
        </button>
    );
}

export default ActionButton;