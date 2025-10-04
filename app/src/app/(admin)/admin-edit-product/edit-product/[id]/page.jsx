"use client"
import React, { useState } from 'react'
import { products } from '../../../../../../public/product'
import { useParams } from 'next/navigation'
import ProductImages from '@/components/(admin)/EditProduct/ProductImages'
import BasicInformation from '@/components/(admin)/EditProduct/BasicInformation'
import ProductDetails from '@/components/(admin)/EditProduct/ProductDetails'


function Page() {
  // Fetching the Product
  const {id} = useParams()
  const product = products.find((product) => product.id === Number(id))

  console.log(product)

  // Fetching the Category
  const categoriesSet = new Set()

  products.forEach((product) => categoriesSet.add(product.category))


  // Initialising Images
  const [thumbnailImg, setThumbnailImg] = useState(false)
  const [images, setImages] = useState(product.images.map(() => false))

  const [originalProductData] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    discountPercentage: product.discountPercentage,
    brand: product.brand,
    category: product.category,
    weight: product.weight,
    sku: product.sku,
    width: product.dimensions.width,
    height: product.dimensions.height,
    depth: product.dimensions.depth,
    warrantyInformation: product.warrantyInformation,
    returnPolicy: product.returnPolicy
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
    returnPolicy: originalProductData.returnPolicy
  })

  

// Handlers
  const handleChangeSliderImg = (e,index) => {
    const file = e.target.files[0]
    if(!file) return

    setImages(prev => {
      const updatedArr = [...prev]
      updatedArr[index] = file
      return updatedArr
    }
    )
  }

  const handleAddNewImage = (e) => {
    const file = e.target.files[0]
    if(!file) return
    setImages(prev => [...prev, file])
    return
  }

  const handleRemoveImage = (indexToRemove) => {
    setImages(prev => {
      let newArr = [...prev]
      newArr = newArr.filter((_,index) => index !== indexToRemove )
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

  const handleCancel = () => {
    console.log(originalProductData, '---original')
    console.log(formData, '---edited productData')
    setFormData(originalProductData)
    setThumbnailImg(false)
    setImages(product.images.map(() => false))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form data:', formData)
    // Handle form submission here
  }

  return (
    <div className='min-h-screen p-6 mb-20 ' >
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8'>Edit Product</h2>
        
        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* Images Section */}
          <ProductImages  
            thumbnailImg={thumbnailImg}
            product={product}
            images={images}
            handleAddNewImage={handleAddNewImage}
            handleChangeSliderImg={handleChangeSliderImg}
            handleRemoveImage={handleRemoveImage}
            setThumbnailImg={setThumbnailImg} 
          />

          {/* Product Information Section */}
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
            <button type="submit" className='btn text-white btn-success' >Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page