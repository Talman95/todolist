import React, {FC, memo} from 'react';
import {Button, ButtonGroup} from "@material-ui/core";
import {FilterValuesType} from "../todolists-reducer";

type PropsType = {
    setFilterValue: (filterValue: FilterValuesType) => void
    filterValue: FilterValuesType
}

export const ButtonsBlock: FC<PropsType> = memo(({setFilterValue, filterValue}) => {
    return (
        <ButtonGroup
            size={"small"}
            variant={"contained"}
            fullWidth
        >
            <Button
                color={filterValue === "All" ? "secondary" : "primary"}
                onClick={() => setFilterValue('All')}
            >
                All
            </Button>
            <Button
                color={filterValue === "Active" ? "secondary" : "primary"}
                onClick={() => setFilterValue('Active')}
            >
                Active
            </Button>
            <Button
                color={filterValue === "Completed" ? "secondary" : "primary"}
                onClick={() => setFilterValue('Completed')}
            >
                Completed
            </Button>
        </ButtonGroup>
    );
});