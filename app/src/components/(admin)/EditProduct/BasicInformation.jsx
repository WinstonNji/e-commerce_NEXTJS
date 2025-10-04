import React from 'react'

function BasicInformation({formData, handleInputChange, categoriesSet}) {
  return (
    <div>
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
              <div className='form-control flex flex-col w-full'>
                <label className='label'>
                  <span className='label-text font-medium'>Description</span>
                </label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className='textarea textarea-bordered h-32 w-full '
                  
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

              {/* Brand, Category */}
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
                    <span className='label-text font-medium'>Category</span>
                  </label>
                  <select 
                    className="select"
                    onChange={handleInputChange}
                    name='category'
                    value={formData.category}
                    >
                    
                    <option disabled={true}>{formData.category}</option>
                    {/* Dynamic Category Rendering */}
                    {Array.from(categoriesSet).map((category,idx) => (
                      <option key={idx} >{category}</option>
                    ))
                    
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default BasicInformation