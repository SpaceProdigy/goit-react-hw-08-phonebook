import * as React from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { setFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/contactsSlice';

export default function Filter() {
  const dispatch = useDispatch();
  const filterText = useSelector(getFilter);

  const handleFilter = e => {
    const normalizedFilter = e.target.value.toLowerCase();
    dispatch(setFilter(normalizedFilter));
  };

  return (
    <>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            onChange={handleFilter}
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            label="Name"
            variant="standard"
            autoComplete="none"
            value={filterText}
          />
        </Box>
      </Box>
    </>
  );
}
