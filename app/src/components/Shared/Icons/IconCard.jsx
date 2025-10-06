"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Pencil } from 'lucide-react'
import { Upload } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import * as LucideIcons from 'lucide-react'
import { Trash } from 'lucide-react'

function IconCard({info, isAddIcon}) {

    const [isEdit, setEdit] = useState(false)
    const [imageUrl,setImageUrl] = useState(false)
    const [originalInfo] = useState({
        imgSrc : info.imgSrc,
        text: info.text
    })
    const [iconData,setIconData ] = useState(originalInfo)

    const isAdmin = usePathname().startsWith('/admin')

    useEffect(() => {
      setIconData(info)
    }, [info])
    

    const handleCancel = () => {
        setEdit(false)
        setIconData(originalInfo)
        setImageUrl(false)
    }

    const handleSave = () => {
        setEdit(false)
    }

    const handleChange = (value,type) => {
        if(type === 'text'){
            setIconData(prev => ({...prev, text:value}))
        }
    }

    const handleDelete = () => {
        // Add delete functionality here
    }    

    const IconComponent = LucideIcons[iconData?.imgSrc]

  return (
    <div 
        className='group flex items-center rounded-2xl px-4 py-4 shadow-lg hover:shadow-xl transition-all duration-300 border bg-border-secondary/20 hover:border-secondary hover:-translate-y-1 hover:bg-secondary/5 relative'
    >   
        {
            !isEdit && 

            <div onClick={()=> setEdit(true)} className={`absolute right-4 bg-accent p-2 text-white rounded-full cursor-pointer hover:bg-accent-hover ${isAdmin && !isAddIcon ? 'block' : 'hidden'}`}>
                <Pencil/>
            </div>
        }
        

        <div className='relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 mr-3  rounded-xl transition-colors duration-300 '>

        {IconComponent && !imageUrl ? (
            <IconComponent className='w-full h-full text-black bg-secondary/10 group-hover:scale-110 transition-transform duration-300 rounded-xl p-3' />
        ) : (
            <Image
                src={!imageUrl ? originalInfo.imgSrc : URL.createObjectURL(imageUrl)}
                fill={true}
                className='object-contain bg-secondary/10 group-hover:scale-110 transition-transform duration-300 rounded-xl'
                alt={iconData.text}
            />
        )
    
        }
        
        

        <input 
            onChange={(e) => setImageUrl(e.target.files[0])} 
            type="file" 
            name="" 
            id="uploadIcon" 
            className='hidden'
            accept='image/*'
            />

        {isEdit && !imageUrl && 
            <div className='absolute bg-secondary/80 right-0 left-0 top-0 bottom-0 flex items-center justify-center rounded-xl cursor-pointer z-20 hover:bg-accent'>
                <label htmlFor="uploadIcon">
                    <p><Upload /></p>
                </label>
            </div>
        }
        
        </div>
            
        <div className='flex-1 min-w-0'>
            {
                !isEdit && 

                <p className='text-xs sm:text-sm md:text-base font-semibold text-base-content leading-tight group-hover:text-accent transition-colors duration-300'>
                    {iconData.text}
                </p>

            }

            {isEdit && 
                <input 
                    type="text" 
                    name='text' 
                    onChange={(e) => handleChange(e.target.value, e.target.name)} className='flex-1 w-full input text-xs' 
                    value={iconData.text}
                    
                    />
            }

            {isEdit && 
                <div className='mt-4 flex gap-2'>
                    <button onClick={handleSave} className='text-xs text-white btn bg-success'>save</button>
                    <button onClick={handleCancel} className='text-xs text-white btn bg-error'>cancel</button>
                    <label htmlFor="uploadIcon"  className={`text-xs btn bg-info ${imageUrl ? '' : 'hidden'}`}>
                        Change Icon Image</label>
                    <button onClick={handleDelete} className='btn   text-white  btn-error'> <Trash/></button>
                </div>
            }
            
        </div>

        
    </div>
  )
}

export default IconCard