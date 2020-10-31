import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// Reducers
import authReducer from '../components/layouts/navbar/reducer';

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
  applyMiddleware(thunk)
);

const persistor = persistStore(store);

export default { store, persistor };