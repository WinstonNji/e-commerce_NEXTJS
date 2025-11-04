"use client"
import React, { useState } from 'react'
import IconPreviewCard from './IconPreviewCard'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
    ShoppingCart,
    ShoppingBag,
    CreditCard,
    User,
    Users,
    ShieldCheck,
    Lock,
    BadgeCheck,
    Truck,
    Package,
    MapPin,
    Headset,
    MessageCircle,
    Mail,
    Phone,
    Tag,
    Star,
    Gift,
    Search,
    Heart,
    DollarSign,    
    Percent,       
    Clock,          
    Calendar,        
    CheckCircle,    
    XCircle,        
    Bell,          
    Info,            
    AlertCircle,     
    Settings,        
} from "lucide-react"
import { generateToast } from '@/lib/utils/toastGenerator'
import { useRouter } from 'next/navigation'
import { getBaseUrl } from '@/lib/utils/getBaseUrl'

function Newicon() {

    const router = useRouter()
    const baseUrl = getBaseUrl()
    const [processing, setProcessing] = useState(false)

    const availableIcons = [
        ShoppingCart,
        ShoppingBag,
        CreditCard,
        User,
        Users,
        ShieldCheck,
        Lock,
        BadgeCheck,
        Truck,
        Package,
        MapPin,
        Headset,
        MessageCircle,
        Mail,
        Phone,
        Tag,
        Star,
        Gift,
        Search,
        Heart,
        DollarSign,
        Percent,
        Clock,
        Calendar,
        CheckCircle,
        XCircle,
        Bell,
        Info,
        AlertCircle,
        Settings
    ]

    const [originalIcon] = useState({
        imgSrc: 'ShoppingCart',
        text: 'Insert Icon Text',
        display : true
    })

    const [info, setInfo] = useState({
        imgSrc: originalIcon.imgSrc,
        text: originalIcon.text.trim(),
        display : originalIcon.display
    })

    const handleIcon = (iconName) => {
        setInfo(prev => ({ ...prev, imgSrc: iconName }))
    }

    const handleToggle = (e) => {
        const {checked} = e.target
        setInfo(prev => ({ ...prev, display: checked }))
    }

    const handleCancel = () => {
        setInfo(originalIcon)
    }

    const handleUpload = async () => {

        if(info.text.trim().length === 0 || info.text === 'Insert Icon Text'){
            toast.error('Icon text cannot be empty')
            return
        }

        try{
            setProcessing(true)
            const loadingToastId = toast.loading('Uploading Icon, please wait...', {autoClose: false})
            const result = await axios.post(`${baseUrl}/api/v1/admin/trust_signals`, info)
            console.log(result, '***icon upload result')
            if(!result.data.success){
                generateToast(loadingToastId, result.data.message, 'error')
                return
            }
            generateToast(loadingToastId, result.data.message, 'success')
            router.refresh()
            handleCancel()
        }catch(error){
            generateToast(loadingToastId, 'An error occured',  'error')
        }finally{
            setProcessing(false)
        }
        
    }

    return (
        <div className='relative pb-20 h-full overflow-x-hidden'>
            {/* Preview Section */}
            <div className='flex items-center justify-center sticky top-0 backdrop-blur z-10'>
                <div className='w-full lg:w-1/2'>
                    <p className='font-bold mb-4 text-accent'>Preview</p>
                    <IconPreviewCard info={info} />
                </div>
            </div>
            
            <hr className='mt-4' />

            {/* Icon Selection Section */}
            <div className='mt-6'>
                <p className='font-bold text-xl text-accent mb-6'>Select From Available Icons</p>
                <div className='w-full flex flex-wrap gap-4 justify-center'>
                    {availableIcons.map((Icon, idx) => {
                        const iconName = Icon.render.displayName
                        return (
                            <div 
                                key={idx} 
                                className={`bg-secondary p-4 hover:bg-accent-hover cursor-pointer group rounded-lg transition-all ${
                                    info.imgSrc === iconName ? 'ring-2 ring-accent' : ''
                                }`}
                                onClick={() => handleIcon(iconName)}
                            >
                                <Icon className='group-hover:text-white' />
                            </div>
                        )
                    })}
                </div>
            </div>

            <hr className='mt-8 mb-6' />

            {/* Icon Text and Display Toggle Section */}
            <div className='max-w-2xl mx-auto space-y-6'>
                {/* Icon Text Input */}
                <div className='w-full'>
                    <p className='font-bold text-xl text-accent mb-3'>Insert Icon Text</p>
                    <input 
                        value={info.text}
                        onChange={(e) => setInfo(prev => ({ ...prev, text: e.target.value }))} 
                        className='input input-accent w-full outline-none focus:border-accent' 
                        type="text" 
                        placeholder='Icon text' 
                        maxLength={35} 
                    />
                </div>

                {/* Display Toggle */}
                <div className='w-full'>
                    <div className='flex items-center justify-between p-4 bg-base-200 rounded-lg'>
                        <div className='flex items-center gap-3'>
                            <h1 className='font-bold text-accent'>Display on Storefront</h1>
                            <div className="tooltip tooltip-right" data-tip="Toggle to choose whether to display this icon on the storefront">
                                <Info className='w-4 h-4 text-accent opacity-60' />
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            name='display'
                            checked={info.display}
                            className="toggle border-red-600 bg-red-500 checked:border-green-500 checked:bg-green-400"
                            onChange={handleToggle}
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='max-w-2xl mx-auto flex gap-4 mt-8'>
                <button 
                    disabled={processing}
                    className='btn btn-success flex-1'
                    onClick={handleUpload}
                >
                    Upload Icon
                </button>
                <button 
                    className='btn btn-outline hover:btn-error flex-1'
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default Newicon