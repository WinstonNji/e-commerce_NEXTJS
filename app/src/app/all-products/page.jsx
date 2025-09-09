import React from 'react'
import { ListFilter } from 'lucide-react'

import Products from '@/components/All_Products/Products'
import DrawerContent from '@/components/All_Products/DrawerContent'
import SortButton from '@/components/All_Products/SortButton'

function page() {
  return (
    <div>
        <div>
            <p className='text-3xl text-accent font-bold mt-3'>All Our Products</p>
            <p className='text-gray-500'>Here you can find all our curated products</p>
        </div>
        
        <div className='mt-5  flex flex-col md:flex-row gap-6 items-center justify-center '>
            {/* Input */}
            <div className='w-full md:w-2/3'>
              <label className="input bg-transparent ring flex flex-1 w-full important" >
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input type="search" required placeholder="Search"  className=''/>
              </label>
            </div>
            
            <div className='flex items-center justify-between w-full md:w-fit gap-4 -mt-3'>
                <div className="drawer w-fit">
                  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                  <div className="drawer-content">
                    <label htmlFor="my-drawer" className="btn ring ring-accent bg-transparent hover:bg-accent hover:text-white drawer-button"> <ListFilter /> Filter</label>
                  </div>
                  <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-300 text-base-content min-h-full w-80 p-3 font-bold text-lg">
                      <h3 className='font-bold text-2xl mb-8'>Filter Options</h3>
                      {/* Sidebar content here */}
                      <DrawerContent />
                    </ul>
                </div>
              </div>

              <SortButton />
            </div>

            
        </div>

        
        <Products />
    </div>
  )
}

export default page