import {combineReducers, configureStore} from '@reduxjs/toolkit';

import User from './reducers/User';
import Product from './reducers/Product';
//import {logger} from 'redux-logger';

const rootReducer = combineReducers({
  user: User,
  product: Product,
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
