import React from 'react'
import CategoryCard from '@/components/Shared/Category/CategoryCard';
import AddCategory from '@/components/(admin)/Categories/AddCategory';

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

function page() {
 return (
    <div className='min-h-screen'>

    <div className='min-h-screen w-full pb-0 overflow-y-hidden -mt-2.5 md:mt-0'>
        <div className="tabs tabs-boxed md:mt-8  bg-secondary p-1 rounded-sm  h-[80vh] md:h-[90vh]">
        <input 
            type="radio" 
            name="my_tabs_6" 
            className="tab flex flex-1 checked:bg-white checked:text-black checked:border-b-2 checked:border-white transition-all duration-300 rounded-t-xl" 
            aria-label="Add A Category" 
        />
        <div className="tab-content bg-white border border-base-300 p-6 px-8 md:px-16 transition-all duration-300 h-full overflow-y-auto">
            <AddCategory/>
        </div>

        <input 
            type="radio" 
            name="my_tabs_6" 
            className="tab flex flex-1 checked:bg-white checked:text-black checked:border-b-2 checked:border-white transition-all duration-300 rounded-t-xl" 
            aria-label="Edit Category" 
            defaultChecked 
        />
        <div className="tab-content bg-white border border-base-300 p-6 px-8 md:px-16 transition-all duration-300 h-full overflow-y-auto">
            <div className='relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {categoryArray.map((category, index) => (
                    <CategoryCard key={index} info={category} />
                ))}
            </div>
        </div>

        
        </div>
    </div>

    </div>
)
}

export default page