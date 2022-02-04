import React, {ChangeEvent} from 'react';

type PropsType = {
    status: boolean
    callback: (status: boolean) => void
}

export const MyCheckbox: React.FC<PropsType> = ({status, callback}) => {
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