import { createStore } from "redux";
import AppModule from "./AppModule"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// const reducers = (history) => combineReducers({
//     appModule: AppModule
// })

const persistConfig = {
    key: 'root',
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, AppModule);
  
  export default (preloadedState = {}) => {
    const store = createStore(
      persistedReducer,
      preloadedState, // initial state
    );
    const persistor = persistStore(store);
    return { store, persistor };
  }