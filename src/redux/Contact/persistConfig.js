import storage from 'redux-persist/lib/storage';

const contactPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['contacts'],
};

export default contactPersistConfig;
