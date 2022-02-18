import React, {FC} from 'react';
import {FilterValueType} from "./App";
import {Button, ButtonGroup} from "@material-ui/core";

type PropsType = {
    setFilterValue: (filterValue: FilterValueType) => () => void
    filterValue: FilterValueType
}

export const ButtonsBlock: FC<PropsType> = (
    {
        setFilterValue, filterValue
    }) => {
    return (
        <ButtonGroup
            size={"small"}
            variant={"contained"}
            fullWidth
        >
            <Button
                color={filterValue === "All" ? "secondary" : "primary"}
                onClick={setFilterValue('All')}
            >
                All
            </Button>
            <Button
                color={filterValue === "Active" ? "secondary" : "primary"}
                onClick={setFilterValue('Active')}
            >
                Active
            </Button>
            <Button
                color={filterValue === "Completed" ? "secondary" : "primary"}
                onClick={setFilterValue('Completed')}
            >
                Completed
            </Button>
        </ButtonGroup>
    );
};