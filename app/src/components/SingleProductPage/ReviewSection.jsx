import React from 'react'
import { products } from '../../../public/product'

function ReviewSection({productId}) {

  const product = products.find((product) => product.id === Number(productId))

  function returnStars(rating, id = "rating") {
  const maxStars = 5;

  const fullStars = Math.floor(rating); // whole stars
  const hasHalfStar = rating - fullStars >= 0.5; // check if we need a half star

  return (
    <span className="flex gap-1">
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

  function returnDateFormat(date){
    const reviewDate = new Date(date)

    const day = reviewDate.getDay()
    const month = reviewDate.getMonth() + 1
    const year = reviewDate.getFullYear()

    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2,"0")}`
  }

  return (
    <div className='mt-16 ' >
      <div className='mb-8 text-center'>
        <p className='text-3xl font-semibold text-accent '>Product Reviews</p>
        <p className='text-gray-400 text-lg'>What do customers have to say about this product</p>
      </div>
      
      <div className='flex flex-col gap-5 mt-6'>
        {product.reviews.map((review,idx) => (
          <div key={idx} className='flex flex-row gap-6 relative bg-base-300 text-white card p-6 shadow-md rounded-xl'>
            {/* Avatar */}
            <div className="avatar flex-shrink-0">
              <div className="ring-primary ring-offset-base-100 w-20 rounded-full ring-2 ring-offset-2">
                <img 
                  src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" 
                  alt="Reviewer avatar"
                  className="object-cover"
                />
              </div>
            </div>
    
            {/* Review info */}
            <div className='flex-1 min-w-0'>
              {/* Name and date */}
              <div className='flex justify-between items-start gap-4 mb-2'>
                <p className='font-bold text-base-content truncate'>{review.reviewerName}</p>
                <p className='font-medium text-sm text-base-content/60 whitespace-nowrap'>
                  {returnDateFormat(review.date)}
                </p>
              </div>
      
              {/* Stars */}
              <div className='mb-3'>
                {returnStars(review.rating)}
              </div>
      
              {/* Comment */}
              <p className='font-light text-base-content/80 leading-relaxed'>
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center mt-8'>
        <button className='btn btn-wide btn-accent text-white font-bold'>See more Reviews</button>
      </div>
      
    </div>
  )
}

export default ReviewSection