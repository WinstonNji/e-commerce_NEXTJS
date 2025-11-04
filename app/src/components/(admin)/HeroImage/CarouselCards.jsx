"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pencil, Upload, Trash, Info } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { generateToast } from '@/lib/utils/toastGenerator'
import { useRouter } from 'next/navigation'
import { getBaseUrl } from '@/lib/utils/getBaseUrl'

function CarouselCards({carouselInfo}) {

    const router = useRouter()
    const baseUrl = getBaseUrl()

    // Fetching products for select
    const [products, setProducts] = useState([])

    const fetchCarousels = async () => {
        try {
            const result = await axios.get(`${baseUrl}/api/v1/admin/products`)

            if (!result.data.success){
                toast.error('Failed to fetch products')
                throw new Error(result.data.message || 'Failed to fetch products')
            } 

            const products = result.data.data
            setProducts(products)
            console.log(products, '*****products for select')
        } catch (error) {
            toast.error('An error occurred while fetching products')
            console.error('Error fetching products:', error)
        }
    }

    useEffect(() => {
        fetchCarousels()
    }, [])

// Creating a copy of initial data
    const [originalHero] = useState({
        id : carouselInfo.id,
        navigationLinkText : carouselInfo.navigationLinkText,
        imgSrc : carouselInfo.imgSrc,
        captionText : carouselInfo.captionText,
        mainText : carouselInfo.mainText,
        navigationLink : carouselInfo.navigationLink,
        display: carouselInfo.display ?? true
    })

    const [heroDetail, setHero] = useState({
        id : carouselInfo.id,
        navigationLinkText : originalHero.navigationLinkText,
        imgSrc : originalHero.imgSrc,
        captionText : originalHero.captionText,
        mainText : originalHero.mainText,
        navigationLink : originalHero.navigationLink,
        display: originalHero.display ?? true
    })

    const [imageFile, setImage] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [processing, setProcessing] = useState(false)

    const handleInput = (e) => {
        const { name, value } = e.target
        setHero(prev => ({ ...prev, [name]: value }))
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setHero(prev => ({
                ...prev,
                imgSrc : file
            }))
        }
    }

    const handleToggle = (e) => {
        const { checked } = e.target
        setHero(prev => ({ ...prev, display: checked }))
    }

    const handleCancel = () => {
        setIsEdit(false)
        setImage(null)
        setHero(originalHero)
    }

    const handleSave = async (carouselId) => {
        setIsEdit(false)

        if (!heroDetail.captionText.trim() || !heroDetail.mainText.trim() || !heroDetail.navigationLinkText.trim()) {
            toast.error('Please fill in all required fields')
            handleCancel()
            return
        }

        const formData = new FormData()

        formData.append('title',heroDetail.captionText)
        formData.append('description', heroDetail.mainText)
        formData.append('actionBtnText', heroDetail.navigationLinkText)
        formData.append('image', heroDetail.imgSrc)
        formData.append('targetProduct',heroDetail.navigationLink)
        formData.append('display', heroDetail.display)

        const loadingToastId = toast.loading('Updating Carousel, please wait...', {autoClose: false})
        setProcessing(true)
        try {
            const result = await axios.patch(`${baseUrl}/api/v1/admin/hero_carousel/${carouselId}`, formData)

            console.log(result)

            if(!result.data.success){
                generateToast(loadingToastId, result.data.message, 'error')
                handleCancel()
                return
            }

            generateToast(loadingToastId, result.data.message, 'success')
            router.refresh()
        } catch (error) {
            console.error(error)
            generateToast(loadingToastId, 'An error occured', 'error')
            handleCancel()
        } finally {
            setProcessing(false)
        }

        for(const [key,value] of formData.entries()){
            console.log(`key: ${key}, value: ${value}`)
        }

        console.log(heroDetail.imgSrc, '*****passed to backend')
    }

    const handleDelete = async (carouselId) => {
        const loadingToastId = toast.loading('Deleting Toast, please wait...')
        setProcessing(true)
        try {
            const result = await axios.delete(`${baseUrl}/api/v1/admin/hero_carousel/${carouselId}`)
            if(!result.data.success){
                generateToast(loadingToastId, result.data.message, 'error')
                return
            }
            generateToast(loadingToastId, result.data.message, 'success')
            router.refresh()
        } catch (error) {
            generateToast(loadingToastId, 'Ooops. An error occured', 'error')
        } finally {
            setProcessing(false)
        }
      
    }

    // Get display image source
    const displayImageSrc = imageFile ? URL.createObjectURL(imageFile) : heroDetail.imgSrc

  return (
    <div>
        <div className={`flex flex-col px-4 sm:px-8 duration-1000 ease-in-out w-full h-full transition-opacity md:flex-row-reverse md:items-center md:pl-12 lg:px-32 bg-secondary p-4 sm:p-8 rounded-2xl relative`}>

            <div onClick={()=> setIsEdit(true)} className={`absolute right-3 sm:right-5 top-3 sm:top-5 z-50 bg-accent p-2 rounded-full text-white hover:bg-accent-hover cursor-pointer ${isEdit ? 'hidden' : ''}`}>
                <Pencil className='w-5 h-5'/>
            </div>

            {/* Image Container */}
            <div className='w-full md:w-[700px] md:flex-1 mb-4 md:mb-0 md:ml-6'>
                <div className='relative w-full h-60 sm:h-80 bg-base-100/10 rounded-lg overflow-hidden'>
                    <Image 
                        src={displayImageSrc}
                        fill={true}
                        className='object-contain'
                        alt={`image for ${heroDetail.captionText}`}
                    />
                    
                    {isEdit && !imageFile && (
                        <label htmlFor={`uploadImg-${heroDetail.id}`} className='absolute inset-0 flex flex-col items-center justify-center hover:bg-black/60 hover:text-white transition-all duration-200 ease-in-out cursor-pointer bg-secondary/65'> 
                            <Upload className='w-8 h-8 sm:w-10 sm:h-10'/>
                            <p className='font-bold text-center px-4 text-sm sm:text-base mt-2'>Upload Product Image</p>
                            <input type="file" className='hidden' accept='image/*' id={`uploadImg-${heroDetail.id}`} onChange={handleFileUpload} />
                        </label>
                    )}
                </div>

                {/* Change Image Button */}
                {imageFile && isEdit && 
                    <div className='flex justify-center md:justify-end mt-3'>
                        <label htmlFor={`changeImage-${heroDetail.id}`} className='btn btn-accent btn-sm text-white'>
                            Change Image
                        </label>
                        <input type="file" className='hidden' accept='image/*' id={`changeImage-${heroDetail.id}`} onChange={handleFileUpload} />
                    </div>
                }
            </div>
            
            <div className='flex flex-col gap-2 w-full flex-1 md:gap-5 mt-4 md:mt-0 md:mr-6'>
                {/* Caption */}
                {!isEdit && 
                    <p className='text-white underline decoration-accent underline-offset-4 font-semibold text-sm sm:text-base'>{heroDetail.captionText}</p>
                }

                {isEdit && 
                    <input 
                        className='input w-full text-sm sm:text-base' 
                        type="text" 
                        name="captionText"
                        value={heroDetail.captionText}
                        onChange={handleInput}
                        required
                    />
                }
              
                {/* Main text */}
                {!isEdit && 
                    <p className='font-semibold text-sm sm:text-base lg:text-xl'>{heroDetail.mainText}</p>
                }

                {isEdit && 
                    <textarea 
                        name="mainText"
                        value={heroDetail.mainText}
                        onChange={handleInput}
                        className='textarea px-2 text-sm sm:text-base ring bg-white w-full'
                        rows="3"
                        required
                    />
                }
              
                {/* Button */}
                <div>
                    {!isEdit && 
                        <Link className='btn btn-accent text-white w-fit hover:bg-accent-hover hover:px-12 transition-all duration-150 ease-in-out text-sm sm:text-base' href={`product/${heroDetail.navigationLink}`}>
                            {heroDetail.navigationLinkText}
                        </Link>
                    }

                    {isEdit && 
                        <input 
                            className='input w-full text-sm sm:text-base' 
                            type="text"
                            name="navigationLinkText"
                            value={heroDetail.navigationLinkText}
                            onChange={handleInput}
                            required
                        />
                    }
                </div>

                {isEdit && (
                    <select 
                        className='select w-full text-sm sm:text-base' 
                        onChange={handleInput}
                        value={heroDetail.navigationLink}
                        name='navigationLink'
                        required
                    >
                        <option disabled value="">Link to a product</option>
                        {products.map((product, idx) => (
                            <option key={idx} value={product.id}>{product.title}</option>
                        ))}
                    </select>
                )}

                {/* Display Toggle */}
                {isEdit && (
                    <div className='mt-2'>
                        <div className='flex items-center justify-between p-3 bg-base-200 rounded-lg'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-xs sm:text-sm font-semibold text-accent'>Display on Storefront</h1>
                                <div className="tooltip tooltip-right" data-tip="Toggle to choose whether to display this carousel item on the storefront">
                                    <Info className='w-4 h-4 text-accent opacity-60' />
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                name='display'
                                checked={heroDetail.display}
                                className="toggle toggle-sm border-red-600 bg-red-500 checked:border-green-500 checked:bg-green-400"
                                onChange={handleToggle}
                                
                            />
                        </div>
                    </div>
                )}

                {isEdit && 
                    <div className='flex flex-col sm:flex-row justify-between mt-5 gap-2 sm:gap-4'>
                        <button disabled={processing} onClick={() => handleSave(heroDetail.id)} className='btn btn-sm sm:btn-md flex-1 btn-success text-xs sm:text-sm'>Save</button>
                        <button onClick={handleCancel} className='btn btn-sm sm:btn-md flex-1 btn-outline text-black hover:text-white hover:btn-error border text-xs sm:text-sm'>Cancel</button>
                        <button disabled={processing} onClick={()=> handleDelete(heroDetail.id)} className='btn btn-sm sm:btn-md flex-1 text-white btn-error text-xs sm:text-sm'><Trash className='w-4 h-4'/></button>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default CarouselCards