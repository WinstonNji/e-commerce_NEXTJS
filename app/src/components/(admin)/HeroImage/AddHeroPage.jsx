"use client"
import React from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { products } from '../../../../public/product'

function AddHeroPage() {
  return (
<div className=' flex flex-1 items-center justify-center '>     
    {/* Main Image */}
    <div className='w-full max-w-4xl space-y-6 sm:space-y-8'>
        {/* Header */}
        <div className='text-center mb-6 sm:mb-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-base-content mb-2'>Add Hero Carousel Item</h1>
            <p className='text-sm sm:text-base text-base-content/70'>Configure your hero carousel slide content and appearance</p>
        </div>

        {/* Image Upload Section */}
        <div className='bg-secondary/20 p-4 sm:p-6 rounded-lg'>
            <h2 className='text-lg sm:text-xl font-semibold text-base-content mb-4'>Hero Image</h2>
            <div>
                <label className='flex flex-1 border-2 border-dashed border-secondary items-center justify-center h-48 sm:h-60 cursor-pointer rounded-lg hover:bg-accent hover:text-white hover:font-bold hover:border-accent transition-all ease-in-out duration-200' htmlFor="productImg">
                    <div className='w-full text-center flex flex-col items-center justify-center px-4'>
                        <Plus size={35}/>
                        <p className='mt-2 text-sm sm:text-base'>Upload Hero Image</p>

                    </div>
                </label>
                <input className='hidden' type="file" id="productImg" accept="image/*" />
            </div>
        </div>

        {/* Form Section */}
        <div className='bg-secondary/20 p-4 sm:p-6 rounded-lg'>
            <h2 className='text-lg sm:text-xl font-semibold text-base-content mb-4 sm:mb-6'>Content Details</h2>
            
            <div className='grid grid-cols-1 gap-4 sm:gap-6'>
                {/* Left Column */}
                <div className='space-y-4 sm:space-y-6'>
                    <div>
                        <label className='block text-sm font-medium text-base-content mb-2' htmlFor="caption">
                            Product Caption
                        </label>
                        <input 
                            id="caption"
                            className='input input-bordered input-secondary w-full focus:input-accent text-sm sm:text-base' 
                            type="text" 
                            placeholder='Enter Product Caption (e.g., Eyeshadow Palette with Mirror)' 
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-base-content mb-2' htmlFor="mainText">
                            Main Description
                        </label>
                        <textarea 
                            id="mainText"
                            className='textarea textarea-bordered textarea-secondary w-full focus:textarea-accent resize-none text-sm sm:text-base'
                            placeholder='Enter compelling description (e.g., Versatile eyeshadow shades for stunning eye looks, anywhere.)' 
                            rows="4"
                        ></textarea>
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-base-content mb-2' htmlFor="actionText">
                            Action Button Text
                        </label>
                        <input 
                            id="actionText"
                            className='input input-bordered input-secondary w-full focus:input-accent text-sm sm:text-base'
                            type="text" 
                            placeholder='Enter Action Text (e.g., Shop Now, Buy Now)' 
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className='space-y-4 sm:space-y-6'>

                    <div>
                        <label className='block text-sm font-medium text-base-content mb-2' htmlFor="productSelect">
                            Select Product to Link
                        </label>
                        <select 
                            id="productSelect"
                            defaultValue="Pick a product" 
                            className="select select-bordered select-secondary w-full focus:select-accent text-sm sm:text-base"
                        >
                            <option disabled={true}>Pick a product</option>
                            {products.map((product,idx) => (
                                <option key={idx} value={product.id}>{product.title}</option>
                            ))}
                        </select>
                        <small className='block text-xs text-base-content/60 mt-2'>
                            This will generate the link as: /product/{"{selected-id}"}
                        </small>
                    </div>

                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col gap-3 sm:flex-row sm:gap-4 justify-end pt-4 sm:pt-6'>
            <button className='btn btn-accent text-white w-full sm:w-auto order-1 sm:order-2'>
                Publish Carousel Item
            </button>
        </div>
    </div>
</div>
  )
}

export default AddHeroPage