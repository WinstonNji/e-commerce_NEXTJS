"use client"
import React, { useState, useEffect } from 'react'
import CategoryPreviewCard from './CategoryPreviewCard'
import axios from 'axios'
import { displayNoImageModal } from '@/lib/utils/noImageModal'
import { toast } from 'react-toastify'
import { generateToast } from '@/lib/utils/toastGenerator'
import { useRouter } from 'next/navigation'
import { getBaseUrl } from '@/lib/utils/getBaseUrl'

function AddCategory() {

    const router = useRouter()
    const [imageUrl, setImageUrl] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const baseUrl = getBaseUrl()
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        return () => {
            if (imageUrl && typeof imageUrl === 'object') {
                URL.revokeObjectURL(URL.createObjectURL(imageUrl))
            }
        }
    }, [imageUrl])

    const defaultInfo = {
        categoryImg : '/view-hawaiian-shirt-with-floral-print-leaf.jpg',
        categoryName : 'Fashion & Apparel',
        caption: 'Trending styles for every occasion',
        display : true
    }

    const [info, setInfo] = useState({
        categoryImg : defaultInfo.categoryImg,
        categoryName : defaultInfo.categoryName,
        caption: defaultInfo.caption,
        display : defaultInfo.display
    })

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if(!file){
            return
        }
        setImageUrl(file)
        setInfo(prev => ({
            ...prev,
            categoryImg : file
        })
        )

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const categoryData = new FormData()

        for(const [key,value] of Object.entries(info)){
            if(key==='categoryImg'){
                categoryData.append(key, value)
                continue
            }
            else if(typeof value === 'string'){
                categoryData.append(key,value.trim())
            }

        }

        if(!imageUrl){
            setShowDialog(true)
            return
        }

        const toastLoadingId = toast.loading('Creating Category', {autoClose: false})
        setProcessing(true)
        try {
            const response = await axios.post(`${baseUrl}/api/v1/admin/category`, categoryData)

            console.log(response, '**response')
            console.log(response.data, '**response.data')

            if(!response.data.success){
                generateToast(toastLoadingId,response.data.message + ". Category, doesn't exist already", 'error')
                return
            }

            generateToast(toastLoadingId,response.data.message, 'success')
            window.location.reload()
            handleCancel()
        } catch (error) {
            generateToast(toastLoadingId,'An error occured', 'error')
        }finally{
            setProcessing(false)
        }
    }

    const handleCancel = () => {
        setInfo(defaultInfo)
        setImageUrl(false)
    }

    const handleToggle = (e) => {
        const {name, checked} = e.target

        setInfo(prev => ({
            ...prev,
            [name]:checked
        }))
    }

    return (
    <div>

        {showDialog && (
            displayNoImageModal('No category Image', 'Please upload a category image to proceed', setShowDialog)
        )}

        <form onSubmit={handleSubmit} action="" className='lg:flex flex-row-reverse gap-12'>
            <div className='lg:w-1/2'>
                <p className='font-bold text-accent text-lg text-center'>Preview</p>
                <div className='w-full flex items-center justify-center mt-2'>
                    <CategoryPreviewCard 
                        category={info} 
                        imageUrl={imageUrl}
                        setImageUrl={setImageUrl}
                        handleImageUpload={handleImageUpload}
                    />
                </div>
                <hr className='mt-4' />
            </div>
                {/* Inputs */}
                <div className='flex flex-col flex-1 shrink-0 items-center gap-4 bg-red '>
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

                        <div className='w-full  '>
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

                        {/* Toggles */}
                        <div className='flex flex-col w-full mt-5'>
                            <div className='flex gap-2'>
                                <h1 className=' font-bold text-accent' >Display Category</h1>
                                <input
                                    type="checkbox"
                                    name='display'
                                    checked ={info.display}
                                    className="toggle border-red-600 bg-red-500 checked:border-green-500 checked:bg-green-400 checked:text-white"
                                    onChange={handleToggle}
                                    
                                />
                            </div>
                            <p className='text-gray-500 text-sm'>Show this category on the landing page and include its products in customer filters and searches.</p>
                        
                        </div>
                        <hr className='my-4 text-gray-500' />
                    </div>
                    
                    {/* Buttons */}
                     <div className='w-full flex gap-4  lg:flex-col '>
                        <button 
                            disabled = {processing}
                            type='submit'
                            className='btn btn-success w-1/2 lg:w-full'>
                                Add Category
                        </button>
                        <button
                            type='reset'
                            className='btn btn-error w-1/2 lg:w-full'
                            onClick={handleCancel}
                        >
                            Cancel</button>
                    </div>
                </div>
        </form>
        {/* Preview Card */}
        
    </div>
    )
}

export default AddCategory