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
  },
});

export const { changeChannel, addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
