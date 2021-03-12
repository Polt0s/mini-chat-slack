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
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = id;
      // state.channels.push(action.payload);
      // ...state, currentChannelId: id,
    },
  },
});

export const { changeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
