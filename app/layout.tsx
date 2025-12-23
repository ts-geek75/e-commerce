"use client"
import { FavouriteProvider } from "@/modules/favourite-products/context/FavouriteProductsContext";
import "./globals.css";
import { ShoppingCartProvider } from "@/modules/cart/context";
import { Provider } from 'react-redux';
import { store } from "@/redux/store"; 


const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html>
      <body>
        <Provider store={store}>
          {/* <ShoppingCartProvider> */}
            {/* <FavouriteProvider> */}
              {children}
            {/* </FavouriteProvider> */}
          {/* </ShoppingCartProvider> */}
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
