import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: '',
  data: null,
};

export const User = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logIn: (state, action) => {
      console.log({...state, ...action.payload});
      return {...state, ...action.payload};
    },
    resetToInitialState: () => {
      return initialState;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {logIn, resetToInitialState, updateToken} = User.actions;
export default User.reducer;
