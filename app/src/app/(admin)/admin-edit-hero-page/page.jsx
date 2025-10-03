import React from 'react'
import AddHeroPage from '@/components/(admin)/HeroImage/AddHeroPage'
import CarouselCards from '@/components/(admin)/HeroImage/CarouselCards'

function page() {

  const carouselContent = [
    {
      imgSrc: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
      captionText: "Essence Mascara Lash Princess",
      mainText: "Achieve dramatic lashes with this volumizing and lengthening mascara.",
      actionText: "Shop Now",
      navigationLink:  `/product/${1}`,
      navigationLinkText: "Learn More",
    },
    {
      imgSrc: "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp",
      captionText: "Eyeshadow Palette with Mirror",
      mainText: "Versatile eyeshadow shades for stunning eye looks, anywhere.",
      actionText: "Shop Now",
      navigationLink: "/all-products/beauty",
      navigationLinkText: "See More",
    },
    {
      imgSrc: "https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp",
      captionText: "Powder Canister",
      mainText: "Lightweight and translucent formula for a smooth matte finish.",
      actionText: "Shop Now",
      navigationLink: "/all-products/beauty",
      navigationLinkText: "Learn More",
    },
    {
      imgSrc: "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
      captionText: "Red Lipstick",
      mainText: "Classic bold color for long-lasting vibrant lips.",
      actionText: "Shop Now",
      navigationLink: "/all-products/beauty",
      navigationLinkText: "See More",
    },
    {
      imgSrc: "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp",
      captionText: "Red Nail Polish",
      mainText: "Rich, glossy red hue for vibrant polished nails.",
      actionText: "Shop Now",
      navigationLink: "/all-products/beauty",
      navigationLinkText: "Learn More",
    },
    {
      imgSrc: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
      captionText: "Calvin Klein CK One",
      mainText: "Classic unisex fragrance with fresh and clean scent.",
      actionText: "Shop Now",
      navigationLink: "/all-products/fragrances",
      navigationLinkText: "See More",
    },
  ]

  return (
    <div className='min-h-screen w-full pb-0 overflow-y-hidden -mt-2.5 md:mt-0'>
      <div className="tabs tabs-boxed md:mt-8  bg-secondary p-1 rounded-sm  h-[80vh] md:h-[90vh]">
        <input 
          type="radio" 
          name="my_tabs_6" 
          className="tab flex flex-1 checked:bg-white checked:text-black checked:border-b-2 checked:border-white transition-all duration-300 rounded-t-xl" 
          aria-label="Add An Image" 
        />
        <div className="tab-content bg-white border border-base-300 p-6 transition-all duration-300 h-full overflow-y-auto">
          <AddHeroPage/>
        </div>

        <input 
          type="radio" 
          name="my_tabs_6" 
          className="tab flex flex-1 checked:bg-white checked:text-black checked:border-b-2 checked:border-white transition-all duration-300 rounded-t-xl" 
          aria-label="Edit Image" 
          defaultChecked 
        />
        <div className="tab-content bg-white border border-base-300 p-6 transition-all duration-300 h-full overflow-y-auto">
          <div className='relative flex flex-col gap-8'>
            {carouselContent.map((product, idx) => (
              <CarouselCards key={idx} product={product}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page