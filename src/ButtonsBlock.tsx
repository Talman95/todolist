import React, {FC} from 'react';
import {MyButton} from "./components/MyButton";
import {FilterValueType} from "./App";

type PropsType = {
    onClickSetFilter: (filterValue: FilterValueType) => void
    filterValue: FilterValueType
}

export const ButtonsBlock: FC<PropsType> = ({onClickSetFilter, filterValue}) => {
    return (
        <div>
            <MyButton
                name={'All'}
                callback={() => onClickSetFilter('All')}
                className={filterValue === 'All' ? 'active-filter' : ''}
            />
            <MyButton
                name={'Active'}
                callback={() => onClickSetFilter('Active')}
                className={filterValue === 'Active' ? 'active-filter' : ''}
            />
            <MyButton
                name={'Completed'}
                callback={() => onClickSetFilter('Completed')}
                className={filterValue === 'Completed' ? 'active-filter' : ''}
            />
        </div>
    );
};