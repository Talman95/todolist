import React from 'react';

type MyButtonPropsType = {
    name: string
    callback: () => void
    className?: string
}

export const MyButton: React.FC<MyButtonPropsType> = (
    {
        name, callback,
        className, ...restProps
    }
) => {
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