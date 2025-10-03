import React from 'react'
import IconCard from '@/components/Shared/Icons/IconCard'
import { assets } from '../../../../public/assets'
import Newicon from '@/components/(admin)/Icons/newicon'


function page() {

const trustSignals = [
    {
        imgSrc : assets.freeShippingIcon,
        text: 'Free shipping on items over $50'
    },
    {
        imgSrc : assets.thirtyDayReturnIcon,
        text : '30-Day Returns - Hassle-free exchanges'
    },
    {
        imgSrc: assets.customerServiceIcon,
        text: "24/7 Customer Support - We're here to help"
    },
    {
        imgSrc: assets.creditCardSecureIcon,
        text: "Secure Payments - Your data is protected"
    }
]

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
              <div className='relative flex flex-col gap-4'>
                {trustSignals.map((signal,idx) => (
                    <IconCard key={idx} info={(signal)} />
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default page