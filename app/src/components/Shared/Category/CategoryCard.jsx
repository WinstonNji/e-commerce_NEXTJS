"use client"
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Pencil, Trash, Upload } from 'lucide-react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { generateToast } from '@/lib/utils/toastGenerator'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Link from 'next/link'



function CategoryCard({info}) {
    const router = useRouter()

    const isAdmin = usePathname().includes('admin')
    const [isEdit, setIsEdit] = useState(false)
    const [previewUrl, setPreviewUrl] = useState(null)

    const [originalCategory] = useState({
        id : info.id,
        categoryImg : info.image,
        categoryName : info.title,
        caption : info.caption,
        display : info.display
    })

    const [category,setCategory] = useState({
        id : originalCategory.id,
        categoryImg : originalCategory.categoryImg,
        categoryName : originalCategory.categoryName,
        caption: originalCategory.caption,
        display : originalCategory.display
    })  

    const updateCategory = async (categoryId, formData) => {
        const loadingId = toast.loading('Updating Category, Please Wait.... ', {autoClose: false})
        try {
            const result = await axios.patch(`/api/v1/admin/category/${categoryId}`, formData)
            console.log(result, '***update category result')
            if(!result.data.success){
                generateToast(loadingId,result.data.message,'error')
                setCategory(originalCategory)
                return
            }
            generateToast(loadingId,result.data.message,'success')
            router.refresh()
        } catch (error) {
            console.error(error)
            generateToast(loadingId,'An error occured', 'error')
            return
        }
    }
    
    const handleCancel = () => {
        setIsEdit(false)
        setCategory(originalCategory)
        setPreviewUrl(null)
    }

    const handleInput = (e) => {
        const {name, value} = e.target
        setCategory(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const handleSave = (categoryId) => {
        setIsEdit(false)
        const formData = new FormData()
        for(const [key,value] of Object.entries(category)){
            formData.append(key,value)
        }
        updateCategory(categoryId,formData)
    }

    const handleDelete = async (categoryId) => {
        const loadingToastId = toast.loading('Deleting Category Please Wait..', {autoclose: 3000})
        try {
            const result = await axios.delete(`/api/v1/admin/category/${categoryId}`)

            if(!result.data.success){
                generateToast(loadingToastId, result.data.message,'error')
                return
            }

            generateToast(loadingToastId, result.data.message,'success')
            router.refresh()
        } catch (error) {
            console.error(error)
            generateToast(loadingToastId, 'An error occured','error')
        }
    
    }

    const handleFileUpload =  (e) => {
        const file = e.target.files[0]
        const name = e.target.name
        if(!file){
            return
        }
        
        if(previewUrl){
            URL.revokeObjectURL(previewUrl)
        }

        setPreviewUrl(URL.createObjectURL(file))

        setCategory(prev => ({
            ...prev,
            [name] : file
        }))

    }

    const handleToggle = (e) => {
        const {name, checked} = e.target
        setCategory(prev => ({
            ...prev,
            [name] : checked
        }))
    }


  return (
    <div className='relative '>
        <Link href={`/all-products?category=${category.categoryName}`}>
            <div 
                className='group ring rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl cursor-pointer'
            >
                <div onClick={()=> setIsEdit(true)} className={`absolute right-2 top-3 z-50 bg-accent p-2 rounded-full text-white hover:bg-accent-hover cursor-pointer ${isEdit || !isAdmin ? 'hidden' : ''}`}>
                    <Pencil/>
                </div >
                
                <div className='relative aspect-[4/3] bg-base-200 overflow-hidden'>
                    {isEdit && (
                        <label htmlFor={`imgUpload-${category.id}`} className='group'>
                            <div className={`flex flex-col absolute top-0 right-0 left-0 bottom-0 bg-secondary/50 z-10  items-center justify-center hover:bg-black/60 cursor-pointer transition-colors duration-150 ease-in-out `}>
                                <Upload size={50}  className='text-white group-hover:text-white' />
                                <p className='font-bold text-sm text-white '>Edit Category</p>
                            </div>

                            <input 
                                type="file" 
                                name="categoryImg" 
                                id={`imgUpload-${category.id}`} 
                                accept='image/*'
                                className='hidden'
                                onChange={handleFileUpload}
                            />
                        </label>
                        
                    )}
                

                    <Image 
                        fill={true}
                        src={previewUrl ? previewUrl : category.categoryImg}
                        alt={category.categoryName}
                        className='object-cover group-hover:scale-105 transition-all duration-300 ease-in-out rounded-t-2xl'
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300'></div>
                </div>
                <div className='px-4 pb-4 pt-3 bg-secondary/20 group-hover:bg-secondary/30 transition-colors h-full duration-300'>
                    {isEdit ? 
                        (
                            <div className='flex flex-col gap-2'>
                                <input 
                                    type="text" 
                                    placeholder='Enter Category Name' 
                                    value={category.categoryName} 
                                    name='categoryName'
                                    className='input focus:input-accent text-lg text-accent'
                                    onChange={handleInput}
                                />

                                <input 
                                    type="text" placeholder='Enter Category Caption' value={category.caption} 
                                    name='caption'
                                    className='input'
                                    onChange={handleInput}
                                />

                                <div className='flex flex-col w-full'>
                                    <div className='flex gap-2 '>
                                        <h1 className=' font-bold text-accent' >Display Category</h1>
                                        <div className="z-10 tooltip tooltip-bottom" data-tip="Toggle to choose whether to display this category on the storefront">
                                            <input
                                                type="checkbox"
                                                name='display'
                                                checked ={category.display}
                                                className="toggle border-red-600 bg-red-500 checked:border-green-500 checked:bg-green-400 checked:text-white"
                                                onChange={handleToggle}
                                            
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        ) : 
                        
                        (
                            <div>
                                <h4 className='font-bold text-lg text-base-content mb-1 group-hover:text-accent transition-colors duration-300  truncate'>
                                    {category.categoryName}
                                </h4>
                                <p className='text-base-content/70 text-sm leading-relaxed truncate'>
                                    {category.caption}
                                </p>
                            </div>
                        )

                
                    }

                    <div className={`flex flex-wrap lg:flex-row items-center gap-4 mt-4 ${!isEdit ? 'hidden' : 'block'}`}>
                        <button 
                            className='btn btn-success w-full'
                            onClick={() => handleSave(category.id)}
                        >Update</button>
                        <button 
                            className='btn btn-ghost btn-outline btn-error w-full' 
                            onClick={handleCancel}
                        >Cancel</button>
                        <button 
                            className='btn btn-error w-full'
                            onClick={() => handleDelete(category.id)}
                        >
                            <Trash/>
                        </button>
                    </div>
                    
                </div>
            </div>
        </Link>
    </div>
  )
}

export default CategoryCard