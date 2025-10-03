"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pencil, Upload } from 'lucide-react'
import { useState } from 'react'
import input from 'daisyui/components/input'
import { useEffect } from 'react'
import { Trash } from 'lucide-react'
import select from 'daisyui/components/select'
import { products } from '../../../../public/product'
import textarea from 'daisyui/components/textarea'

function CarouselCards({product}) {

    const [originalHero] = useState({
        navigationLinkText : product.navigationLinkText,
        imgSrc : product.imgSrc,
        captionText : product.captionText,
        mainText : product.mainText,
        navigationLink : product.navigationLink
    })

    const [heroDetail, setHero] = useState(originalHero)

    const [imageFile,setImage] = useState(false)

    console.log(imageFile)

    const [isEdit,setIsEdit] = useState(false)
    

    console.log(heroDetail)

    const handleCancel = () => {
        setIsEdit(false)
        setImage(false)
        setHero(originalHero)
    }

    const handleSave = () => {
        setIsEdit(false)
    }


    

    // useEffect(() => {

    // }, [])

  return (
    <div>
        <div className={`flex flex-col px-8 duration-1000 ease-in-out w-full h-full transition-opacity md:flex-row-reverse md:items-center md:pl-12 lg:px-32 bg-secondary p-8 rounded-2xl  relative`}>

            <div onClick={()=> setIsEdit(true)} className={`absolute right-5 top-5 z-50 bg-accent p-2 rounded-full text-white hover:bg-accent-hover cursor-pointer ${isEdit ? 'hidden' : ''}`}>
                <Pencil/>
            </div >

            {/* Image */}
            <div className='relative gap-4  md:w-[700px] h-80 md:flex-1'>
                
                <Image 
                    src={imageFile ? URL.createObjectURL(imageFile) : heroDetail.imgSrc}
                    fill={true}
                    className='object-contain'
                    alt={product.captionText}
                />
                

                {
                    isEdit && !imageFile && (
                        <label htmlFor="uploadImage" className='flex flex-1 absolute right-0 left-0 ring h-full justify-center items-center hover:bg-accent hover:text-white transition-all duration-200 ease-in-out cursor-pointer  md:ml-4 bg-secondary/65 flex-col'> 
                            <Upload/>
                            <p className='font-bold md:hidden lg:block text-center px-4'>Upload Product Image</p>
                            <input type="file"
                            name="" className='hidden' id="uploadImage" onChange={(e)=> setImage(e.target.files[0])} />
                        </label>
                    )
                }
            </div>

            {imageFile && 
                <div className='flex justify-end'>
                    <label htmlFor='uploadImage' className='btn btn-accent text-white mt-2'>
                        Change Image
                    </label>
                    <input type="file" name="" className='hidden' id="uploadImage" onChange={(e)=> setImage(e.target.files[0])} />
                </div>
            }
            

            <div className='flex flex-col gap-2  w-full flex-1 md:gap-5 mt-2'>
              {/* Caption */}
                {!isEdit && 
                
                <p className='text-white underline decoration-accent underline-offset-4 font-semibold'>{heroDetail.captionText}</p>
                
                }

                {isEdit && 
                    
                    <input className='input w-full' type="text" 
                    value={heroDetail.captionText}
                    onChange={(e) => setHero(prev => ({...prev, captionText:e.target.value }))}
                    />
                    
                }
              
              {/* Main text */}
                {
                    !isEdit && 
                    
                    <p className='font-semibold text-sm lg:text-xl'>{heroDetail.mainText}</p>
                }

                {
                    isEdit && 

                    <textarea 
                        defaultValue={heroDetail.mainText}
                        onChange={(e) => setHero(prev => ({...prev, mainText:e.target.value }))} name="" 
                        id=""
                        className='text-area px-2 text-sm ring bg-white textarea w-full'
                    >
                        
                    </textarea>

                    // <text 
                    //     className='input w-full' type="text" 
                    //     value={heroDetail.mainText}
                    //     onChange={(e) => setHero(prev => ({...prev, mainText:e.target.value }))}
                    // />
                }
              
              {/* Button */}
              <div>
                {
                    !isEdit && 
                    
                    <Link className='btn btn-accent text-white w-fit hover:bg-accent-hover hover:px-12 transition-all duration-150 ease-in-out' href={heroDetail.navigationLink}>
                        {heroDetail.navigationLinkText}
                    </Link>

                }

                {
                    isEdit && 

                    <input 
                        className=' input w-full' type="text" 
                        value={heroDetail.navigationLinkText}
                        onChange={(e) => setHero(prev => ({...prev, navigationLinkText:e.target.value }))}
                    />
                }
                
              </div>

            {
                isEdit && (
                    <select className='select w-full' onChange={(e) => setHero(prev => ({...prev, navigationLink : `/product/${e.target.value}`}))} >
                        <option value={heroDetail.navigationLink}>Link to a product</option>
                        {products.map((product,idx) => (
                            <option key={idx} value={product.id}>{product.title}</option>
                        ))}
                    </select>
                )
            }

              
            {
                isEdit && 
                <div className='flex  justify-between mt-5 gap-4'>
                    <button onClick={handleSave} className='btn flex flex-1 btn-success'>Save</button>

                    <button onClick={handleCancel} className='btn btn-wide flex flex-1 text-white  btn-error'>Cancel</button>

                    <button onClick={handleCancel} className='btn btn-wide flex flex-1 text-white  btn-error'> <Trash/></button>
                  </div>
            }

            </div>
        </div>

        
    </div>
  )
}

export default CarouselCards