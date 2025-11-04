import './globals.css'
import UserContextProvider from '@/context/userContext'
import { ToastContainer } from 'react-toastify'
export const metadata = {
  title: 'ShopQuick | Login',
  description: 'Login to shopquick to save cart items',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme='mytheme' >
      
      <body>
        <UserContextProvider>
          {children}
          <ToastContainer autoClose={3000} />
        </UserContextProvider>
      </body>
    </html>
  )
}
