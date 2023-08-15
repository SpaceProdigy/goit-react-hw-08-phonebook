import Box from '@mui/material/Box';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, object } from 'yup';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import BasicButtons from 'components/BasicButtons/BasicButtons';
import css from '../../components/ContactForm/ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import cssRegister from './Register.module.css';
import AlertContacts from 'components/Alert/Alert';
import { useState } from 'react';
import { registerUserThunk } from 'redux/operations';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import { selectAuthentificated, selectUserLoading } from 'redux/authSlice';
import { Navigate } from 'react-router-dom';

const alertPortal = document.getElementById('alert');

const schema = object({
  name: string()
    .max(20, 'Too Long! Max 20')
    .required('Required*')
    .matches(
      /^[a-zA-Zа-яА-ЯґҐєЄіІїЇ]+(([' \\-][a-zA-Zа-яА-ЯґҐєЄіІїЇ ])?[a-zA-Zа-яА-ЯґҐєЄіІїЇ]*)*$/,
      'Invalid name format'
    ),
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

export default function Register() {
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
    const { type } = await dispatch(registerUserThunk(data));
    reset();
    if (type === 'auth/register/rejected') {
      setAlertError(true);
    }
    if (type === 'auth/register/fulfilled') {
      setAlertSuccess(true);
    }
  };

  if (authenticated) return <Navigate to="/contacts" />;
  return (
    <section className={cssRegister.register}>
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
            <PersonIcon className={css.icon} />

            <TextField
              {...register('name')}
              helperText={errors.name?.message}
              type="text"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              label="Name"
              variant="standard"
              autoComplete="none"
            />
          </Box>
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
          <BasicButtons text="Sing up" disabled={Boolean(buttonIsDisable)} />
        </Box>
      </form>

      {createPortal(
        <AlertContacts
          success={alertSuccess}
          successText={'New user successfully'}
          errorText={'Such user already exists'}
          error={alertError}
          handleClose={handleClose}
        />,
        alertPortal
      )}
    </section>
  );
}
