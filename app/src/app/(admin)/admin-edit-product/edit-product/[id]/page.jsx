"use client"
import React, { useState } from 'react'
import { products } from '../../../../../../public/product'
import Image from 'next/image'
import { Upload, Plus } from 'lucide-react'
import { useParams } from 'next/navigation'

function Page() {
  const {id} = useParams()
  const product = products.find((product) => product.id === Number(id))

  const [thumbnailImg, setThumbnailImg] = useState(false)

  const sliderImgObject = {}
  product.images.forEach((image, index) => {
    sliderImgObject[index] = false
  })

  const [image, setImages] = useState(sliderImgObject)
  const [newImages, setNewImages] = useState([])

  // Form state
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    discountPercentage: product.discountPercentage,
    brand: product.brand,
    color: product.color,
    category: product.category,
    weight: product.weight,
    sku: product.sku,
    width: product.dimensions.width,
    height: product.dimensions.height,
    depth: product.dimensions.depth,
    warrantyInformation: product.warrantyInformation,
    returnPolicy: product.returnPolicy
  })

  const handleAddNewImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setNewImages(prev => [...prev, file])
    }
  }

  const handleRemoveNewImage = (indexToRemove) => {
    setNewImages(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form data:', formData)
    // Handle form submission here
  }

  return (
    <div className='min-h-screen p-6' style={{backgroundColor: '#fffbf0'}}>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8'>Edit Product</h2>
        
        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* Images Section */}
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <h3 className='text-xl font-semibold mb-6 text-gray-800'>Product Images</h3>
            <div className='flex flex-col lg:flex-row gap-6'>
              
              {/* Thumbnail Image */}
              <div className='flex-shrink-0'>
                <p className='text-sm font-medium mb-3 text-gray-600'>Thumbnail Image</p>
                <div className='relative h-80 w-full lg:w-96 bg-gray-100 rounded-lg overflow-hidden shadow-md'>
                  <Image 
                    fill
                    src={!thumbnailImg ? product.thumbnail : URL.createObjectURL(thumbnailImg)}
                    className='object-contain'
                    alt='Product thumbnail'
                  />

                  <label 
                    htmlFor="thumbnailImage" 
                    className='absolute inset-0 flex flex-col justify-center items-center bg-black/0 hover:bg-black/60 transition-all duration-300 ease-in-out cursor-pointer group'
                  > 
                    <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center text-white'>
                      <Upload className='w-8 h-8 mb-2'/>
                      <p className='font-bold text-center px-4'>Edit Thumbnail</p>
                    </div>
                    <input 
                      type="file"
                      className='hidden' 
                      id="thumbnailImage" 
                      accept="image/*"
                      onChange={(e) => setThumbnailImg(e.target.files[0])} 
                    />
                  </label>
                </div>
              </div>

              {/* Slider Images */}
              <div className='flex-1'>
                <p className='text-sm font-medium mb-3 text-gray-600'>Slider Images</p>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                  
                  {product.images.map((img, index) => (
                    <div 
                      key={index} 
                      className='relative h-48 bg-gray-100 rounded-lg overflow-hidden shadow-md'
                    >
                      <Image 
                        fill
                        src={!image[index] ? img : URL.createObjectURL(image[index])}
                        className='object-contain'
                        alt={`Product image ${index + 1}`}
                      />
                      
                      <label 
                        htmlFor={`uploadImage${index}`} 
                        className='absolute inset-0 flex flex-col justify-center items-center bg-black/0 hover:bg-black/60 transition-all duration-300 ease-in-out cursor-pointer group'
                      > 
                        <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center text-white'>
                          <Upload className='w-6 h-6 mb-1'/>
                          <p className='font-bold text-sm text-center px-2'>Edit Image {index + 1}</p>
                        </div>
                        <input 
                          type="file"
                          className='hidden' 
                          id={`uploadImage${index}`}
                          accept="image/*"
                          onChange={(e) => setImages(prev => ({...prev, [index]: e.target.files[0]}))} 
                        />
                      </label>
                    </div>
                  ))}

                  {newImages.map((newImg, index) => (
                    <div 
                      key={`new-${index}`} 
                      className='relative h-48 bg-gray-100 rounded-lg overflow-hidden shadow-md group'
                    >
                      <Image 
                        fill
                        src={URL.createObjectURL(newImg)}
                        className='object-contain'
                        alt={`New image ${index + 1}`}
                      />
                      
                      <button
                        type="button"
                        onClick={() => handleRemoveNewImage(index)}
                        className='absolute top-2 right-2 px-3 py-1 rounded-full text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                        style={{backgroundColor: '#97322D'}}
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <label 
                    htmlFor="addNewImage"
                    className='relative h-48 bg-gray-100 rounded-lg overflow-hidden shadow-md border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center group'
                    style={{borderColor: '#97322D'}}
                  >
                    <Plus className='w-12 h-12 group-hover:scale-110 transition-transform duration-300' style={{color: '#97322D'}}/>
                    <p className='font-bold mt-2' style={{color: '#97322D'}}>Add New Image</p>
                    <input 
                      type="file"
                      className='hidden' 
                      id="addNewImage"
                      accept="image/*"
                      onChange={handleAddNewImage}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information Section */}
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <h3 className='text-xl font-semibold mb-6 text-gray-800'>Basic Information</h3>
            <div className='space-y-6'>
              
              {/* Title */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-medium'>Product Title</span>
                </label>
                <input 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className='input input-bordered w-full'
                  required
                />
              </div>

              {/* Description */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-medium'>Description</span>
                </label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className='textarea textarea-bordered h-24'
                  required
                />
              </div>

              {/* Price and Discount */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text font-medium'>Price ($)</span>
                  </label>
                  <input 
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    className='input input-bordered'
                    required
                  />
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text font-medium'>Discount Percentage (%)</span>
                  </label>
                  <input 
                    type="number"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleInputChange}
                    step="0.01"
                    className='input input-bordered'
                  />
                </div>
              </div>

              {/* Brand, Color, Category */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text font-medium'>Brand</span>
                  </label>
                  <input 
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className='input input-bordered'
                  />
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text font-medium'>Color</span>
                  </label>
                  <input 
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className='input input-bordered'
                  />
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text font-medium'>Category</span>
                  </label>
                  <input 
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className='input input-bordered'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <h3 className='text-xl font-semibold mb-6 text-gray-800'>Product Details</h3>
            <div className='space-y-6'>
              
              {/* Weight and SKU */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text font-medium'>Weight</span>
                  </label>
                  <input 
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    step="0.01"
                    className='input input-bordered'
                  />
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text font-medium'>SKU</span>
                  </label>
                  <input 
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className='input input-bordered'
                  />
                </div>
              </div>

              {/* Dimensions */}
              <div>
                <label className='label'>
                  <span className='label-text font-medium'>Dimensions</span>
                </label>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div className='form-control'>
                    <input 
                      type="number"
                      name="width"
                      value={formData.width}
                      onChange={handleInputChange}
                      placeholder="Width"
                      step="0.01"
                      className='input input-bordered'
                    />
                  </div>

                  <div className='form-control'>
                    <input 
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="Height"
                      step="0.01"
                      className='input input-bordered'
                    />
                  </div>

                  <div className='form-control'>
                    <input 
                      type="number"
                      name="depth"
                      value={formData.depth}
                      onChange={handleInputChange}
                      placeholder="Depth"
                      step="0.01"
                      className='input input-bordered'
                    />
                  </div>
                </div>
              </div>

              {/* Warranty Information */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-medium'>Warranty Information</span>
                </label>
                <textarea 
                  name="warrantyInformation"
                  value={formData.warrantyInformation}
                  onChange={handleInputChange}
                  className='textarea textarea-bordered'
                />
              </div>

              {/* Return Policy */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-medium'>Return Policy</span>
                </label>
                <textarea 
                  name="returnPolicy"
                  value={formData.returnPolicy}
                  onChange={handleInputChange}
                  className='textarea textarea-bordered'
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-4'>
            <button type="button" className='btn btn-outline hover:btn-error'>Cancel</button>
            <button type="submit" className='btn text-white btn-success' >Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page