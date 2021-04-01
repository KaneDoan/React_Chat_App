import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    //default app null
    channelId:null,
    channelName:null,
  },
  reducers: {
    //login function take state and a action
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
  },
});
//export state of login and logout to the app slice.
export const { setChannelInfo } = appSlice.actions;

//State app with app slice and app state
export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;

export default appSlice.reducer;
