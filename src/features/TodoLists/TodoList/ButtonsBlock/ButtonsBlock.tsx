import React, {FC, memo} from 'react';
import {Button, ButtonGroup} from "@material-ui/core";
import {FilterValuesType} from "../../todolists-reducer";

type PropsType = {
    setFilterValue: (filterValue: FilterValuesType) => void
    filterValue: FilterValuesType
}

export const ButtonsBlock: FC<PropsType> = memo(({setFilterValue, filterValue}) => {
    const renderButton = (text: FilterValuesType) => {
        const onClickHandler = () => setFilterValue(text)

        return <Button color={filterValue === text ? "secondary" : "primary"}
                       onClick={onClickHandler}>
            {text}
        </Button>
    }

    return (
        <ButtonGroup
            size={"small"}
            variant={"contained"}
            fullWidth
            style={{paddingTop: '10px'}}
        >
            {renderButton('All')}
            {renderButton('Active')}
            {renderButton('Completed')}
        </ButtonGroup>
    );
});