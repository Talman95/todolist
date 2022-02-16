import React, {ChangeEvent} from 'react';

type MyCheckboxPropsType = {
    status: boolean
    callback: (status: boolean) => void
}

export const MyCheckbox: React.FC<MyCheckboxPropsType> = ({status, callback}) => {
    const onChangeCheckboxStatus = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked);
    }
    return (
        <input
            type={"checkbox"}
            checked={status}
            onChange={onChangeCheckboxStatus}
        />
    );
};