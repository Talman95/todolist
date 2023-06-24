import React, { FC } from 'react';

import { Box, Modal } from '@mui/material';

import { taskModalActions } from 'features/taskModal/taskModal.reducer';
import { useActions } from 'hooks/useActions';
import { useAppSelector } from 'hooks/useAppSelector';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type PropsType = {
  children: React.ReactNode;
};

export const BasicModal: FC<PropsType> = ({ children }) => {
  const task = useAppSelector(state => state.modal.currentTask);

  const { closeModalTask } = useActions(taskModalActions);

  return (
    <div>
      <Modal open={!!task} onClose={closeModalTask}>
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};
