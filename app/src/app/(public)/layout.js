import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
import NavBar from "@/components/(public)/Shared/NavBar";
import Footer from "@/components/(public)/Shared/Footer";
import UserContextProvider from "@/context/userContext";
import { ToastContainer } from "react-toastify";
import CartContextProvider from "@/context/cartContext";
import GeneralContextProvider from "@/context/generalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShopQuick - E-commerce",
  description: "Find your favourite products at affordable prices",
};

export default function RootLayout({ children, url }) {
  return (
    <html lang="en" data-theme='mytheme' >
      <body
        
        className={`${geistSans.variable} ${geistMono.variable} bg-primary antialiased `}
      >
        <GeneralContextProvider>
          <UserContextProvider>
            <CartContextProvider>
              <div className="mx-7 md:mx-9 lg:px-32 ">
                <NavBar />
                {children}
              </div>
              <Footer />
            </ CartContextProvider>
          </UserContextProvider>
        </GeneralContextProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
