import "./globals.css";
import KindeClientProvider from "./KindeClientProvider";
import NavbarWrapper from "@/app/Components/NavbarWrapper";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import { SearchProvider } from './context/SearchContext'
import Footer from "./Components/Footer";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <KindeClientProvider>
          <SearchProvider> {/* Wrap everything with SearchProvider */}
          <CartProvider> {/* Wrap everything with CartProvider */}
            <NavbarWrapper />
            {children}
            <Footer />
          </CartProvider>
          </SearchProvider>
        </KindeClientProvider>
      </body>
    </html>
  );
}