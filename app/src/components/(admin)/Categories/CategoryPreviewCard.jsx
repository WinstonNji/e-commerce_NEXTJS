import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Upload } from 'lucide-react'


function CategoryPreviewCard({category, imageUrl, handleImageUpload}) {

    useEffect(() => {
    return () => {
        if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
        }
    }
    }, [imageUrl])


  return (
    <div className='relative  w-md'>
        <div 
            className='group ring rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl cursor-pointer'
        >
            
            <div className='relative aspect-[4/3] bg-base-200 overflow-hidden'>
                <label htmlFor="imgUploadCategoryPreview" className='group'>
                    <div className={`absolute top-0 right-0 left-0 bottom-0 bg-secondary/50 z-10 flex items-center justify-center cursor-pointer transition-colors duration-150 ease-in-out ${imageUrl ? 'opacity-0 hover:opacity-50' : 'opacity-100'} `}>
                        <Upload size={50}  className='text-white group-hover:text-white' />
                    </div>

                    <input 
                        onChange={handleImageUpload} 
                        type="file" 
                        name="categoryImg" 
                        id="imgUploadCategoryPreview" 
                        className='hidden'
                        accept='image/*'
                        />
                        
                </label>

                <Image 
                    fill={true}
                    src={!imageUrl ? category.categoryImg : URL.createObjectURL(imageUrl)}
                    alt='Category Image'
                    className='object-cover group-hover:scale-105 transition-all duration-300 ease-in-out'
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300'></div>
            </div>

            <div className='px-4 pb-4 pt-3 bg-secondary/20 group-hover:bg-secondary/30 transition-colors h-full duration-300'>
                
                <div>
                    <h4 className='font-bold text-lg  mb-1 group-hover:text-accent transition-colors duration-300 text-accent'>
                        {category.categoryName}
                    </h4>
                    <p className='text-base-content/70 text-sm leading-relaxed'>
                        {category.caption}
                    </p>
                </div>
            </div>

                
        </div>
    </div>
  )
}

export default CategoryPreviewCard