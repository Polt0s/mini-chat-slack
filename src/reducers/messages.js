import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, { payload: { data: { attributes } } }) => {
      state.messages.push(attributes);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
