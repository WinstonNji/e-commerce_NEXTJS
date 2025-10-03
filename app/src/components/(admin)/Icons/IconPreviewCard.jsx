"use client"
import React from 'react'
import * as LucideIcons from 'lucide-react'

function IconPreviewCard({ info = { imgSrc: 'ShoppingCart', text: 'Insert Icon Text' } }) {
    const IconComponent = LucideIcons[info?.imgSrc]

    return (
        <div className='group flex items-center rounded-2xl px-4 py-4 shadow-lg hover:shadow-xl transition-all duration-300 border bg-border-secondary/20 hover:border-secondary hover:-translate-y-1 hover:bg-secondary/5 relative'>
            <div className='relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 mr-3 rounded-xl transition-colors duration-300'>
                {IconComponent ? (   
                    <IconComponent className='w-full h-full text-black bg-secondary/10 group-hover:scale-110 transition-transform duration-300 rounded-xl p-3' />
                ) : (
                    <div className='w-full h-full bg-secondary/10 rounded-xl flex items-center justify-center'>
                        <span className='text-xs text-gray-400'>No Icon</span>
                    </div>
                )}
            </div>
                
            <div className='flex-1 min-w-0'>
                <p className='text-xs sm:text-sm md:text-base font-semibold text-base-content leading-tight group-hover:text-accent transition-colors duration-300'>
                    {info.text || 'Insert Icon Text'}
                </p>
            </div>
        </div>
    )
}

export default IconPreviewCard