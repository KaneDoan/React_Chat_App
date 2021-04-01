import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    //login function take state and a action
    login: (state, action) => {
      //Set user to a action with a payload
      state.user = action.payload;
    },
    logout: (state) => {
      //Set user to null to log out
      state.user = null;
    }
  },
});
//export state of login and logout to the user slice.
export const { login, logout } = userSlice.actions;

//State user with user slice and user state
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
