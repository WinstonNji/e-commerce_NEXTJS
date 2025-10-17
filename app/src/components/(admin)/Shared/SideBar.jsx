"use client"
import React, { useState } from 'react'
import { ChartColumnStacked, LayoutGrid, Pencil, Search } from 'lucide-react'
import { Home } from 'lucide-react'
import { Plus } from 'lucide-react'
import { Wallpaper } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SideBar() {
    return (
        <div className='z-100'>
            <div className='block md:hidden w-full'>
                <SideMobile/>
            </div>
            <div className='hidden md:block'>
                <SideDeskTop />
            </div>
        </div>
        
    )
}

const SideDeskTop = () => {
    const pathname = usePathname()

    const navItems = [
        { path: '/admin-dashboard', icon: Home, label: 'Dashboard' },
        { path: '/admin-add-product', icon: Plus, label: 'Add Product' },
        { path: '/admin-edit-product', icon: Pencil, label: 'Edit Product' },
        { path: '/admin-edit-hero-page', icon: Wallpaper, label: 'Hero Image' },
        { path: '/admin-edit-icons', icon: LayoutGrid, label: 'Edit Icons' },
        { path: '/admin-edit-categories', icon: ChartColumnStacked, label: 'Categories' },
        { path: '/admin-edit-brand', icon: ChartColumnStacked, label: 'Brands' },
    ]

    const isActive = (path) => pathname === path

    return (
        <div className='flex flex-col fixed top-0 bottom-0 border-r-2 gap-2 w-fit  bg-secondary  justify-center font-bold z-100 '>
            {navItems.map(({ path, icon: Icon, label }) => (
                <Link key={path} href={path}>
                    <div 
                        className={`flex gap-2 cursor-pointer hover:bg-base-300 p-4 w-full flex-1 ${
                            isActive(path) ? 'bg-primary text-black' : ''
                        }`}
                    >
                        <Icon/>
                        {label}
                    </div>
                </Link>
            ))}
        </div>
    )
    
}

const SideMobile = () => {
    const pathname = usePathname()

    const navItems = [
        { path: '/admin-dashboard', icon: Home, label: 'Dashboard' },
        { path: '/admin-add-product', icon: Plus, label: 'Add Product' },
        { path: '/admin-edit-product', icon: Pencil, label: 'Edit Product' },
        { path: '/admin-edit-hero-page', icon: Wallpaper, label: 'Hero Image' },
        { path: '/admin-edit-icons', icon: LayoutGrid, label: 'Edit Icons' },
        { path: '/admin-edit-categories', icon: ChartColumnStacked, label: 'Categories' },
        { path: '/admin-edit-brand', icon: ChartColumnStacked, label: 'Brands' },
        
    ]

    const isActive = (path) => pathname === path

    return (
        <div className='flex fixed bottom-0 left-0 right-0 gap-4 bg-secondary justify-center font-bold overflow-x-auto pl-42 sm:pl-0 z-100'>
            {navItems.map(({ path, icon: Icon, label }) => (
                <Link key={path} href={path}>
                    <div 
                        className={`flex gap-2 flex-col items-center justify-center cursor-pointer hover:bg-base-300 p-1 hover:rounded-sm min-w-24 max-w-2 min-h-28 text-center ${
                            isActive(path) ? 'bg-primary text-black rounded-sm' : ''
                        }`}
                    >
                        <Icon/>
                        {label}
                    </div>
                </Link>
            ))}
        </div>
    )
    
}

export default SideBar