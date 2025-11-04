import './globals.css'
import { ToastContainer } from 'react-toastify'
export const metadata = {
  title: 'Error 404 - Page not found | ShopQuick',
  description: 'Page Not Found',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme='mytheme' >
      
      <body>
          {children}
          <ToastContainer autoClose={3000} />
      </body>
    </html>
  )
}
