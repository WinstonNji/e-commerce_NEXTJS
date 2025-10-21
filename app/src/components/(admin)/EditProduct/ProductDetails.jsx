import React from 'react'

function ProductDetails({formData = {}, handleInputChange}) {
  return (
    <div>
      <div className='bg-white rounded-xl shadow-sm p-8'>
        <h3 className='text-2xl font-semibold mb-8 text-gray-800'>Product Details</h3>
        <div className='space-y-6'>
          
          {/* Weight and SKU */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium text-gray-700'>Weight (kg) <span className='text-red-500'>*</span></span>
              </label>
              <input 
                type="number"
                name="weight"
                value={formData.weight || ''}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className='input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='0.00'
                required
              />
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium text-gray-700'>SKU <span className='text-red-500'>*</span></span>
              </label>
              <input 
                type="text"
                name="sku"
                value={formData.sku || ''}
                onChange={handleInputChange}
                className='input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter SKU'
                required
              />
            </div>
          </div>

          {/* Dimensions */}
          <div>
            <label className='label'>
              <span className='label-text font-medium text-gray-700'>Dimensions (cm) <span className='text-red-500'>*</span></span>
            </label>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='form-control'>
                <input 
                  type="number"
                  name="width"
                  value={formData.width || ''}
                  onChange={handleInputChange}
                  placeholder="Width"
                  step="0.01"
                  min="0"
                  className='input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div className='form-control'>
                <input 
                  type="number"
                  name="height"
                  value={formData.height || ''}
                  onChange={handleInputChange}
                  placeholder="Height"
                  step="0.01"
                  min="0"
                  className='input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div className='form-control'>
                <input 
                  type="number"
                  name="depth"
                  value={formData.depth || ''}
                  onChange={handleInputChange}
                  placeholder="Depth"
                  step="0.01"
                  min="0"
                  className='input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
            </div>
          </div>

          {/* Warranty Information */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium text-gray-700'>Warranty Information <span className='text-red-500'>*</span></span>
            </label>
            <textarea 
              name="warrantyInformation"
              value={formData.warrantyInformation || ''}
              onChange={handleInputChange}
              className='textarea textarea-bordered h-24 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter warranty details'
              required
            />
          </div>

          {/* Return Policy */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium text-gray-700'>Return Policy <span className='text-red-500'>*</span></span>
            </label>
            <textarea 
              name="returnPolicy"
              value={formData.returnPolicy || ''}
              onChange={handleInputChange}
              className='textarea textarea-bordered h-24 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter return policy'
              required
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails