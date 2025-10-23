import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function ProductCard({product, singleTrue = false, admin = false}) {

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
    
    <Link className={`group ring rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl 
      ${singleTrue ? 'min-w-sm' : ''}`} 
      href={ !admin ? `/product/${product.id}` : `admin-edit-product/edit-product/${product.id}`}
      
      >
      
        <div className='relative h-70 bg-[#F0F0F2] '>
          <Image
            src={product.thumbnail_img}
            fill={true}
            className='object-contain group-hover:scale-110 transition-all duration-300 ease-in-out  '
            alt={`${product.title} image`}
          />
        </div>
        <div className='overflow-ellipsis m px-2 pb-4 bg-secondary/20 group-hover:bg-secondary/30 pt-2'>
          <p className='font-semibold whitespace-nowrap truncate text-lg group-hover:text-accent'>{product.title}</p>
          <div className= {admin ? "hidden" : "block"} >
            <p className='flex items-center text-xs '>
              <span className='font-light'>
                {product?.rating?.toString()?.slice(0,3)}
              </span>
              {returnStars(product.rating)}
            </p>
            <div className='flex w-full justify-between items-center lg:mt-0'>
              <p className='font-bold text-lg text-accent '>${product.price}</p>
              <button className='hidden md:block btn  btn-outline rounded-full group-hover:text-white group-hover:bg-accent font-semibold'>Buy now</button>
            </div>
          </div>
          
        </div>
        
      </Link>
  )
}

export default ProductCard
