import React, {ChangeEvent, KeyboardEvent} from 'react';

type PropsType = {
    value: string
    onChangeCallback: (message: string) => void
    onKeyPressCallback: (e: KeyboardEvent<HTMLInputElement>) => void
    className?: string
}

export const MyInput: React.FC<PropsType> = (
    {
        value, onChangeCallback,
        onKeyPressCallback, className,
        ...restProps
    }) => {
    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeCallback(e.currentTarget.value);
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPressCallback(e);
    }
    const resultClassName = className ? className : '';
    return (
        <input
            value={value}
            onChange={onChangeText}
            onKeyPress={onKeyPress}
            className={resultClassName}
        />
    );
};