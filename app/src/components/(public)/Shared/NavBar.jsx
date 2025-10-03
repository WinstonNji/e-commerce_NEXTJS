"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { MenuIcon } from 'lucide-react'
import { X } from 'lucide-react'
import { ShoppingCart } from 'lucide-react'
import { ShoppingBag } from 'lucide-react'

function NavBar() {
    
    
    return (
        <div className='text-black font-semibold '>
            <MobileNavBar />
            <DesktopNavBar />
            <hr />
        </div>
        
    )
}

function MobileNavBar (){

    const [menuIsOpen, setMenu] = useState(false)
    const pathname = usePathname()
    return (
        <div className='flex items-center py-4 px- md:hidden'>
            <div className='flex-1'>
                <h1 className='text-3xl'>Shop<span className='text-accent'>Quick</span></h1>
            </div>
            <div className='flex gap-8 items-center'>                
                {/* Drawer */}
                <div className="drawer drawer-end">
                  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                  <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-accent text-accent">
                        <MenuIcon color='white' />
                    </label>
                  </div>
                  <div className="drawer-side z-100">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-secondary text-black min-h-full w-80 p-4 gap-4">
                      {/* Sidebar content here */}
                        <li>
                            <Link href={'/'} className={` duration-150 transition-all ease-in-out hover:border-accent hover:border-b-2`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href={'/all-products'} className={` duration-150 transition-all ease-in-out ${pathname === '/all-products' ? 'border-b-2 border-accent' : "hover:border-accent hover:border-b-2"}`}>
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link href={'/admin-dashboard'} className='ring rounded-full px-2 py-1 hover:bg-accent hover:text-white transition-all duration-200 ease-in-out'>
                                Admin Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href={'/cart'} className={` duration-150 transition-all ease-in-out ${pathname === '/cart' ? 'border-b-2 border-accent' : "hover:border-accent hover:border-b-2"}`}>
                                <ShoppingCart /> Cart
                            </Link>
                        </li>                        
                        <li className='hover:underline underline-offset-4 decoration-accent'>
                            <div className='flex '>
                                <User></User>
                                <span>Account</span>
                            </div>
                        </li>
                    </ul>
                  </div>
                </div>
                
                
            </div>
        </div>
    
    )
}

function DesktopNavBar() {
    const pathname = usePathname()
    return (
    <div className='hidden md:block' >
        <div className='flex items-center py-4 '>
            <div className='flex-1'>
                <h1 className='text-3xl'>Shop<span className='text-accent'>Quick</span></h1>
            </div>
            <ul className='flex gap-6'>
                <li>
                    <Link href={'/'} className={` duration-150 transition-all ease-in-out hover:border-accent hover:border-b-2`}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href={'/all-products'} className={` duration-150 transition-all ease-in-out ${pathname === '/all-products' ? 'border-b-2 border-accent' : "hover:border-accent hover:border-b-2"}`}>
                        Shop
                    </Link>
                </li>
                <li>
                    <Link href={'/cart'} className={` duration-150 transition-all ease-in-out ${pathname === '/cart' ? 'border-b-2 border-accent' : "hover:border-accent hover:border-b-2"} flex gap-2`}>
                        <div className='relative flex justify-center items-center'>
                            <ShoppingCart />
                            <span className='absolute bottom-2 left-4 text-accent font-bold pl-2'>3</span>
                        </div>
                         Cart
                        
                    </Link>
                </li>      
                <li>
                    <Link href={'/admin-dashboard'} className='ring rounded-full px-2 py-1 hover:bg-accent hover:text-white transition-all duration-200 ease-in-out'>
                        Admin Dashboard
                    </Link>
                </li>
                <li>
                    <Link href={'/profile'} className='flex hover:border-b-2 border-accent transition-all duration-100 ease-in-out'>
                        <User></User>
                        <span>Account</span>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default NavBar
