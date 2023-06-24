import React, { FC, useEffect } from 'react';

import './App.css';
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { selectIsInitialized, selectStatus } from 'app/app.selectors';
import { BasicModal } from 'components/BasicModal/BasicModal';
import { ErrorSnackbar } from 'components/ErrorSnackbar/ErrorSnackbar';
import { authThunks } from 'features/auth/auth.reducer';
import { selectIsLoggedIn } from 'features/auth/auth.selectors';
import { Login } from 'features/auth/Login';
import { TaskModal } from 'features/taskModal/TaskModal';
import { TodoListsContainer } from 'features/todoListsContainer/TodoListsContainer';
import { useActions } from 'hooks/useActions';
import { useAppSelector } from 'hooks/useAppSelector';

type AppPropsType = {
  demo?: boolean;
};

export const App: FC<AppPropsType> = ({ demo = false }) => {
  const status = useAppSelector(selectStatus);
  const isInitialized = useAppSelector(selectIsInitialized);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const { logout, initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);

  const logoutHandler = () => {
    logout();
  };

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ height: '100vh' }}>
      <ErrorSnackbar />
      <AppBar position="static" style={{ height: '64px' }}>
        {isLoggedIn ? (
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <Typography variant="h6">TodoLists</Typography>
            <Button color="inherit" variant="outlined" onClick={logoutHandler}>
              Logout
            </Button>
          </Toolbar>
        ) : (
          <Toolbar style={{ justifyContent: 'flex-start' }}>
            <Typography variant="h6">TodoLists</Typography>
          </Toolbar>
        )}
        {status === 'loading' && (
          <LinearProgress sx={{ position: 'absolute', top: '64px', left: 0, right: 0 }} />
        )}
      </AppBar>
      <Container
        fixed
        sx={{ paddingTop: '20px', overflowX: 'scroll', height: 'calc(100vh - 64px)' }}
      >
        <Routes>
          <Route path="/" element={<TodoListsContainer demo={demo} />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>} />
        </Routes>
      </Container>
      <BasicModal>
        <TaskModal />
      </BasicModal>
    </div>
  );
};
