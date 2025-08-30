import React from 'react'
import Image from 'next/image'

function Categories() {

const categoryArray = [
    {
        categoryImg : '/view-hawaiian-shirt-with-floral-print-leaf.jpg',
        categoryName : 'Fashion & Apparel',
        caption: 'Trending styles for every occasion'
    },
    {
        categoryImg : '/headphones-with-minimalist-monochrome-background.jpg',
        categoryName : 'Electronics & Gadgets',
        caption: 'Latest tech at competitive prices'
    },
    {
        categoryImg : '/plants-gardening-tools-close-up.jpg',
        categoryName : 'Home & Garden',
        caption: 'Transform your living space'
    },
    {
        categoryImg : '/skincare-product-with-two-women.jpg',
        categoryName : 'Beauty & Personal Care',
        caption: 'Enhance your daily routine'
    },
    {
        categoryImg : '/trucker-hat-with-baseball-tennis-ball.jpg',
        categoryName : 'Sports & Outdoors',
        caption: 'Gear for your active lifestyle'
    },
    {
        categoryImg : '/pilates-class-equipment-bench.jpg',
        categoryName : 'Health & Wellness',
        caption: 'Products for a better you'
    },
    {
        categoryImg : '/still-life-small-decorative-objects-with-vivid-colors.jpg',
        categoryName : 'Toys & Games',
        caption: 'Fun for all ages'
    },
    {
        categoryImg : '/different-car-accessories-composition.jpg',
        categoryName : 'Automotive',
        caption: 'Parts and accessories for your ride'
    },
    {
        categoryImg : '/stack-old-coming-book-strips.jpg',
        categoryName : 'Books & Media',
        caption: 'Knowledge and entertainment'
    }
];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 bg-primary">
        <h3 className="text-3xl font-bold text-accent mb-2">Shop By Category</h3>
        <p className="text-base-content/70 mb-8">Discover our wide range of products</p>

        <div className='grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4'>
            {categoryArray.map((category, index) => (
                <div 
                    key={index} 
                    className='group ring rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl cursor-pointer'
                >
                    <div className='relative aspect-[4/3] bg-base-200'>
                        <Image 
                            fill={true}
                            src={category.categoryImg}
                            alt={category.categoryName}
                            className='object-cover group-hover:scale-110 transition-all duration-300 ease-in-out'
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300'></div>
                    </div>
                    <div className='px-4 pb-4 pt-3 bg-secondary/20 group-hover:bg-secondary/30 transition-colors h-full duration-300'>
                        <h4 className='font-bold text-lg text-base-content mb-1 group-hover:text-accent transition-colors duration-300'>
                            {category.categoryName}
                        </h4>
                        <p className='text-base-content/70 text-sm leading-relaxed'>
                            {category.caption}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default Categories