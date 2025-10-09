import "./globals.css";
import KindeClientProvider from "./KindeClientProvider";
import NavbarWrapper from "@/app/Components/NavbarWrapper";
import { CartProvider } from "./context/CartContext"; // Import CartProvider

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <KindeClientProvider>
          <CartProvider> {/* Wrap everything with CartProvider */}
            <NavbarWrapper />
            {children}
          </CartProvider>
        </KindeClientProvider>
      </body>
    </html>
  );
}