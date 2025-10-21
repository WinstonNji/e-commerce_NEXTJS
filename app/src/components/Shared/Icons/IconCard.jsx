"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Pencil, Upload, Trash, Info } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import * as LucideIcons from 'lucide-react'
import axios from 'axios'
import { generateToast } from '@/lib/utils/toastGenerator'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

function IconCard({info, isAddIcon}) {

    const router = useRouter()

    const [isEdit, setEdit] = useState(false)
    const [imageUrl,setImageUrl] = useState(null)

    const [originalInfo] = useState({
        trust_signal_icon : info.trust_signal_icon,
        trust_signal_text: info.trust_signal_text,
        display: info.display
    })
    const [iconData,setIconData ] = useState({
        id : info.id,
        trust_signal_icon : originalInfo.trust_signal_icon,
        trust_signal_text : originalInfo.trust_signal_text,
        display : originalInfo.display
    })

    const isAdmin = usePathname().startsWith('/admin')

    useEffect(() => {
      setIconData(info)
    }, [info])
    

    const handleCancel = () => {
        setEdit(false)
        setIconData(originalInfo)
        setImageUrl(null)
    }

    const handleSave = async (trustSignalId) => {
        setEdit(false)
        const formData = new FormData()

        for(const [key,value] of Object.entries(iconData)){
            if(key === 'trust_signal_icon' || key === 'display'){
                formData.append(key,value)
            }
            formData.append(key, value)
        }


        try {
            const loadingToastId = toast.loading('Saving changes, please wait...', {autoClose: false})
            const result = await axios.patch(`/api/v1/admin/trust_signals/${trustSignalId}`, formData)

            console.log(result)

            if(!result.data.success){
                generateToast(loadingToastId, result.data.message, 'error')
                return
            }
            generateToast(loadingToastId, result.data.message, 'success')
            router.refresh()
        } catch (error) {
            console.error(error)
            generateToast(loadingToastId, 'An error occured', 'error')
            handleCancel()
        }
    }

    const handleChange = (value,type) => {
        if(type === 'text'){
            setIconData(prev => ({...prev, trust_signal_text:value}))
        }
    }

    const handleUpload = (e) => {
        const file = e.target.files[0]
        if(!file){
            return
        }
        setImageUrl(file)
        setIconData(prev => ({ ...prev, trust_signal_icon: file }))
    }

    const handleToggle = (e) => {
        const {checked} = e.target
        setIconData(prev => ({ ...prev, display: checked }))
    }

    const handleDelete = async (trustSignalId) => {
        try {
            const loadingToastId = toast.loading('Deleting icon, please wait...', {autoClose: false})
            const result = await axios.delete(`/api/v1/admin/trust_signals/${trustSignalId}`)
            if(!result.data.success){
                generateToast(loadingToastId, result.data.message, 'error')
                return
            }
            generateToast(loadingToastId, result.data.message, 'success')
            router.refresh()
        } catch (error) {
            console.error(error)
            generateToast(loadingToastId, 'An error occured', 'error')
        }
       
    }    

    const IconComponent = LucideIcons[iconData?.trust_signal_icon]

  return (
    <div 
        className='group flex flex-col rounded-2xl px-4 py-4 shadow-lg hover:shadow-xl transition-all duration-300 border bg-border-secondary/20 hover:border-secondary hover:-translate-y-1 hover:bg-secondary/5 relative'
    >   
        {
            !isEdit && 

            <div onClick={()=> setEdit(true)} className={`absolute right-4 top-4 bg-accent p-2 text-white rounded-full cursor-pointer hover:bg-accent-hover ${isAdmin && !isAddIcon ? 'block' : 'hidden'}`}>
                <Pencil/>
            </div>
        }
        
        {/* Main content area */}
        <div className='flex items-center'>
            <div className='relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 mr-3 rounded-xl transition-colors duration-300'>

                {IconComponent && !imageUrl ? (
                    <IconComponent className='w-full h-full text-black bg-secondary/10 group-hover:scale-110 transition-transform duration-300 rounded-xl p-3' />
                ) : (
                    <Image
                        src={!imageUrl ? iconData.trust_signal_icon : URL.createObjectURL(imageUrl)}
                        fill={true}
                        className='object-contain bg-secondary/10 group-hover:scale-110 transition-transform duration-300 rounded-xl'
                        alt={iconData.trust_signal_text}
                    />
                )
            
                }
                
                <input 
                    onChange={handleUpload} 
                    type="file"  
                    id={`uploadIcon-${iconData.id}`} 
                    className='hidden'
                    accept='image/*'
                />

                {isEdit && !imageUrl && 
                    <div className='absolute bg-secondary/80 right-0 left-0 top-0 bottom-0 flex items-center justify-center rounded-xl cursor-pointer z-20 hover:bg-secondary/60'>
                        <label htmlFor={`uploadIcon-${iconData.id}`}>
                            <p><Upload /></p>
                        </label>
                    </div>
                }
            
            </div>
                
            <div className='flex-1 min-w-0'>
                {
                    !isEdit && 

                    <p className='text-xs sm:text-sm md:text-base font-semibold text-base-content leading-tight group-hover:text-accent transition-colors duration-300'>
                        {iconData.trust_signal_text}
                    </p>

                }

                {isEdit && 
                    <input 
                        type="text" 
                        name='text' 
                        onChange={(e) => handleChange(e.target.value, e.target.name)} 
                        className='flex-1 w-full input text-xs' 
                        value={iconData.trust_signal_text}
                    />
                }
            </div>
        </div>

        {/* Toggle Section - Only visible in edit mode */}
        {isEdit && 
            <div className='mt-4'>
                <div className='flex items-center justify-between p-3 bg-base-200 rounded-lg'>
                    <div className='flex items-center gap-2'>
                        <h1 className='text-sm font-semibold text-accent'>Display on Storefront</h1>
                        <div className="tooltip tooltip-right" data-tip="Toggle to choose whether to display this icon on the storefront">
                            <Info className='w-4 h-4 text-accent opacity-60' />
                        </div>
                    </div>
                    <input
                        type="checkbox"
                        name='display'
                        checked={iconData.display}
                        className="toggle toggle-sm border-red-600 bg-red-500 checked:border-green-500 checked:bg-green-400"
                        onChange={handleToggle}
                    />
                </div>
            </div>
        }

        {/* Action Buttons */}
        {isEdit && 
            <div className='mt-4 flex gap-2 flex-wrap'>
                <button onClick={() => handleSave(iconData.id)} className='text-xs text-white btn btn-sm bg-success flex-1'>Save</button>
                <button onClick={handleCancel} className='text-xs text-black btn btn-sm btn-outline hover:bg-error hover:text-white flex-1'>Cancel</button>
                <label htmlFor="uploadIcon" className={`text-xs btn btn-sm bg-info flex-1 ${imageUrl ? '' : 'hidden'}`}>
                    Change Icon
                </label>
                <button onClick={()=> handleDelete(iconData.id)} className='btn btn-sm text-white btn-error'>
                    <Trash className='w-4 h-4'/>
                </button>
            </div>
        }
    </div>
  )
}

export default IconCard