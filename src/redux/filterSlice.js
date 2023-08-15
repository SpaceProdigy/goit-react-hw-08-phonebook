const { createSlice } = require('@reduxjs/toolkit');

const stateFilter = {
  filterText: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: stateFilter,
  reducers: {
    setFilter: (state, action) => ({
      ...state,
      filterText: action.payload,
    }),
  },
});

export const filterReducer = filterSlice.reducer;

export const { setFilter } = filterSlice.actions;
