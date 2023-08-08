import { addContact, deleteContact, fetchContacts } from './operations';
const { createSlice } = require('@reduxjs/toolkit');
const { stateContacts } = require('./initialState');

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
      }),
});

export const contactsReducer = contactsSlice.reducer;
