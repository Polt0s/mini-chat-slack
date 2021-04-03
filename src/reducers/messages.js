import { createSlice } from '@reduxjs/toolkit';
import { removeChannelExtra } from './channels.js';

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
  extraReducers: {
    [removeChannelExtra.filling]: (state, { payload: { data: { id } } }) => {
      // eslint-disable-next-line no-param-reassign
      state.messages = state.messages.filter((item) => item.channelId !== id);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
