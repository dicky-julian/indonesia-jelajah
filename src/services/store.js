import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// Reducers
import authReducer from '../components/layouts/navbar/reducer';
import cartReducer from '../components/pages/cart/reducer';
import articleReducer from '../components/pages/article/reducer';
import articleNoteReducer from '../components/pages/article-create/reducer';

const reducer = combineReducers({
  // reducer lists
  authReducer,
  cartReducer,
  articleReducer,
  articleNoteReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer', 'articleNoteReducer']
}

const persistreducer = persistReducer(persistConfig, reducer);
const store = createStore(
  persistreducer,
  applyMiddleware(thunk)
);

const persistor = persistStore(store);

export default { store, persistor };