import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import css from './ContactList.module.css';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';

import { getFilter, getState } from 'redux/selectors';
import { deleteContact, fetchContacts } from 'redux/operations';
import Loader from 'components/Loader/Loader';

export default function ContactList() {
  const dispatch = useDispatch();

  const { items, isLoading, error } = useSelector(getState);
  const filterText = useSelector(getFilter);

  const handleDelete = e => dispatch(deleteContact(e.currentTarget.id));
  const filteredContacts = items.filter(contact =>
    contact.name.toLowerCase().trim().includes(filterText.toLowerCase().trim())
  );
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {filteredContacts.map(({ name, phone, id }) => {
        return (
          <ul className={css.wrapper} key={id}>
            <div className={css.box}>
              <PersonIcon fontSize="large" className={css.icon} />

              <div>
                <p>{name} </p>
                <p>{phone} </p>
              </div>
            </div>
            <IconButton
              className={css.btn}
              id={id}
              onClick={handleDelete}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </ul>
        );
      })}
    </div>
  );
}
