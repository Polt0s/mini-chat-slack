/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import gon from 'gon';
import postDeleteChannel from '../requestServer/sendingDeleteChannel.js';

export const removeChannelExtra = createAsyncThunk(
  'removeChannel',
  async ({ id }) => {
    try {
      const response = await postDeleteChannel(id);
      return response;
    } catch (err) {
      return err.message;
    }
  },
);

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: gon.currentChannelId,
    status: 'idle',
  },
  reducers: {
    changeChannel: (state, { payload: { id } }) => {
      state.currentChannelId = id;
    },
    addChannel: (state, { payload: { data: { id, attributes } } }) => {
      state.channels.push(attributes);
      state.currentChannelId = id;
    },
    removeChannel: (state, { payload: { data: { id } } }) => {
      state.channels.filter((item) => item.id !== id);
      state.currentChannelId = gon.currentChannelId;
    },
    renameChannel: (state, { payload: { data: { id, attributes: { name } } } }) => {
      const channel = state.channels.find((item) => item.id === id);
      channel.name = name;
    },
  },
  extraReducers: {
    [removeChannelExtra.idle]: (state) => {
      state.status = 'idle';
    },
    [removeChannelExtra.filling]: (state) => {
      state.status = 'filling';
    },
    [removeChannelExtra.failed]: (state) => {
      state.status = 'failed';
    },
  },
});

export const {
  changeChannel,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
