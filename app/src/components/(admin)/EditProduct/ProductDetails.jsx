import React from 'react'

function ProductDetails({formData, handleInputChange}) {
  return (
    <div>
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
              <div className='form-control flex flex-col'>
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
              <div className='form-control flex flex-col'>
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
    </div>
  )
}

export default ProductDetails