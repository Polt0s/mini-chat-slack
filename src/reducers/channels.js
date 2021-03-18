/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: gon.currentChannelId,
  },
  reducers: {
    changeChannel: (state, { payload: { id } }) => {
      state.currentChannelId = id;
    },
    addChannel: (state, { payload: { data: { id, attributes } } }) => {
      state.channels.push(attributes);
      state.currentChannelId = id;
    },
    deleteChannel: (state, { payload: { data: { id } } }) => {
      state.channels.filter((item) => item.id !== id);
      state.currentChannelId = id;
    },
    renameChannel: (state, { payload: { data: { id, attributes: { name } } } }) => {
      const channel = state.channels.find((item) => item.id === id);
      channel.name = name;
    },
  },
});

export const {
  changeChannel,
  addChannel,
  deleteChannel,
  renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
