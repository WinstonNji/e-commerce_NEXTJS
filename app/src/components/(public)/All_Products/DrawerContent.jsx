"use client"
import { useState, useEffect, useContext } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { GeneralContext } from '@/context/generalContext'


function DrawerContent({products}) {
    const {fetchCategory, fetchBrands} = useContext(GeneralContext)
    const [categories,setCategories] = useState([])
    const [brands,setBrands] = useState([])
    const [prices,setPrices] = useState([])
    const [min,setMin] = useState(0)
    const [max,setMax] = useState(50)
    const [scrollValue,setScrollValue] = useState(max / 2)
    const [isLoading, setIsLoading] = useState(true)

    console.log(products, '***products')

    const init = async () => {
      const [fetchedCategories, fetchedBrands] = await Promise.all([
        fetchCategory(),
        fetchBrands()
      ])

      const categoryArr = []
      const brandArr = []
      const productPrices = []

      fetchedCategories.forEach((category) => {
        categoryArr.push(category.title)
      })

      fetchedBrands.forEach((brand) => {
        brandArr.push(brand.brand_name)
      })

      products.forEach((product) => {
        productPrices.push(product.price)
      })

      return { categoryArr, brandArr, productPrices }
    }

    // Initiating brands category and price
    useEffect(() => {
      if(!products || products.length === 0) return

      setIsLoading(true)
      init().then(({ categoryArr, brandArr, productPrices }) => {
        setCategories(categoryArr)
        setBrands(brandArr)
        setPrices(productPrices)

        if (productPrices.length > 0) {
          setMin(Math.min(...productPrices))
          setMax(Math.max(...productPrices))
        }
      }).finally(() => {
        setIsLoading(false)
      })
    }, [products])

    const router = useRouter()
    const searchParams = useSearchParams()
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedBrands, setSelectedBrands] = useState([])

    // Manipulating Params
    useEffect(()=> {
      // Getting existing Params
      setSelectedCategory(searchParams.get("category"))
      const brands = searchParams.getAll("brand")
      setSelectedBrands(brands)
    }, [searchParams])

    const setCategory = (category) => {
        const  params = new URLSearchParams(searchParams.toString())
        const currentParams = params.getAll("category")
        console.log(currentParams, '********current params')

        if(!currentParams.includes(category)){
            params.append("category",category)
            
        }else{
            const newValues = currentParams.filter((param) => param !== category)
            params.delete("category")
            newValues.forEach((c) => params.append("category", c))
        }

        router.push(`?${params.toString()}`) 
    }

    const clearCategories = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete("category")
        router.replace(`?${params.toString()}`)
    }

    const setBrand = (brand) => {
        const params = new URLSearchParams(searchParams.toString())
        const currentParams = params.getAll("brand")

        if(currentParams.includes(brand)){
            const newParams = currentParams.filter((p) => p !== brand)
            params.delete("brand")
            newParams.forEach((brand)=> params.append("brand", brand))
        }else{
            params.append("brand", brand)
        }

        router.replace(`?${params.toString()}`)
    }

    const clearBrands = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete("brand")
        router.replace(`?${params.toString()}`)
    }

    const applyPrice = (min,max) => {
        clearPrice()
        const params = new URLSearchParams(searchParams.toString())
        params.set("min",min)
        params.set("max",max)

        router.replace(`?${params.toString()}`)
    }

    const clearPrice = () => {
        const params = new URLSearchParams(searchParams.toString())

        params.delete("min")
        params.delete("max")

        router.replace(`?${params.toString()}`)

        setMin(min)
        setMax(max)
    }

  return (
    <div>
        <div className='flex flex-col gap-4'>

            {/* Category */}
            <div className="collapse border text-black">
              <input type="checkbox" className="peer" />
              <div className="collapse-title peer-checked:bg-secondary peer-checked:text-white peer-checked:text-shadow-sm decoration-accent underline-offset-2">
                Category
              </div>
              <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-white flex">
                {isLoading ? (
                  <div className='flex flex-wrap gap-2 w-full justify-center py-4'>
                    {[...Array(4)].map((_, idx) => (
                      <div key={idx} className="skeleton h-12 w-36"></div>
                    ))}
                  </div>
                ) : (
                  <form className="filter flex w-full">
                      <div className='flex flex-wrap gap-1 gap-y-3 justify-center '>
                          
                          {categories.map((category, idx) => (
                            <input onChange={()=> setCategory(category)} 
                              key={idx}  
                              className="btn w-36 bg-base-300   hover:font-bold shadow-none  checked:bg-accent checked:text-white checked:font-bold transition-all duration-1000 ease-in-out hover:-translate-y-0.5" 
                              type="radio" 
                              name="metaframeworks" 
                              aria-label={category}
                              checked={selectedCategory === category}
                            />
                          ))}

                          <input onClick={clearCategories} className="btn btn-accent" type="reset" value="×"/>
                      </div>
                      
                  </form>
                )}
              </div>
            </div>
            
            {/* Price */}
            <div className="collapse border text-black">
              <input type="checkbox" className="peer" />
              <div className="collapse-title peer-checked:bg-secondary  peer-checked:text-white peer-checked:text-shadow-sm ">
                Price
              </div>
              <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content flex flex-col items-center gap-4">
                {isLoading ? (
                  <div className='flex flex-col items-center gap-4 w-full py-4'>
                    <div className='flex items-center gap-5 w-full justify-center'>
                      <div className="skeleton h-12 w-24"></div>
                      <span className='font-bold text-xl'>-</span>
                      <div className="skeleton h-12 w-24"></div>
                    </div>
                    <div className="skeleton h-2 w-full"></div>
                    <div className='flex gap-4'>
                      <div className="skeleton h-12 w-20"></div>
                      <div className="skeleton h-12 w-20"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className='flex items-center gap-5'>
                        <input type="text" className='input bg-white text-black foont-bold' placeholder='min' value={Math.round(min)} onChange={(e) => setMin(e.target.value)}/>
                        <span className='font-bold text-xl'>-</span>
                        <input type="text" className='input text-black foont-bold bg-white' placeholder='max' value={Math.round(scrollValue)} onChange={(e) => setScrollValue(e.target.value)}/>
                    </div>              
                    
                    <input onChange={(e)=> setScrollValue((e.target.value))} type="range" min={min} max={max + 10} value={scrollValue} className="range range-accent z-40" />
                    
                    <div className='flex gap-4'>
                        <button onClick={()=> applyPrice(min,Math.round(scrollValue))} className='btn btn-accent font-bold text-white'>Apply</button>
                        <button onClick={clearPrice} className='btn btn-accent font-bold text-white'>Clear</button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Brand */}
            <div className="collapse border text-black">
              <input type="checkbox" className="peer" />
              <div className="collapse-title peer-checked:bg-secondary peer-checked:text-white peer-checked:text-shadow-sm ">
                Brand
              </div>
              <div 
                className="collapse-content
                  bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-contentflex flex-col gap-3"
                >
                {isLoading ? (
                  <div className='flex flex-wrap gap-2 py-4'>
                    {[...Array(8)].map((_, idx) => (
                      <div key={idx} className="skeleton h-12 w-24"></div>
                    ))}
                  </div>
                ) : (
                  <form className='flex flex-wrap gap-2'>
                    {brands.map((brand,idx) => (
                      <label onClick={() => setBrand(brand)} key={idx} className="flex items-center gap-2">
                        <input 
                          className="btn bg-base-300 hover:ring-accent hover:-translate-y-0.5   hover:font-bold shadow-none checked:bg-accent checked:text-white checked:font-bold checked:shadow-none hover:shadow-none focus:shadow-none transition-all duration-200 ease-in-out" 
                          type="checkbox" 
                          name="frameworks" 
                          aria-label={brand}
                          defaultChecked={selectedBrands.includes(brand)} 
                        />
                      </label>
                    ))}
                    <input onClick={clearBrands} className="btn btn-square bg-accent font-bold text-white shadow-none inset-shadow-none border-0 hover:scale-105 transition-all duration-200 ease-in-out" 
                    type="reset" value="×"/>
                  </form>
                )}
              </div>
            </div>

          </div>
    </div>
  )
}

export default DrawerContent