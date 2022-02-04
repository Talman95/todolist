import React from 'react';

type PropsType = {
    name: string
    callback: () => void
    className?: string
}

export const MyButton: React.FC<PropsType> = ({name, callback, className, ...restProps}) => {
    const onClickButton = () => {
        callback();
    }
    const resultClassName = `${className ? className : ''}`;

    return (
        <button
            onClick={onClickButton}
            className={resultClassName}
        >
            {name}
        </button>
    );
};