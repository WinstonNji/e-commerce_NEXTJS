import React from 'react'
import IconCard from '@/components/Shared/Icons/IconCard'
import { assets } from '../../../../public/assets'

export default async function TrustSignalList() {

    let trustSignals = []

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/trust_signals`)

        if(!res.ok){
            throw new Error('Failed to fetch trust signals')
        }

        const data = await res.json()

        console.log(data)
        
        trustSignals = data.data

    } catch (error) {
        console.log(error)
        return <p className="text-error">Something went wrong.</p>
    }
    



  return (
    <div>
        <div className='relative flex flex-col gap-4'>
            {trustSignals.reverse().map((signal,idx) => (
                <IconCard key={idx} info={(signal)} />
            ))}
          </div>
    </div>
  )
}
