import React from 'react'
import { assets } from '../../../public/assets'
import Image from 'next/image'

function TrustSignals() {

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
<div className="py-8 px-4 bg-primary">
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-8'>
    {[...trustSignals].map((info, i) => (
      <div 
        key={i}
        className='group flex items-center rounded-2xl px-4 py-4 shadow-lg hover:shadow-xl transition-all duration-300 border bg-border-secondary/20 hover:border-secondary hover:-translate-y-1 hover:bg-secondary/5'
      >
        <div className='relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 mr-3 p-2 bg-secondary/10 rounded-xl group-hover:bg-secondary/20 transition-colors duration-300'>
          <Image
            src={info.imgSrc}
            fill={true}
            className='object-contain group-hover:scale-110 transition-transform duration-300'
            alt={info.text}
          />
        </div>
        
        <div className='flex-1 min-w-0'>
          <p className='text-xs sm:text-sm md:text-base font-semibold text-base-content leading-tight group-hover:text-accent transition-colors duration-300'>
            {info.text}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
    
  )
}

export default TrustSignals
