"use client"
import ProductImages from '@/components/(admin)/AddProduct/ProductImages'
import ProductDetails from '@/components/(admin)/EditProduct/ProductDetails'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import BasicInformation from '@/components/(admin)/EditProduct/BasicInformation'
import { products } from '../../../../public/product'


function page() {


    // Initialising Images

    const [thumbnailImage,setThumbnailImg] = useState(false)
    const [images, setImages] = useState([Array.from(1)].map(()=> false))



    const handleThumbnailImg = (e) => {
        const file = e.target.files[0] 
        if(!file){
            return
        }
        setThumbnailImg(file)
    }

    const uploadImg = (e,index) => {
        const file = e.target.files[0]
        if(!file){
            return
        }
        setImages(prev => {
            const editedArr = [...prev]
            editedArr[index] = file
            return editedArr
        })
    }

    const handleAddNewImage = (e) => {
        
        const file = e.target.files[0]
        if(!file){
            return
        }
        setImages(prev => {
            if(images[0] === false){
                const editedArr = [...prev]
                editedArr[0] = file
                return editedArr
            }

            const newArr = [...prev]
            newArr.push(file)
            return newArr
        })
    }

    const handleRemoveImage = (index) => {
        setImages(prev => {
            let newArr = [...prev]
            newArr = newArr.filter((_,i) => i !== index)
            return newArr
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
      }

    // Fetching the Category
      const categoriesSet = new Set()
      products.forEach((product) => categoriesSet.add(product.category))


    const [originalProductData] = useState({
        title: "",
        description: "",
        price: "",
        discountPercentage: "",
        brand: "",
        category: "",
        weight: "",
        sku: "",
        width: "",
        height: "",
        depth: "",
        warrantyInformation: "",
        returnPolicy: ""
      })

      // Form state
      const [formData, setFormData] = useState({
        title: originalProductData.title,
        description: originalProductData.description,
        price: originalProductData.price,
        discountPercentage: originalProductData.discountPercentage,
        brand: originalProductData.brand,
        category: originalProductData.category,
        weight: originalProductData.weight,
        sku: originalProductData.sku,
        width: originalProductData.width,
        height: originalProductData.height,
        depth: originalProductData.depth,
        warrantyInformation: originalProductData.warrantyInformation,
        returnPolicy: originalProductData.returnPolicy,
        thumnailImg : thumbnailImage
      })

    const handleCancel = () => {
        console.log(originalProductData, '---original')
        console.log(formData, '---edited productData')
        setFormData(originalProductData)
        setThumbnailImg(false)
        setImages(product.images.map(() => false))
      }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formInfo = new formData()
        
        
        console.log('Form data:', formData)
        // Handle form submission here
    }

    return (
        <div className='min-h-screen mb-25'>
            {/* Image Section */}
            <form action="" className='flex flex-col gap-8'>
                <ProductImages
                    thumbnailImage = {thumbnailImage}
                    handleThumbnailImg = {handleThumbnailImg}
                    images = {images}
                    uploadImg = {uploadImg}
                    handleAddNewImage = {handleAddNewImage}
                    handleRemoveImage = {handleRemoveImage}
                />
            
                <BasicInformation 
                    formData = {formData}
                    handleInputChange = {handleInputChange}
                    categoriesSet = {categoriesSet}
                />

                  {/* Product Details Section */}
                <ProductDetails 
                    formData = {formData}
                    handleInputChange = {handleInputChange}
                />

                  {/* Action Buttons */}
                <div className='flex justify-end gap-4'>
                    <button type="button" className='btn btn-outline hover:btn-error' onClick={handleCancel} >Cancel</button>
                    <button type="submit" className='btn text-white btn-success' onClick={handleSubmit} >Create Product</button>
                </div>
            </form>
            
        </div>
    )
}

export default page