import React, { useEffect, useState } from 'react'
import { Upload } from 'lucide-react'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { X } from 'lucide-react'

function ProductImages({
    thumbnailImg,
    productThumbnail,
    images,
    productImages,
    handleAddNewImage,
    handleChangeSliderImg,
    handleRemoveImage,
    handleThumbnailImg
}) {

    const placeHolder = 'https://www.aputf.org/wp-content/uploads/2015/06/default-placeholder.png'

  return (
        <div className='bg-white rounded-xl shadow-sm p-6'>
            <h3 className='text-xl font-semibold mb-6 text-gray-800'>Product Images</h3>
            <div className='flex flex-col lg:flex-row gap-6'>
                    
            {/* Thumbnail Image */}
            <div className='flex-shrink-0'>
                <p className='text-sm font-medium mb-3 text-gray-600'>Thumbnail Image</p>
                <div className='relative h-80 w-full lg:w-96 bg-gray-100 rounded-lg overflow-hidden shadow-md'>
                <Image 
                    fill
                    src={thumbnailImg instanceof File ? URL.createObjectURL(thumbnailImg) : productThumbnail ? productThumbnail : placeHolder }
                    className='object-contain'
                    alt='Product thumbnail'
                />

                <label 
                    htmlFor="thumbnailImage" 
                    className='absolute inset-0 flex flex-col justify-center items-center bg-black/0 hover:bg-black/60 transition-all duration-300 ease-in-out cursor-pointer group'
                > 
                    <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center text-white'>
                    <Upload className='w-8 h-8 mb-2'/>
                    <p className='font-bold text-center px-4'>Edit Thumbnail</p>
                    </div>
                    <input 
                    type="file"
                    className='hidden' 
                    id="thumbnailImage" 
                    accept="image/*"
                    onChange={handleThumbnailImg} 
                    />
                </label>
                </div>
            </div>

            {/* Slider Images */}
            <div className='flex-1'>
                <p className='text-sm font-medium mb-3 text-gray-600'>Slider Images</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                        
                {images?.map((image, index) => (
                    <div 
                    key={index} 
                    className='relative h-48 bg-gray-100 rounded-lg overflow-hidden shadow-md'
                    >
                    <Image 
                        fill
                        src={typeof(image) === 'string' ? 
                                image : image ? URL.createObjectURL(image) : placeHolder}
                        className='object-contain'
                        alt={`Product image ${index + 1}`}
                    />
                            
                    <label 
                        htmlFor={`uploadImage${index}`} 
                        className='absolute inset-0 flex flex-col justify-center items-center bg-black/0 hover:bg-black/60 transition-all duration-300 ease-in-out cursor-pointer group'
                    > 
                        <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center text-white'>
                        <Upload className='w-6 h-6 mb-1'/>
                        <p className='font-bold text-sm text-center px-2'>Edit Image {index + 1}</p>
                        </div>
                        <input 
                        type="file"
                        className='hidden' 
                        id={`uploadImage${index}`}
                        accept="image/*"
                        onChange={(e) => handleChangeSliderImg(e,index)} 
                        />
                    </label>
                            
                    {/* Remove Image */}
                    <div 
                    onClick={()=> handleRemoveImage(index)}
                    >
                    <X className={`text-white absolute right-2 top-1  bg-error rounded-full ${index > 0 ? 'block' : 'hidden'}`}/>
                    </div>
                            
                    </div>
                ))}                 

                <label 
                    htmlFor="addNewImage"
                    className='relative h-48 bg-gray-100 rounded-lg overflow-hidden shadow-md border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center group'
                    style={{borderColor: '#97322D'}}
                >
                    <Plus className='w-12 h-12 group-hover:scale-110 transition-transform duration-300' style={{color: '#97322D'}}/>
                    <p className='font-bold mt-2' style={{color: '#97322D'}}>Add New Image</p>
                    <input 
                    type="file"
                    className='hidden' 
                    id="addNewImage"
                    accept="image/*"
                    onChange={handleAddNewImage}
                    />
                </label>
                </div>
            </div>
            </div>
        </div>
  )
}

export default ProductImages