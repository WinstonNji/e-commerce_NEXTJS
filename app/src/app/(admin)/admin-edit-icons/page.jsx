export const dynamic = "force-dynamic"
import React from 'react'
import IconCard from '@/components/Shared/Icons/IconCard'
import { assets } from '../../../../public/assets'
import Newicon from '@/components/(admin)/TrustSignals/newicon'
import TrustSignalList from '@/components/(admin)/TrustSignals/TrustSignalList'
import { Suspense } from 'react'

function page() {

  return (
    <div className='h-screen'>
        <div className='min-h-screen w-full pb-0 overflow-y-hidden -mt-2.5 md:mt-0'>
          <div className="tabs tabs-boxed md:mt-8  bg-secondary p-1 rounded-sm  h-[80vh] md:h-[90vh]">
            <input 
              type="radio" 
              name="my_tabs_6" 
              className="tab flex flex-1 checked:bg-white checked:text-black checked:border-b-2 checked:border-white transition-all duration-300 rounded-t-xl" 
              aria-label="Add An Icon" 
            />
            <div className="tab-content bg-white border border-base-300 px-8 md:px-16 transition-all duration-300 h-full overflow-y-auto">
                <div className='pb-8'>
                  <Newicon/>
                </div>
            </div>

            <input 
              type="radio" 
              name="my_tabs_6" 
              className="tab flex flex-1 checked:bg-white checked:text-black checked:border-b-2 checked:border-white transition-all duration-300 rounded-t-xl" 
              aria-label="Edit Icon" 
              defaultChecked 
            />
            <div className="tab-content bg-white border border-base-300 p-6 px-8 md:px-16 transition-all duration-300 h-full overflow-y-auto">
              <Suspense fallback={
                <div className='relative flex flex-col gap-4'>
                  {[...Array(5)].map((_,idx) => (
                    <div key={idx} className="skeleton h-20 w-w-full"></div>
                  ))}
                  
                </div>
              }>
                <TrustSignalList />
              </Suspense>
            </div>
          </div>
        </div>
    </div>
  )
}

export default page