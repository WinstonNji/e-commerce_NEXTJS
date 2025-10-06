"use client"
import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { X } from 'lucide-react'


function ProductImages({thumbnailImage, handleThumbnailImg, images, uploadImg, handleAddNewImage, handleRemoveImage}) {


  return (
    <div>
        <div className='pt-4'>
            <p className='mb-5 text-xl font-semibold text-accent'>Product Images</p>
            {/* Container */}
            
            <div className='bg-white rounded-md p-6 ring md:flex gap-8'>
                {/* Thumbnail Image */}
                <div className='shrink-0 flex-1 lg:flex-0 '>
                    <p className='text-gray-500 font-semibold pb-4'>Thumbnail Images</p>
                    <div className='relative h-80 group lg:w-80'>
                    
                        <Image 
                            fill
                            src={thumbnailImage ? URL.createObjectURL(thumbnailImage) : 'https://www.aputf.org/wp-content/uploads/2015/06/default-placeholder.png'}
                            className={`${thumbnailImage ? 'object-contain' : 'object-cover'} shadow-md bg-gray-300/50 rounded-md`}
                            alt='thumbnail Img'
                        />

                        <label htmlFor="thumbnail" className={`absolute top-0 bottom-0 left-0 right-0 bg-secondary/50 flex flex-col justify-center items-center text-xl font-semi-bold border-2 border-dashed border-accent rounded-sm group-hover:bg-black/60 group-hover:text-white transition-all duration-150 ease-in-out cursor-pointer text-accent font-semibold ${thumbnailImage ? 'opacity-0 hover:opacity-100' : "opacity-100"}`}>
                            <Upload size={35}/>
                            <p>{thumbnailImage ? `Edit Thumbnail Image ` : 'Upload Product Thumbnail'}</p>
                        </label>

                        <input 
                            type="file"
                            className='hidden'
                            id='thumbnail'
                            name='thumbnail'
                            accept='image/*'
                            onChange={handleThumbnailImg}
                        />
                    </div>
                </div>
                

                {/* Other Product Images */}
                
                <div className='flex-1 '>
                    <p className='text-gray-500 font-semibold py-4'>Slider Images</p>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 '>
                        {images.map((img,index) => (
                            <div key={index} className='relative h-48 group lg:w-64'>
                                <Image 
                                    fill
                                    src={img ? URL.createObjectURL(img) : 'https://www.aputf.org/wp-content/uploads/2015/06/default-placeholder.png'}
                                    className={`${img ? 'object-contain' : 'object-cover'}  shadow-md bg-gray-300 rounded-md`}
                                    alt={`Product Image ${index+1}`}
                                />

                                <label htmlFor={`Product_Image_${index+1}`} className={`absolute top-0 bottom-0 left-0 right-0 bg-secondary/50 flex flex-col justify-center items-center text-center text-sm font-semi-bold border-2 border-dashed border-accent rounded-sm group-hover:bg-black/60 group-hover:text-white transition-all duration-150 ease-in-out cursor-pointer text-accent font-semibold opacity-0 hover:opacity-100 ${img ? 'opacity-0 hover:opacity-100' : "opacity-100"}`}>
                                    <Upload size={35}/>
                                    <p> {img ? `Edit Image ${index + 1}` : 'Upload A Product Image'} </p>
                                </label>

                                <input 
                                    type="file"
                                    className='hidden'
                                    id={`Product_Image_${index+1}`}
                                    name={`Product_Image_${index+1}`}
                                    accept='image/*'
                                    onChange={(e) => uploadImg(e,index)}
                                />

                                <div 
                                onClick={()=> handleRemoveImage(index)}
                                >
                                <X className={`text-white absolute right-2 top-1  bg-error rounded-full ${index > 0 ? 'block' : 'hidden'}`}/>
                                </div>
                            </div>
                        ))}

                        <label 
                            htmlFor="addNewImage"
                            className='relative h-48   text-center bg-gray-100 rounded-lg overflow-hidden shadow-md border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center group  hover:text-white'
                            style={{borderColor: '#97322D'}}
                        >
                            <Plus className='w-12 h-12 group-hover:scale-110 hover:text-white transition-transform duration-300' style={{color: '#97322D'}}/>
                            <p className='font-bold mt-2 group-hover:text-white' style={{color: '#97322D'}}>Add New Image</p>
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
    </div>
  )
}

export default ProductImages