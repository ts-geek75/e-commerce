import { configureStore } from '@reduxjs/toolkit';
import { cartApi } from './apis/CartApi';
import { favouritesApi } from './apis/FavouritesApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from './apis/ProductsApi';
import { authApi } from "./apis/authApi";

export const store = configureStore({
  reducer: {

    [cartApi.reducerPath]: cartApi.reducer,
    [favouritesApi.reducerPath]: favouritesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cartApi.middleware,
      favouritesApi.middleware,
      productsApi.middleware,
      authApi.middleware 
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;