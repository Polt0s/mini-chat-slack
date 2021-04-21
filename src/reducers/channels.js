/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useApi from '../hooks/useApi.js';

export const removeChannelExtra = createAsyncThunk(
  'removeChannel',
  async ({ id }) => {
    try {
      const data = { id };
      const response = await useApi.removeChannel(data);
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
    currentChannelId: null,
    status: 'idle',
  },
  reducers: {
    changeChannel: (state, { payload: data }) => {
      state.currentChannelId = data.id;
    },
    addChannel: (state, { payload: data }) => {
      if (!state.channels.some((channel) => channel.id === data.id)) {
        state.channels.push(data);
        state.currentChannelId = data.id;
      }
    },
    removeChannel: (state, { payload: { data: { id } } }) => {
      state.channels.filter((item) => item.id !== id);
      state.currentChannelId = id;
    },
    renameChannel: (state, { payload: data }) => {
      const channel = state.channels.find((item) => item.id === data.id);
      channel.name = data.name;
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
