"use client"
import React, { useState } from 'react'
import IconPreviewCard from './IconPreviewCard'

import {
  ShoppingCart,
  ShoppingBag,
  CreditCard,
  User,
  Users,
  LogIn,
  LogOut,
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


function Newicon() {
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
        text: 'Insert Icon Text'
    })

    const [info, setInfo] = useState({
        imgSrc: originalIcon.imgSrc,
        text: originalIcon.text
    })

    const handleIcon = (iconName) => {
        setInfo(prev => ({ ...prev, imgSrc: iconName }))
    }

    const handleCancel = () => {
        setInfo(originalIcon)
    }

    const handleUpload = () => {
        // Add your upload logic here
        console.log('Uploading icon:', info)
    }

    return (
        <div className='relative pb-20 h-full'>
            <div className='flex items-center justify-center sticky top-0 backdrop-blur'>
                <div className='w-full lg:w-1/2 '>
                    <p className='font-bold mb-4 text-accent'>Preview</p>
                    {/* Previewing Icon */}
                    <IconPreviewCard info={info} />
                </div>
            </div>
            <hr className='mt-4' />

            <p className='mt-4 font-bold text-xl text-accent'>Select From Available Icons</p>

            <div className='w-full flex flex-wrap gap-4 justify-center mt-6'>
                {/* Showing all available Icons to choose from */}
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

            <p className='mt-4 font-bold text-xl text-accent'>Insert Icon Text</p>

            <div className='mt-4 w-full'>
                <input 
                    value={info.text}
                    onChange={(e) => setInfo(prev => ({ ...prev, text: e.target.value }))} 
                    className='input input-accent w-full outline-none focus:border-accent outline-accent' 
                    type="text" 
                    placeholder='Icon text' 
                    maxLength={35} 
                />
            </div>

            <div className='w-full lg:w-1/2 flex gap-4 px-3 absolute right-0 bottom-0 justify-start'>
                <button 
                    className='btn btn-success flex-1'
                    onClick={handleUpload}
                >
                    Upload Icon
                </button>
                <button 
                    className='btn btn-error flex-1'
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default Newicon