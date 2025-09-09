import React from 'react'
import { products } from '../../../public/product'
import { ShoppingCart } from 'lucide-react';
import { Wallet } from 'lucide-react';
import { Heart  } from 'lucide-react';
import Quantity from './Quantity';

function ProductDescription({productId}) {


const product = products.find(product => {
    return  product.id === Number(productId)
})

function returnStars(rating, id = "rating") {
  const maxStars = 5;

  const fullStars = Math.floor(rating); // whole stars
  const hasHalfStar = rating - fullStars >= 0.5; // check if we need a half star

  return (
    <span className="flex gap-1 scale-75">
      {Array.from({ length: maxStars }, (_, i) => {
        if (i < fullStars) {
          // full star
          return (
            <span
              key={i}
              className="mask mask-star-2 w-5 h-5"
              style={{ backgroundColor: "#97322D" }}
            />
          );
        } else if (i === fullStars && hasHalfStar) {
          // half star → using linear-gradient trick
          return (
            <span
              key={i}
              className="mask mask-star-2 w-5 h-5"
              style={{
                background: `linear-gradient(
                  to right,
                  #97322D 50%,
                  #d1d5db 50%
                )`,
              }}
            />
          );
        } else {
          // empty star
          return (
            <span
              key={i}
              className="mask mask-star-2 w-5 h-5"
              style={{ backgroundColor: "#d1d5db" }}
            />
          );
        }
      })}
    </span>
  );
  }

    return (
        <div className='mt-8 md:mt-0 flex flex-1'>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-5'>
                    <h1 className='font-bold text-3xl lg:text-4xl leading-tight'>{product.title}</h1>
                    <div className='flex flex-wrap items-center justify-center gap-3 ring ring-secondary rounded-lg p-1 w-fit text-black'>
                        {returnStars(product.rating)}
                        <span className='text-sm font-medium text-gray-600'>
                            {product.rating.toString().slice(0,3)} out of 5
                        </span>
                        <span className='text-xs text-black'>• {product.reviews.length}reviews</span>
                    </div>
                    <div className='text-gray-500'>
                        <p>{product.description}</p>
                    </div>
                    
                    <Quantity productId={product.id} />
                </div>

                <div className='text-gray-500 py-6'>
                    <hr className='mb-4' />
                    <div className='space-y-3'>
                        <div className='flex justify-between'>
                            <p className='font-medium'>Brand</p>
                            <p>{product.brand}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='font-medium'>Color</p>
                            <p>{product.color}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='font-medium'>Category</p>
                            <p>{product.category}</p>
                        </div>
                    </div>
                    <hr className='mt-4' />
                </div>

                <div className='flex flex-col gap-3 w-full -mt-8 xl:flex-row'>
                    <button className='flex-1 btn btn-accent text-white font-bold hover:bg-accent-hover hover:-translate-y-1 transition-all duration-300 ease-in-out py-2'>
                        <ShoppingCart />
                    Add to Cart
                    
                    </button>
                    <button className='flex-1 btn btn-accent text-white font-bold hover:btn-accent-hover hover:-translate-y-1 transition-all duration-300 ease-in-out py-2'><Wallet /> Buy Now</button>
                    <button className='flex-1 btn bg-secondary text-white font-bold hover:btn-accent-hover hover:-translate-y-1 transition-all duration-300 ease-in-out py-2'><Heart /> Add to wishlist</button>
                </div>
        
            </div>
        </div>
    )
}

export default ProductDescription