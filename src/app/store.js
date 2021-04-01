import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import appReducer from '../features/appSlice';

export default configureStore({
  reducer: {
    //Listen to actions
    user: userReducer,
    app: appReducer,
  },
});
