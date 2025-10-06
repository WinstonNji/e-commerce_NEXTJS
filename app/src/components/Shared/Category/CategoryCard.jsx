"use client"
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Pencil, Trash, Upload } from 'lucide-react'
import { useState } from 'react'



function CategoryCard({info}) {

    const originalCategory = info

    const isAdmin = usePathname().includes('admin')
    const [isEdit, setIsEdit] = useState(false)

    const [category,setCategory] = useState({
        categoryImg : originalCategory.categoryImg,
        categoryName : originalCategory.categoryName,
        caption: originalCategory.caption
    })  

    const handleCancel = () => {
        setIsEdit(false)
        setCategory(originalCategory)
    }

    const handleSave = () => {
        setIsEdit(false)
    }


  return (
    <div className='relative'>
        <div 
            className='group ring rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl cursor-pointer'
        >

            <div onClick={()=> setIsEdit(true)} className={`absolute right-2 top-3 z-50 bg-accent p-2 rounded-full text-white hover:bg-accent-hover cursor-pointer ${isEdit || !isAdmin ? 'hidden' : ''}`}>
                <Pencil/>
            </div >
        
            <div className='relative aspect-[4/3] bg-base-200 overflow-hidden'>

                {isEdit && (
                    <label htmlFor="imgUpload" className='group'>
                        <div className={`absolute top-0 right-0 left-0 bottom-0 bg-secondary/50 z-10 flex items-center justify-center hover:bg-accent cursor-pointer transition-colors duration-150 ease-in-out `}>
                            <Upload size={50}  className='text-white group-hover:text-white' />
                        </div>

                        <input type="file" name="" id="imgUpload" accept='image/*'/>
                    </label>
                    
                )}
               

                <Image 
                    fill={true}
                    src={category.categoryImg}
                    alt={category.categoryName}
                    className='object-cover group-hover:scale-105 transition-all duration-300 ease-in-out'
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300'></div>
            </div>
            <div className='px-4 pb-4 pt-3 bg-secondary/20 group-hover:bg-secondary/30 transition-colors h-full duration-300'>
                {isEdit ? 
                    (
                        <div className='flex flex-col gap-2'>
                            <input 
                                type="text" placeholder='Enter Category Name' value={category.categoryName} 
                                className='input focus:input-accent text-lg text-accent'
                                onChange={(e)=> setCategory(prev => ({...prev, categoryName:e.target.value}))}
                            />

                            <input 
                                type="text" placeholder='Enter Category Caption' value={category.caption} 
                                className='input'
                                onChange={(e)=> setCategory(prev => ({...prev, caption:e.target.value}))}
                            />
                        </div>
                        
                    ) : 
                    
                    (
                        <div>
                            <h4 className='font-bold text-lg text-base-content mb-1 group-hover:text-accent transition-colors duration-300'>
                                {category.categoryName}
                            </h4>
                            <p className='text-base-content/70 text-sm leading-relaxed'>
                                {category.caption}
                            </p>
                        </div>
                    )
            
                }

                <div className={`flex items-center gap-4 mt-4 ${!isEdit ? 'hidden' : 'block'}`}>
                    <button 
                        className='btn btn-success'
                        onClick={handleSave}
                    >Update</button>
                    <button 
                        className='btn btn-error' 
                        onClick={handleCancel}
                    >Cancel</button>
                    <button className='btn btn-error' ><Trash/></button>
                </div>
                
            </div>

            
        </div>
    </div>
  )
}

export default CategoryCard