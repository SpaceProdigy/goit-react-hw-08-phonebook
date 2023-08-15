import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, object } from 'yup';
import TextField from '@mui/material/TextField';
import BasicButtons from 'components/BasicButtons/BasicButtons';
import css from '../../components/ContactForm/ContactForm.module.css';
import cssLogin from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import AlertContacts from 'components/Alert/Alert';
import { useState } from 'react';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import { selectAuthentificated, selectUserLoading } from 'redux/authSlice';
import { createPortal } from 'react-dom';
import { Navigate } from 'react-router-dom';
import { loginUserThunk } from 'redux/operations';

const alertPortal = document.getElementById('alert');

const schema = object({
  email: string()
    .required('Required*')
    .email('Invalid email format')
    .max(30, 'Too Long! Max 30'),
  password: string()
    .required('Required*')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
    ),
});

export default function Login() {
  const buttonIsDisable = useSelector(selectUserLoading);
  const authenticated = useSelector(selectAuthentificated);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setAlertSuccess(false);
    setAlertError(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async data => {
    const { type } = await dispatch(loginUserThunk(data));
    reset();

    if (type === 'auth/login/rejected') {
      setAlertError(true);
    }
    if (type === 'auth/login/fulfilled') {
      setAlertSuccess(true);
    }
  };

  if (authenticated) return <Navigate to="/contacts" />;
  return (
    <section className={cssLogin.login}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          className={css.wrapper}
          sx={{
            '& > :not(style)': { m: 1 },
            '& .MuiFormHelperText-root': {
              color: 'red',
              fontSize: 10,
            },
          }}
        >
          <Box className={css.box}>
            <AlternateEmailIcon className={css.icon} />
            <TextField
              {...register('email')}
              helperText={errors.email?.message}
              type="email"
              label="Email"
              title="Email should be in the format example@example.com"
              variant="standard"
              autoComplete="none"
            />
          </Box>
          <Box className={css.box}>
            <LockIcon className={css.icon} />
            <TextField
              {...register('password')}
              helperText={errors.password?.message}
              type="password"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              label="Password"
              variant="standard"
              autoComplete="none"
            />
          </Box>
          <BasicButtons text="Log In" disabled={Boolean(buttonIsDisable)} />
        </Box>
      </form>

      {createPortal(
        <AlertContacts
          success={alertSuccess}
          error={alertError}
          successText={'Successfully'}
          errorText={'No such user found'}
          handleClose={handleClose}
        />,
        alertPortal
      )}
    </section>
  );
}
