import { FavouriteProvider } from "@/modules/favourite-products/context/FavouriteProductsContext";
import "./globals.css";
import { ShoppingCartProvider } from "@/modules/cart/context";


export const metadata = {
  title: "E-commerce App",
  description: "Simple e-commerce with login/signup",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html>
      <body>
        <ShoppingCartProvider>
          <FavouriteProvider>
          {children}
          </FavouriteProvider>
        </ShoppingCartProvider>
      </body>
    </html>
  );
};

export default RootLayout;