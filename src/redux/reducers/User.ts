import {createSlice} from '@reduxjs/toolkit';

export type UserState = {
  isLoggedIn: boolean;
  token: string;
  data: {
    last_name_jp: string;
    first_name_jp: string;
    last_name_en: string;
    first_name_en: string;
    phone_number: string;
    email: string;
    customer_id: string;
    co_name_jp: string;
    co_name_kana_jp: string;
    co_name_en: string;
    co_logo_path: string;
    co_prefecture: string;
    co_city_en: string;
    co_url_choice: string;
    co_url: string;
    co_intro_jp: string;
    co_intro_en: string;
    strategies_and_goals: string;
  };
};

const initialState: UserState = {
  isLoggedIn: false,
  token: '',
  data: {
    last_name_jp: '',
    first_name_jp: '',
    last_name_en: '',
    first_name_en: '',
    phone_number: '',
    email: '',
    customer_id: '',
    co_name_jp: '',
    co_name_kana_jp: '',
    co_name_en: '',
    co_logo_path: '',
    co_prefecture: '',
    co_city_en: '',
    co_url: '',
    co_intro_jp: '',
    co_intro_en: '',
    strategies_and_goals: '',
  },
};

export const User = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logIn: (state, action) => {
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
