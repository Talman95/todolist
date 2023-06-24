import React, { memo } from 'react';

import { Button, ButtonGroup } from '@mui/material';

import { FilterValuesType } from '../../todoLists.reducer';

type PropsType = {
  setFilterValue: (filterValue: FilterValuesType) => void;
  filterValue: FilterValuesType;
};

export const ButtonsBlock = memo(({ setFilterValue, filterValue }: PropsType) => {
  const renderButton = (text: FilterValuesType) => {
    const onClickHandler = () => setFilterValue(text);

    return (
      <Button
        color={filterValue === text ? 'secondary' : 'primary'}
        onClick={onClickHandler}
      >
        {text}
      </Button>
    );
  };

  return (
    <ButtonGroup
      size="small"
      variant="contained"
      fullWidth
      style={{ paddingTop: '10px' }}
    >
      {renderButton('All')}
      {renderButton('Active')}
      {renderButton('Completed')}
    </ButtonGroup>
  );
});
