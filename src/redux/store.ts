import {combineReducers, configureStore} from '@reduxjs/toolkit';

import User from './reducers/User';
//import {logger} from 'redux-logger';

const rootReducer = combineReducers({
  user: User,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
