import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import contactPersistConfig from './Contact/persistConfig';
import { authReducer } from './Auth/slice';
import authPersistConfig from './Auth/persistConfig';
import { contactsReducer } from './Contact/contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: persistReducer(contactPersistConfig, contactsReducer),
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
