import React from 'react';

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';

import { authThunks } from './auth.reducer';

import { selectIsLoggedIn } from 'features/auth/auth.selectors';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';

export const Login = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length <= 2) {
        errors.password = 'Password should be more than 2 symbols';
      }

      return errors;
    },
    onSubmit: async (values, formikHelpers) => {
      const resultAction = await dispatch(authThunks.login(values));

      if (authThunks.login.rejected.match(resultAction)) {
        if (resultAction.payload) {
          if (resultAction.payload.fieldsErrors?.length) {
            const error = resultAction.payload.fieldsErrors[0];

            formikHelpers.setFieldError(error.field, error.error);
          }
        }
      }
      formik.resetForm();
    },
  });

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href="https://social-network.samuraijs.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {' '}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                type="email"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              ) : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              ) : null}
              <FormControlLabel
                label="Remember me"
                control={<Checkbox {...formik.getFieldProps('rememberMe')} />}
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
