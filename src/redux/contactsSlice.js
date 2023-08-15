import {
  addContact,
  deleteContact,
  fetchContacts,
  editContact,
} from './operations';
const { createSlice } = require('@reduxjs/toolkit');

const stateContacts = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFulFilledStandart = state => {
  state.isLoading = false;
  state.error = null;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: stateContacts,

  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.rejected, handleRejected)

      .addCase(fetchContacts.fulfilled, (state, action) => {
        handleFulFilledStandart(state);
        state.items = action.payload;
      })

      .addCase(addContact.fulfilled, (state, action) => {
        handleFulFilledStandart(state);
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        handleFulFilledStandart(state);
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(editContact.fulfilled, (state, action) => {
        handleFulFilledStandart(state);
        const updatedContact = action.payload;
        const index = state.items.findIndex(
          contact => contact.id === updatedContact.id
        );

        if (index !== -1) {
          state.items.splice(index, 1, updatedContact);
        }
      }),
});

export const contactsReducer = contactsSlice.reducer;

export const getContacts = state => state.contacts.items;
export const getFilter = state => state.filter.filterText;
export const getState = state => state.contacts;
