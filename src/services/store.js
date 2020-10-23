import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  // reducer lists
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const persistreducer = persistReducer(persistConfig, reducer);
const store = createStore(
  persistreducer,
  applyMiddleware(thunk)
);

const persistor = persistStore(store);

export default { store, persistor };