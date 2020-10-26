import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// Reducers
import authReducer from '../components/pages/login/reducer';

const reducer = combineReducers({
  // reducer lists
  authReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer']
}

const persistreducer = persistReducer(persistConfig, reducer);
const store = createStore(
  persistreducer,
  applyMiddleware(thunk, logger)
);

const persistor = persistStore(store);

export default { store, persistor };