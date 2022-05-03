import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["login"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store)

export { store, persistor };
