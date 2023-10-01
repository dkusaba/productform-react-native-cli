import {combineReducers, configureStore} from '@reduxjs/toolkit';

import userSlice from './reducers/userSlice';
import productSlice from './reducers/productSlice';

const rootReducer = combineReducers({
  user: userSlice,
  product: productSlice,
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
