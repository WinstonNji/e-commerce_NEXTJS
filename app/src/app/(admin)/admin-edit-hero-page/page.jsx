export const dynamic = "force-dynamic";
import React from 'react'
import AddHeroPage from '@/components/(admin)/HeroImage/AddHeroPage'
import Carousel_List from '@/components/(admin)/HeroImage/Carousel_List'
import { Suspense } from 'react'


async function page() {
  

  return (
    <div className='min-h-screen w-full pb-0 overflow-y-hidden -mt-2.5 md:mt-0'>
      <div className="tabs tabs-boxed md:mt-8  bg-secondary p-1 rounded-sm  h-[80vh] md:h-[90vh]">
        <input 
          type="radio" 
          name="my_tabs_6" 
          className="tab flex flex-1 checked:bg-white checked:text-black checked:border-b-2 checked:border-white transition-all duration-300 rounded-t-xl" 
          aria-label="Add An Image" 
        />
        <div className="tab-content bg-white border border-base-300 p-6 transition-all duration-300 h-full overflow-y-auto">
          <AddHeroPage/>
        </div>

        <input 
          type="radio" 
          name="my_tabs_6" 
          className="tab flex flex-1 checked:bg-white checked:text-black checked:border-b-2 checked:border-white transition-all duration-300 rounded-t-xl" 
          aria-label="Edit Image" 
          defaultChecked 
        />
        <div className="tab-content bg-white border border-base-300 p-6 transition-all duration-300 h-full overflow-y-auto">
          <Suspense fallback={
            <div className='flex flex-col gap-8'>
              {[...Array(2)].map((_,idx) => (
                <div key={idx} className="skeleton h-52 w-full"></div>
              ))}
              
            </div>
          }>
            <Carousel_List /> 
          </Suspense>
          
        </div>
      </div>
    </div>
  )
}

export default page