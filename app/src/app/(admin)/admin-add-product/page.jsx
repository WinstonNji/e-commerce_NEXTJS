"use client"
import ProductImages from '@/components/(admin)/AddProduct/ProductImages'
import ProductDetails from '@/components/(admin)/EditProduct/ProductDetails'
import React, { useEffect } from 'react'
import { useState } from 'react'
import BasicInformation from '@/components/(admin)/EditProduct/BasicInformation'
import { toast } from 'react-toastify'


function page() {


    // Initialising Images

    const [thumbnailImage,setThumbnailImg] = useState(false)
    const [images, setImages] = useState([false])
    const [categories, setCategories] = useState([])
    const [allBrands, setAllBrands] = useState([])
    const [showDialog, setShowDialog] = useState(false)


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await fetch('/api/v1/admin/category')
                if(!res.ok){
                    throw new Error('Failed to create new product')
                }
                const result = await res.json()
                let categories = result.data
                setCategories(categories)
            } catch (error) {
                console.error(error)
            }
        }

        const fetchBrands = async () => {
            try {
                const res = await fetch('/api/v1/general/brand')
                if(!res.ok){
                    throw new Error("An error occured, couldn't fetch brands")
                }
                const result = await res.json()
                if(!result){
                    throw new Error("Couldn't get brands")
                }

                console.log(result.data, '***brands fetched')

                setAllBrands(result.data)

            } catch (error) {
                console.error(error)
            }
        }
        
        fetchCategory()
        fetchBrands()
    }, [])

    const handleThumbnailImg = (e) => {
        const file = e.target.files[0] 
        if(!file){
            return
        }
        console.log(file, '******file')
        setThumbnailImg(file)
        setProductInfo(prev => ({
            ...prev,
            thumbnailImg : file
        }))
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
        setProductInfo(prev => ({
          ...prev,
          [name]: value
        }))
      }

    const handleToggle = (e) => {
        const {name,checked} = e.target
        alert(checked)

        setProductInfo(prev => ({
            ...prev,
            [name] : checked
        }))

    }

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
        returnPolicy: "",
        display: true,
        is_featured : false,
        inventory : 50
    })

      // Form state
    const [productInfo, setProductInfo] = useState({
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
        thumbnailImg : thumbnailImage,
        display : originalProductData.display,
        is_featured : originalProductData.is_featured,
        inventory : originalProductData.inventory
    })

    const handleCancel = () => {
        setProductInfo(originalProductData)
        setThumbnailImg(false)
        setImages([false])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!thumbnailImage){
            setShowDialog(true)
            return
        }

        if(images.length === 0 || images[0] === false){
            setShowDialog(true)
            return
        }
        
        const formData = new FormData()

        // Appending  Product Values
        for(const [key,value] of Object.entries(productInfo)){
            formData.append(key,value) 
        }

        // Appending Product Images
        for(const image of images){
            formData.append('image', image)
        }     

        const loading = toast.loading('Creating Product...', {autoClose:false})
        try {
            const response = await fetch('api/v1/admin/products', {
                method : 'POST',
                body : formData
            })
            
            if(!response.ok) throw new Error('Failed to create product')
            
            const result = await response.json()

            if(!result){
                toast.update(loading, {
                    render : result.message,
                    type : "error",
                    isLoading : false
                })
            }

            toast.update(loading, {
                render: result.message,
                type: 'success',
                autoClose : 4000,
                isLoading : false
            })
            
        } catch (error) {
            toast.update(loading, {
                render : error,
                type : "error",
                isLoading : false
            })
        }finally{
            setProductInfo(originalProductData)
            setThumbnailImg(false)
            setImages([false])
        }
    }

    return (
        <div className='min-h-screen mb-25'>

            {showDialog && (
              <dialog open className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Missing Thumbnail or Product Image</h3>
                  <p className="py-4">Please upload a thumbnail image and atleast one product image before creating product.</p>
                  <div className="modal-action">
                    <button className="btn btn-outline hover:btn-error" onClick={() => setShowDialog(false)}>
                      Close
                    </button>
                  </div>
                </div>
              </dialog>
            )}

            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                {/* Image Section */}
                <ProductImages
                    thumbnailImage = {thumbnailImage}
                    handleThumbnailImg = {handleThumbnailImg}
                    images = {images}
                    uploadImg = {uploadImg}
                    handleAddNewImage = {handleAddNewImage}
                    handleRemoveImage = {handleRemoveImage}
                />

                {/* Toggles */}
                <div className='md:w-2/3 lg:w-2/3 '>
                    <div className='flex justify-between flex-col md:flex-row gap-4 '>
                        <div className='flex flex-col'>
                            <div className='flex gap-2 items-center'>
                                <h1 className=' font-semibold'>Display Product</h1>
                                <input
                                    type="checkbox"
                                    name='display'
                                    checked ={productInfo.display}
                                    className="toggle border-red-600 bg-red-500 checked:border-green-500 checked:bg-green-400 checked:text-white"
                                    onChange={handleToggle}
                                />
                            </div>
                            <p className='text-gray-500 text-sm'>Toggle to choose if product should be displayed</p>
                        
                        </div>
                            <div>
                                <div className='flex gap-2 items-center'>
                                    <h1 className='font-semibold'>Feature product on front page</h1>
                                    <input
                                        type="checkbox"
                                        name='is_featured'
                                        className="toggle border-red-600 bg-red-500 checked:border-green-500 checked:bg-green-400 checked:text-white"
                                        onChange={handleToggle}
                                    />
                                </div>
                                <p className='text-gray-500 text-sm'>Toggle to choose if product should be displayed on front-page under Popular Products</p>
                            </div>
                        
                    </div>
                </div> 
            
                <BasicInformation 
                    formData = {productInfo}
                    handleInputChange = {handleInputChange}
                    categories = {categories}
                    allBrands = {allBrands}
                />

                  {/* Product Details Section */}
                <ProductDetails 
                    formData = {productInfo}
                    handleInputChange = {handleInputChange}
                />

                  {/* Action Buttons */}
                <div className='flex justify-end gap-4'>
                    <button type='reset' className='btn btn-outline hover:btn-error' onClick={handleCancel} >Cancel</button>
                    <button type="submit" className='btn text-white btn-success'>Create Product</button>
                </div>
            </form>
        </div>
    )
}

export default page