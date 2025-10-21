import React from 'react'
import CategoryCard from '@/components/Shared/Category/CategoryCard';
import AddCategory from '@/components/(admin)/Categories/AddCategory';
import CategoryList from '@/components/(admin)/Categories/CategoryList';

import { Suspense } from 'react';

async function  page() {



return (
    <div className='min-h-screen'>

    <div className='min-h-screen w-full pb-0 overflow-y-hidden -mt-2.5 md:mt-0'>
        <div className="tabs tabs-boxed md:mt-8  bg-secondary p-1 rounded-sm  h-[80vh] md:h-[90vh]">
        <input 
            type="radio" 
            name="my_tabs_6" 
            className="tab flex flex-1 checked:bg-white checked:text-black checked:border-b-2 checked:border-white transition-all duration-300 rounded-t-xl" 
            aria-label="Add A Category" 
        />
        <div className="tab-content bg-white border border-base-300 p-6 px-8 md:px-16 transition-all duration-300 h-full overflow-y-auto">
            <AddCategory/>
        </div>

        <input 
            type="radio" 
            name="my_tabs_6" 
            className="tab flex flex-1 checked:bg-white checked:text-black checked:border-b-2 checked:border-white transition-all duration-300 rounded-t-xl" 
            aria-label="Edit Category" 
            defaultChecked 
        />
        <div className="tab-content bg-white border border-base-300 p-6 px-8 md:px-16 transition-all duration-300 h-full overflow-y-auto">
            <Suspense fallback={
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6'>
                {[...Array(3)].map((_,idx) => (
                    <div key={idx} className="flex w-full md:w-64 lg:w-72 flex-col gap-2">
                        <div className="skeleton h-56 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                ))}
            </div>}>
                <CategoryList />
            </Suspense>
            
        </div>

        
        </div>
    </div>

    </div>
)
}

export default page