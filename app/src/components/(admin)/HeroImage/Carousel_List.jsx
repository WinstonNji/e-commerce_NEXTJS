import React from 'react'
import CarouselCards from './CarouselCards'
import { getBaseUrl } from '@/lib/utils/getBaseUrl'


async function getCarouselData() {
  try {
    const baseUrl = getBaseUrl()
    const res = await fetch(`${baseUrl}/api/v1/admin/hero_carousel`)
    
    if (!res.ok) {
      throw new Error('Failed to fetch carousel data')
    }
    
    const result = await res.json()
    return result.success ? result.data : []
  } catch (error) {
    console.error('Error fetching carousel data:', error)
    return []
  }
}

async function Carousel_List() {

    const carouselContent = await getCarouselData()

return (
    <div>
        <div className='relative flex flex-col gap-8'>
            {carouselContent.length === 0 ? (
              <div className="text-center py-12 text-base-content/60">
                <p className="text-lg">No carousel items yet. Add your first hero image above!</p>
              </div>
            ) : (
              carouselContent.map((item, idx) => {
                // Map database fields to component props
                const mappedCarousel = {
                  id: item.id,
                  captionText: item.title,
                  mainText: item.description,
                  navigationLinkText: item.action_btn_text,
                  imgSrc: item.image,
                  navigationLink: item.target_product,
                  display: item.display,
                  productId: item.target_product
                }
                
                return (
                  <CarouselCards 
                    key={item.id || idx} 
                    carouselInfo={mappedCarousel}
                  />
                )
              })
            )}
          </div>
    </div>
  )
}

export default Carousel_List