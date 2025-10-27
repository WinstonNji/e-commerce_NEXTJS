'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function HeroPageCarousel({carouselContent}) {
  // const carouselContent = [
  //   {
  //     imgSrc: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
  //     captionText: "Essence Mascara Lash Princess",
  //     mainText: "Achieve dramatic lashes with this volumizing and lengthening mascara.",
  //     actionText: "Shop Now",
  //     navigationLink: "/all-products/beauty",
  //     navigationLinkText: "Learn More",
  //   },
  //   {
  //     imgSrc: "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp",
  //     captionText: "Eyeshadow Palette with Mirror",
  //     mainText: "Versatile eyeshadow shades for stunning eye looks, anywhere.",
  //     actionText: "Shop Now",
  //     navigationLink: "/all-products/beauty",
  //     navigationLinkText: "See More",
  //   },
  //   {
  //     imgSrc: "https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp",
  //     captionText: "Powder Canister",
  //     mainText: "Lightweight and translucent formula for a smooth matte finish.",
  //     actionText: "Shop Now",
  //     navigationLink: "/all-products/beauty",
  //     navigationLinkText: "Learn More",
  //   },
  //   {
  //     imgSrc: "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
  //     captionText: "Red Lipstick",
  //     mainText: "Classic bold color for long-lasting vibrant lips.",
  //     actionText: "Shop Now",
  //     navigationLink: "/all-products/beauty",
  //     navigationLinkText: "See More",
  //   },
  //   {
  //     imgSrc: "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp",
  //     captionText: "Red Nail Polish",
  //     mainText: "Rich, glossy red hue for vibrant polished nails.",
  //     actionText: "Shop Now",
  //     navigationLink: "/all-products/beauty",
  //     navigationLinkText: "Learn More",
  //   },
  //   {
  //     imgSrc: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
  //     captionText: "Calvin Klein CK One",
  //     mainText: "Classic unisex fragrance with fresh and clean scent.",
  //     actionText: "Shop Now",
  //     navigationLink: "/all-products/fragrances",
  //     navigationLinkText: "See More",
  //   },
  // ]
    const totalIndex = carouselContent?.length
    const [index, setIndex] = useState(0)

    useEffect(() => {
      const interval = setInterval(() => {
        if(index < totalIndex){
          setIndex(prev => (prev + 1) % totalIndex)
        }else{
          setIndex(prev => prev = 0)
        }
      }, 7000)

      
      return ()=> clearInterval(interval)
    }, [totalIndex])

  return (
    <div>
      <div className='relative w-full h-[500px] lg:h-[400px] pb-4 bg-secondary rounded-b-2xl'>
        {
          carouselContent?.map((carousel, i) => (
            <div key={i} className={`absolute flex flex-col px-8 ${i === index ? 'opacity-100' : 'opacity-0'} duration-1000 ease-in-out w-full h-full transition-opacity  md:flex-row-reverse md:items-center md:pl-12 lg:px-32  `}>
              <div className='relative sm:w-150   md:w-[700px] h-80 md:flex-1'>
                <Image 
                  src={carousel.image}
                  fill={true}
                  className='object-contain'
                  alt='d'
                />
              </div>
              <div className='flex flex-col gap-2  w-full flex-1 md:gap-5'>
                {/* Caption */}
                <p className='text-white underline decoration-accent underline-offset-4 font-semibold'>{carousel.title}</p>
                {/* Main text */}
                <p className='font-semibold text-xl md:text-2xl lg:text-3xl'>{carousel.description}</p>
                {/* Button */}
                <div>
                  <Link className='btn btn-accent text-white w-fit hover:bg-accent-hover hover:px-12 transition-all duration-150 ease-in-out' href={carousel.target_product}>
                    
                      {carousel.action_btn_text}


                  </Link>
                </div>
                
              </div>
            </div>
          ))
        }  
      </div>
      <div className='w-full flex justify-center gap-4 mt-3'>
        {[...Array(carouselContent?.length)].map((_,i) => (
          <p key={i} onClick={()=> setIndex(i)} className={`w-2 h-2 ring-accent ring rounded-full cursor-pointer ${i === index ? 'bg-accent' : 'bg-transparent'} transition-all duration-1000 ease-in-out `}>
          </p>
        ))}
      </div>
      
    </div>
      
    )
}

export default HeroPageCarousel