"use client"
import React, { useEffect, useState } from 'react'
import { products } from '../../../../../../public/product'
import { useParams } from 'next/navigation'
import ProductImages from '@/components/(admin)/EditProduct/ProductImages'
import BasicInformation from '@/components/(admin)/EditProduct/BasicInformation'
import ProductDetails from '@/components/(admin)/EditProduct/ProductDetails'
import { toast } from 'react-toastify'
import axios from 'axios'
import { generateToast } from '@/lib/utils/toastGenerator'
import { useContext } from 'react'
import { GeneralContext } from '@/context/generalContext'
import { getBaseUrl } from '@/lib/utils/getBaseUrl'

function Page() {
    const {id} = useParams()
    const [allBrands, setAllBrands] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const {fetchCategory,fetchBrands} = useContext(GeneralContext)
    const baseUrl = getBaseUrl()
    const [processing, setProcessing] = useState(false)

    const init = async() => {
      setLoading(true)
      try {
        const [fetchedCategories, fetchedBrands ] = await Promise.all([fetchCategory(), fetchBrands(), fetchSingleProduct(id)])
        setCategories(fetchedCategories)
        setAllBrands(fetchedBrands)
      } catch (error) {
        toast.error('An error Occured')
      } finally{
        setLoading(false)
      }
    }

    // Fetching the Product
    const [product,setProduct] = useState(null)
    const fetchSingleProduct = async(productId) => {
      try {
        const result = await axios.get(`${baseUrl}/api/v1/admin/products/${productId}`)
        if(!result.data.success){
          toast.error('An error occured')
        }
        const product = result.data.data
        setProduct(product)
        setOriginalProduct(product)
      } catch (error) {
        console.error(error)
        toast.error('An error occured, Please retry')
      }
    }
    
    useEffect(() => {
      init()
    }, [id])

    // Creating originalInstance of product
    const [originalProductData, setOriginalProduct] = useState({
      id : '',
      title: '',
      description: '',
      price: '',
      discountPercentage: 0,
      brand: '',
      category: '',
      weight: '',
      sku: '',
      width: '',
      height: '',
      depth: '',
      warrantyInformation: '',
      returnPolicy: '',
      is_featured : false,
      display : false,
      brandId : '',
      categoryId : '',
      inventory : '',
      thumbnailImg : ''
    })
    const [formData, setFormData] = useState({
      id : '',
      title: '',
      description: '',
      price: '',
      discount_percentage: 0,
      brand: '',
      category: '',
      weight: '',
      sku: '',
      width: '',
      height: '',
      depth: '',
      warrantyInformation: '',
      returnPolicy: '',
      is_featured : false,
      display : false,
      brand_id : '',
      category_id : '',
      inventory: '',
      thumbnailImg : ''
    })


    // Initialising Images
    const [thumbnailImg, setThumbnailImg] = useState(null)
    const [images, setImages] = useState([])

  useEffect(() => {
    if (!product) return;

    // set images
    if (product.images?.length) {
      setImages(product.images);
    }

    setFormData({
      id: product.id || '',
      title: product.title || '',
      description: product.description || 0,
      price: product.price || '',
      discountPercentage: product.discount_percentage || '', 
      brand: product.brand || '',
      category: product.category || '',
      weight: product.weight || '',
      sku: product.sku || '',
      width: product.width || '',
      height: product.height || '',
      depth: product.depth || '',
      warrantyInformation: product.warranty_info || '',
      returnPolicy: product.return_policy || '',
      is_featured: product.is_featured || false,
      display: product.display || false,
      brandId: product.brand_id || '',
      categoryId: product.category_id || '',
      inventory: product.inventory || '',
      thumbnailImg: product.thumbnail_img || ''
    });
  }, [product]);


  // Handlers
    const handleThumbnailImg = (e) => {
      const file = e.target.files[0]
      if(!file){
        return
      }
      setThumbnailImg(file)
      setFormData(prev => ({
        ...prev,
        thumbnailImg : file
      }))
    }

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
      setImages(prev => prev.filter((_, i) => i !== indexToRemove));
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    const handleCancel = () => {
      if (!product) return;

      setFormData({
        id: product.id || '',
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        discountPercentage: product.discount_percentage || '',
        brand: product.brand || '',
        category: product.category || '',
        weight: product.weight || '',
        sku: product.sku || '',
        width: product.width || '',
        height: product.height || '',
        depth: product.depth || '',
        warrantyInformation: product.warranty_info || '',
        returnPolicy: product.return_policy || '',
        is_featured: product.is_featured || false,
        display: product.display || false,
        brandId: product.brand_id || '',
        categoryId: product.category_id || '',
        inventory: product.inventory || '',
        thumbnailImg: product.thumbnail_img || '',
      });

      setThumbnailImg(null);
      setImages(product.images || []);   
    };

    console.log(images, '*****images****')
    const handleSubmit = async (e) => {
      e.preventDefault()

      // if(formData == originalProductData && !thumbnailImg || images == images ){
      //   toast.info('No changes to be saved')
      //   return
      // }

      const productData = new FormData()

      for(const [key,value] of Object.entries(formData)){
        productData.append(key,value)
      }

      images.forEach((image, index) => {
        if (image instanceof File) {
          // new image file
          productData.append('image', image);
        } else if (typeof image === 'string') {
          // existing Cloudinary URL that user did NOT delete
          productData.append('image', image);
        }
      });

      for(const [key,value] of productData.entries()){
        console.log(`key: ${key}, value:$${value}`)
      }

      // return

      const loadingToastId = toast.loading('Updating Task, please wait...')
      setProcessing(true)
      try {
        const result = await axios.patch(`${baseUrl}/api/v1/admin/products/${id}`, productData)

        if(result.data.isDemo){
          generateToast(loadingToastId, result.data.message, 'info')
          return 
        }

        if(!result.data.success){
          generateToast(loadingToastId, result.data.message, 'error')
          return 
        }

        generateToast(loadingToastId, result.data.message, 'success')
        init()
        setThumbnailImg(null)
        setImages([])
      } catch (error) {
        generateToast(loadingToastId, 'An error occured', 'error')
      } finally {
        setProcessing(false)
      }
    }

    const handleToggle = (e) => {
        const {name,checked} = e.target
        setFormData(prev => ({
            ...prev,
            [name] : checked
        }))

    }



    return (
      <div className='min-h-screen p-6 mb-20 ' >
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-gray-800 mb-8'>Edit Product</h2>
          {loading ? (
            <div className='flex flex-col gap-y-12'>
              <div>
                <h3 className='text-xl font-semibold mb-6 text-gray-800'>Product Images</h3>
                <div className="skeleton h-64"></div>
              </div>  
              
              <div>
                <h3 className='text-xl font-semibold mb-6 text-gray-800'>Basic Information</h3>
                <div className="skeleton h-64"></div>
              </div> 

              <div>
                <h3 className='text-xl font-semibold mb-6 text-gray-800'>Product Details</h3>
                <div className="skeleton h-64"></div>
              </div> 

              <div className='flex justify-end gap-4'>
                <button disabled type="button" className='btn btn-outline hover:btn-error' onClick={handleCancel} >Cancel</button>
                <button disabled type="submit" className='btn text-white btn-success' >Save Changes</button>
              </div>
            </div>
          ) : (
              <form onSubmit={handleSubmit} className='space-y-8'>
              {/* Images Section */}
              <ProductImages  
                thumbnailImg={thumbnailImg}
                productThumbnail={product?.thumbnail_img}
                images={images}
                productImages = {product?.images}
                handleAddNewImage={handleAddNewImage}
                handleChangeSliderImg={handleChangeSliderImg}
                handleRemoveImage={handleRemoveImage}
                handleThumbnailImg={handleThumbnailImg} 
              />

              {/* Toggle */}
              <div className='md:w-2/3 lg:w-2/3 '>
                  <div className='flex justify-between flex-col md:flex-row gap-4 '>
                      <div className='flex flex-col'>
                          <div className='flex gap-2 items-center'>
                              <h1 className=' font-semibold'>Display Product</h1>
                              <input
                                  type="checkbox"
                                  name='display'
                                  checked={formData.display}
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
                                      checked={formData.is_featured}
                                      className="toggle border-red-600 bg-red-500 checked:border-green-500 checked:bg-green-400 checked:text-white"
                                      onChange={handleToggle}
                                  />
                              </div>
                              <p className='text-gray-500 text-sm'>Toggle to choose if product should be displayed on front-page under Popular Products</p>
                          </div>
                            
                  </div>
              </div> 

              {/* Product Information Section */}
              <BasicInformation 
                formData = {formData}
                handleInputChange = {handleInputChange}
                categories = {categories}
                allBrands={allBrands}
              />

              {/* Product Details Section */}
              <ProductDetails 
                formData = {formData}
                handleInputChange = {handleInputChange}
              />

              {/* Action Buttons */}
              <div className='flex justify-end gap-4'>
                <button type="button" className='btn btn-outline hover:btn-error' onClick={handleCancel} >Cancel</button>
                <button disabled={processing} type="submit" className='btn text-white btn-success' >Save Changes</button>
              </div>
            </form>
          )}
          
        </div>
      </div>
  )
}

export default Page