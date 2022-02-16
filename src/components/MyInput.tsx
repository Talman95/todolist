import React, {ChangeEvent, KeyboardEvent} from 'react';

type MyInputPropsType = {
    value: string
    onChangeCallback: (message: string) => void
    onKeyPressCallback: (e: KeyboardEvent<HTMLInputElement>) => void
    className?: string
    onBlurCallback?: () => void
    autoFocus?: boolean
}

export const MyInput: React.FC<MyInputPropsType> = (
    {
        value, onChangeCallback,
        onKeyPressCallback, className,
        onBlurCallback, autoFocus,
        ...restProps
    }) => {
    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeCallback(e.currentTarget.value);
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPressCallback(e);
    }
    const defaultAutoFocus = autoFocus ? autoFocus : false;
    const resultClassName = className ? className : '';
    return (
        <input
            value={value}
            onChange={onChangeText}
            onKeyPress={onKeyPress}
            className={resultClassName}
            onBlur={onBlurCallback}
            autoFocus={defaultAutoFocus}
        />
    );
};