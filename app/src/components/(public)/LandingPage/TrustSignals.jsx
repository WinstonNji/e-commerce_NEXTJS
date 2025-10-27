import React from 'react'
import { assets } from '../../../../public/assets'
import Image from 'next/image'
import IconCard from '@/components/Shared/Icons/IconCard'

function TrustSignals({trustSignals}) {

    // const trustSignals = [
    //     {
    //         imgSrc : assets.freeShippingIcon,
    //         text: 'Free shipping on items over $50'
    //     },
    //     {
    //         imgSrc : assets.thirtyDayReturnIcon,
    //         text : '30-Day Returns - Hassle-free exchanges'
    //     },
    //     {
    //         imgSrc: assets.customerServiceIcon,
    //         text: "24/7 Customer Support - We're here to help"
    //     },
    //     {
    //         imgSrc: assets.creditCardSecureIcon,
    //         text: "Secure Payments - Your data is protected"
    //     }
    // ]

  return (
<div className="py-8 px-4 bg-primary">
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-8'>
    {[...trustSignals].map((info, i) => (
      <IconCard key={i} info={(info)}/>
    ))}
  </div>
</div>
    
  )
}

export default TrustSignals
