import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
export default authPersistConfig;
