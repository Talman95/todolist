import React from 'react';

type PropsType = {
    title: string
}

export const TaskHeader:React.FC<PropsType> = ({title}) => {
    return (
        <div>
            <h3>{title}</h3>
        </div>
    );
};