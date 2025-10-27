import React from 'react'
import Image from 'next/image'
import CategoryCard from '@/components/Shared/Category/CategoryCard';

function Categories({categoryArray}) {

    console.log(categoryArray, '***categoryArray, from fetch')
// const categoryArray = [
//     {
//         categoryImg : '/view-hawaiian-shirt-with-floral-print-leaf.jpg',
//         categoryName : 'Fashion & Apparel',
//         caption: 'Trending styles for every occasion'
//     },
//     {
//         categoryImg : '/headphones-with-minimalist-monochrome-background.jpg',
//         categoryName : 'Electronics & Gadgets',
//         caption: 'Latest tech at competitive prices'
//     },
//     {
//         categoryImg : '/plants-gardening-tools-close-up.jpg',
//         categoryName : 'Home & Garden',
//         caption: 'Transform your living space'
//     },
//     {
//         categoryImg : '/skincare-product-with-two-women.jpg',
//         categoryName : 'Beauty & Personal Care',
//         caption: 'Enhance your daily routine'
//     },
//     {
//         categoryImg : '/trucker-hat-with-baseball-tennis-ball.jpg',
//         categoryName : 'Sports & Outdoors',
//         caption: 'Gear for your active lifestyle'
//     },
//     {
//         categoryImg : '/pilates-class-equipment-bench.jpg',
//         categoryName : 'Health & Wellness',
//         caption: 'Products for a better you'
//     },
//     {
//         categoryImg : '/still-life-small-decorative-objects-with-vivid-colors.jpg',
//         categoryName : 'Toys & Games',
//         caption: 'Fun for all ages'
//     },
//     {
//         categoryImg : '/different-car-accessories-composition.jpg',
//         categoryName : 'Automotive',
//         caption: 'Parts and accessories for your ride'
//     },
//     {
//         categoryImg : '/stack-old-coming-book-strips.jpg',
//         categoryName : 'Books & Media',
//         caption: 'Knowledge and entertainment'
//     }
// ];

  return (
    <section className=" w-full px-4 py-16 ">
        <h3 className="text-3xl font-bold text-accent mb-2">Shop By Category</h3>
        <p className="text-base-content/70 mb-8">Discover our wide range of products</p>

        <div className='grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4'>
            {categoryArray.map((category, index) => (
                <CategoryCard key={index} info={category} />
            ))}
        </div>
    </section>
  )
}

export default Categories