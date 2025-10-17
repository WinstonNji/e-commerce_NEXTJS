"use client"
import React, { useState } from 'react'
import CategoryPreviewCard from './CategoryPreviewCard'

function AddCategory() {

    const defaultInfo = {
        categoryImg : '/view-hawaiian-shirt-with-floral-print-leaf.jpg',
        categoryName : 'Fashion & Apparel',
        caption: 'Trending styles for every occasion'
    }

    const [info, setInfo] = useState({
        categoryImg : defaultInfo.categoryImg,
        categoryName : defaultInfo.categoryName,
        caption: defaultInfo.caption
        
    })

    const handleSubmit = () => {
        const FormData = new FormData()
        
    }

    const handleCancel = () => {
        setInfo(defaultInfo)
    }


    return (
    <div className='lg:flex flex-row-reverse gap-12'>
        {/* Preview Card */}
        <div className='flex-1'>
            <p className='font-bold text-accent text-lg text-center'>Preview</p>
            <div className='w-full flex items-center justify-center mt-2'>
                <CategoryPreviewCard category={info} />
            </div>
            <hr className='mt-4' />
        </div>
        

        <div className='flex flex-col flex-1 items-center  gap-4 '>
            {/* Inputs */}
            <div className='w-full flex flex-col items-center justify-center  h-full'>
                <div className='w-full '>
                    <p className='text text-lg mt-2 text-accent font-bold mf:text-2xl'>Insert Icon Title</p>
                    <p className='text-xs text-gray-00'>A short category title. i.e Fashion & Accessories</p>

                    <input 
                        type="text" 
                        placeholder='Category Name'
                        className='input mt-2 focus:input-accent w-full text-lg text-accent'
                        onChange={(e) => setInfo(prev => ({...prev, categoryName: e.target.value}))} 
                        required
                        value={info.categoryName}
                    />
                </div>

                <div className='w-full mt-5 '>
                    <p className='text text-lg mt-2 text-accent font-bold'>Insert Caption</p>
                    <p className='text-xs text-gray-00'>Category Caption i.e. Trending styles for every occasion</p>

                    <input 
                        type="text" 
                        placeholder='Category Caption'
                        className='input mt-4 focus:input-accent w-full'
                        onChange={(e) => setInfo(prev => ({...prev, caption: e.target.value}))} 
                        required
                        value={info.caption}
                    />
                </div>
                <hr className='my-4 text-gray-500' />

                 <div className='flex gap-4 w-full'>
                    <button 
                        className='btn btn-success w-1/2 '>Add Category</button>
                    <button 
                        onClick={handleCancel}
                        className='btn btn-error w-1/2'
                    >
                        Cancel</button>
                </div>
            </div>
            
            {/* Buttons */}
           
        </div>
        
        
        
        
        
    </div>
    )
}

export default AddCategory