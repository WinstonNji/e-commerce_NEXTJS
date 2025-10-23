"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Plus, Info } from 'lucide-react'

import axios from 'axios'
import { toast } from 'react-toastify'
import { generateToast } from '@/lib/utils/toastGenerator'

function AddHeroPage() {

    const [products, setProducts] = useState([])
    const [carouselImg, setCarouselImg] = useState(null)
    const [heroData, setHeroData] = useState({
        caption: '',
        mainText: '',
        actionText: '',
        productId: '',
        display: true
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setHeroData(prev => ({ ...prev, [name]: value }))
    }

    const handleToggle = (e) => {
        const { checked } = e.target
        setHeroData(prev => ({ ...prev, display: checked }))
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setCarouselImg(file)
        }
    }

    const fetchProducts = async () => {
        try {
            const result = await axios.get('/api/v1/admin/products')

            if (!result.data.success){
                toast.error('Failed to fetch products')
                throw new Error(result.data.message || 'Failed to fetch products')
            } 

            const products = result.data.data
            setProducts(products)
        } catch (error) {
            toast.error('An error occurred while fetching products')
            console.error('Error fetching products:', error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

  return (
<div className='flex flex-1 items-center justify-center'>     
    {/* Main Image */}
    <div className='w-full max-w-4xl space-y-6 sm:space-y-8 overflow-x-hidden'>
        {/* Header */}
        <div className='text-center mb-6 sm:mb-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-accent  mb-2'>Add Hero Carousel Item</h1>
            <p className='text-sm sm:text-base text-gray-500'>Configure your hero carousel slide content and appearance</p>
        </div>

        {/* Image Upload Section */}
        <div className='bg-secondary/20 p-4 sm:p-6 rounded-lg'>
            <h2 className='text-lg sm:text-xl font-semibold  mb-4 text-accent'>Hero Image</h2>
            <div>
                {!carouselImg ? (
                    <label className='flex flex-1 border-2 border-dashed border-secondary items-center justify-center h-48 sm:h-60 cursor-pointer rounded-lg hover:bg-accent hover:text-white hover:font-bold hover:border-accent transition-all ease-in-out duration-200' htmlFor="productImg">
                        <div className='w-full text-center flex flex-col items-center justify-center px-4'>
                            <Plus size={35}/>
                            <p className='mt-2 text-sm sm:text-base'>Upload Hero Image</p>
                        </div>
                    </label>
                ) : (
                    <div className='relative h-72  rounded-lg overflow-hidden border-2 border-secondary'>
                        <Image
                            src={URL.createObjectURL(carouselImg)}
                            alt="Hero preview"
                            fill
                            className='object-cover'
                        />
                        <label 
                            htmlFor="productImg" 
                            className='absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer'
                        >
                            <p className='text-white font-semibold'>Change Image</p>
                        </label>
                    </div>
                )}
                <input 
                    className='hidden' 
                    type="file" 
                    id="productImg" 
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>
        </div>

        {/* Form Section */}
        <div className='bg-secondary/20 p-4 sm:p-6 rounded-lg'>
            <h2 className='text-lg sm:text-xl font-semibold  mb-4 sm:mb-6 text-accent'>Content Details</h2>
            
            <div className='grid grid-cols-1 gap-4 sm:gap-6'>
                {/* Left Column */}
                <div className='space-y-4 sm:space-y-6'>
                    <div>
                        <label className='block text-sm font-medium  mb-2' htmlFor="caption">
                            Product Caption
                        </label>
                        <input 
                            id="caption"
                            name="caption"
                            value={heroData.caption}
                            onChange={handleInputChange}
                            className='input input-bordered input-secondary w-full focus:input-accent text-sm sm:text-base' 
                            type="text" 
                            placeholder='Enter Product Caption (e.g., Eyeshadow Palette with Mirror)' 
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium  mb-2' htmlFor="mainText">
                            Main Description
                        </label>
                        <textarea 
                            id="mainText"
                            name="mainText"
                            value={heroData.mainText}
                            onChange={handleInputChange}
                            className='textarea textarea-bordered textarea-secondary w-full focus:textarea-accent resize-none text-sm sm:text-base'
                            placeholder='Enter compelling description (e.g., Versatile eyeshadow shades for stunning eye looks, anywhere.)' 
                            rows="4"
                        ></textarea>
                    </div>

                    <div>
                        <label className='block text-sm font-medium  mb-2' htmlFor="actionText">
                            Action Button Text
                        </label>
                        <input 
                            id="actionText"
                            name="actionText"
                            value={heroData.actionText}
                            onChange={handleInputChange}
                            className='input input-bordered input-secondary w-full focus:input-accent text-sm sm:text-base'
                            type="text" 
                            placeholder='Enter Action Text (e.g., Shop Now, Buy Now)' 
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className='space-y-4 sm:space-y-6'>
                    <div>
                        <label className='block text-sm font-medium  mb-2' htmlFor="productSelect">
                            Select Product to Link
                        </label>
                        <select 
                            id="productSelect"
                            name="productId"
                            value={heroData.productId}
                            onChange={handleInputChange}
                            className="select select-bordered select-secondary w-full focus:select-accent text-sm sm:text-base"
                        >
                            <option value="">Pick a product</option>
                            {products.map((product,idx) => (
                                <option key={idx} value={product.id}>{product.title}</option>
                            ))}
                        </select>
                        <small className='block text-xs /60 mt-2'>
                            This will generate the link as: /product/{"{selected-id}"}
                        </small>
                    </div>

                    {/* Display Toggle */}
                    <div>
                        <label className='block text-sm font-medium  mb-2'>
                            Visibility Settings
                        </label>
                        <div className='flex items-center justify-between p-3 bg-base-200 rounded-lg'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-sm font-semibold text-accent'>Display on Storefront</h1>
                                <div className="tooltip tooltip-right" data-tip="Toggle to choose whether to display this carousel item on the storefront">
                                    <Info className='w-4 h-4 text-accent opacity-60' />
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                name='display'
                                checked={heroData.display}
                                className="toggle toggle-sm border-red-600 bg-red-500 checked:border-green-500 checked:bg-green-400"
                                onChange={handleToggle}
                            />
                        </div>
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