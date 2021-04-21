/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChannelExtra } from './channels.js';

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, { payload: data }) => {
      if (!state.messages.some((message) => message.id === data.id)) {
        state.messages.push(data);
      }
    },
  },
  extraReducers: {
    [removeChannelExtra.filling]: (state, { payload: data }) => {
      state.messages = state.messages.filter((item) => item.channelId !== data.id);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
