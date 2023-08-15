import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { string, object } from 'yup';
import { Box, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import css from './ContactList.module.css';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { getFilter, getState } from 'redux/contactsSlice';
import { deleteContact, editContact, fetchContacts } from 'redux/operations';
import Loader from 'components/Loader/Loader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CloseIcon from '@mui/icons-material/Close';

const schema = object({
  name: string()
    .max(20, 'Too Long! Max 20')
    .required('Required*')
    .matches(
      /^[a-zA-Zа-яА-ЯґҐєЄіІїЇ]+(([' \\-][a-zA-Zа-яА-ЯґҐєЄіІїЇ ])?[a-zA-Zа-яА-ЯґҐєЄіІїЇ]*)*$/,
      'Invalid name format'
    ),

  number: string()
    .required('Required*')
    .max(20, 'Too Long! Max 15')
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      'Min 5, only numbers'
    ),
});

export default function ContactList() {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(getState);
  const filterText = useSelector(getFilter);
  const [currentId, setCurrentId] = useState(null);
  const [currentName, setCurrentName] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(null);
  const handleDelete = e => dispatch(deleteContact(e.currentTarget.id));
  const filteredContacts = items.filter(contact =>
    contact.name.toLowerCase().trim().includes(filterText.toLowerCase().trim())
  );

  const resetEdit = () => {
    setCurrentId(null);
    setCurrentName(null);
    setCurrentNumber(null);
    reset();
  };

  const handleEdit = e => {
    setCurrentId(e.currentTarget.id);
    setCurrentName(e.currentTarget.dataset.name);
    setCurrentNumber(e.currentTarget.dataset.number);
    reset();
  };

  const handleEditClose = () => {
    resetEdit();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    resetEdit();
    dispatch(editContact({ currentId, data }));
  };
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.contacts}>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {filteredContacts.map(({ name, number, id }) => {
        return (
          <ul className={css.wrapper} key={id}>
            <div className={css.box}>
              <PersonIcon fontSize="large" className={css.icon} />

              <div>
                {currentId === id ? (
                  <form onSubmit={handleSubmit(onSubmit)} id="editForm">
                    <Box
                      sx={{
                        '& > :not(style)': { m: 1 },
                        '& .MuiFormHelperText-root': {
                          color: 'red',
                          fontSize: 10,
                        },
                      }}
                    >
                      <Box className={css.inputEdit}>
                        <TextField
                          autoFocus={false}
                          {...register('name')}
                          helperText={errors.name?.message}
                          type="text"
                          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                          variant="standard"
                          label={currentName}
                          autoComplete="none"
                        />
                      </Box>
                      <Box className={css.inputEdit}>
                        <TextField
                          {...register('number')}
                          autoFocus={false}
                          helperText={errors.number?.message}
                          type="tel"
                          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                          variant="standard"
                          label={currentNumber}
                          autoComplete="none"
                        />
                      </Box>
                    </Box>
                  </form>
                ) : (
                  <>
                    <p>{name} </p>
                    <p>{number} </p>
                  </>
                )}
              </div>
            </div>
            <div className={css.btnWrapper}>
              <div className={css.btnBox}>
                {currentId === id ? (
                  <>
                    <IconButton
                      className={css.btnEdit}
                      id={id}
                      data-name={name}
                      data-number={number}
                      onClick={handleEditClose}
                    >
                      <CloseIcon />
                    </IconButton>
                    <IconButton
                      className={css.btnEditSubmit}
                      type="submit"
                      form="editForm"
                    >
                      <TaskAltIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton
                      className={css.btnEdit}
                      id={id}
                      data-name={name}
                      data-number={number}
                      onClick={handleEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </div>

              <IconButton
                className={css.btn}
                id={id}
                onClick={handleDelete}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </ul>
        );
      })}
    </div>
  );
}
