import React from 'react'

function BasicInformation({formData = {}, handleInputChange, categories = [], allBrands = []}) {
  return (
    <div>
      <div className='bg-white rounded-xl shadow-sm p-8'>
        <h3 className='text-2xl font-semibold mb-8 text-gray-800'>Basic Information</h3>
        <div className='space-y-6'>
          
          {/* Title */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium text-gray-700'>Product Title <span className='text-red-500'>*</span></span>
            </label>
            <input 
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
              className='input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter product title'
              required
            />
          </div>

          {/* Description */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium text-gray-700'>Description <span className='text-red-500'>*</span></span>
            </label>
            <textarea 
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              className='textarea textarea-bordered h-32 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter product description'
              required
            />
          </div>

          {/* Brand and Category - Side by Side */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Brand */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium text-gray-700'>Brand <span className='text-red-500'>*</span></span>
              </label>
              <select 
                className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                name='brandId'
                value={formData.brandId}
                required
              >
                <option value=''>Select Brand</option>
                {allBrands?.map((brand, idx) => (
                  <option key={idx} value={brand.id}>
                    {brand.brand_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium text-gray-700'>Category <span className='text-red-500'>*</span></span>
              </label>
              <select 
                className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
                name='categoryId'
                value={formData.categoryId}
                required
              >
                <option value=''>Select Category</option>
                {categories?.map((category, idx) => (
                  <option key={idx} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price, Discount, and Inventory - Three Columns */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium text-gray-700'>Price ($) <span className='text-red-500'>*</span></span>
              </label>
              <input 
                type="number"
                name="price"
                value={formData.price}
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
                <span className='label-text font-medium text-gray-700'>Discount (%) <span className='text-red-500'>*</span></span>
              </label>
              <input 
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleInputChange}
                step="1"
                min="0"
                max="100"
                className='input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='0'
                required
              />
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium text-gray-700'>Inventory <span className='text-red-500'>*</span></span>
              </label>
              <input 
                type="number"
                name="inventory"
                value={formData.inventory}
                onChange={handleInputChange}
                min="0"
                className='input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='0'
                required
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BasicInformation;