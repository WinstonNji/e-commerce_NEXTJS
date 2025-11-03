export const dynamic = "force-dynamic";

import Image from "next/image";
import HeroPageCarousel from "@/components/(public)/LandingPage/HeroPageCarousel";
import FeaturedProducts from "@/components/(public)/LandingPage/FeaturedProducts";
import TrustSignals from "@/components/(public)/LandingPage/TrustSignals";
import Categories from "@/components/(public)/LandingPage/Categories";
import ClientTestimonial from "@/components/(public)/LandingPage/ClientTestimonial";

const fetchCarousel = async () => {

  const baseUrl = process.env.VERCEL_URL ?  `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

  try {
    const res = await fetch(`${baseUrl}/api/v1/general/hero_carousel`, {cache : 'no-store'})

    if(!res.ok){
      throw Error("Couldn't fetch product")
    }
    const result = await res.json()
    return result.data

  } catch (error) {
    console.error(error)
  }
  
}

const fetchTrustSignal = async () => {
  const baseUrl = process.env.VERCEL_URL ?  `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/v1/general/trust_signals`)
    if(!res.ok){
      throw Error("Couldn't fetch product")
    }
    const result = await res.json()
    console.log(result.data)
    return result.data
  } catch (error) {
    console.error(error)
  }

}

const fetchCategories = async () => {
  try {
    const baseUrl = process.env.VERCEL_URL ?  `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/v1/general/category`, {cache : 'no-store'})

    if(!res.ok){
      throw Error("Couldn't fetch product")
    }
    const result = await res.json()
    console.log(result, '****result')
    return result.data
  } catch (error) {
    console.error(error)
  } 
}

const fetchFeaturedProducts = async () => {
  try {
    const baseUrl = process.env.VERCEL_URL ?  `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/v1/general/products/featured`, {cache : 'no-store'})

    if(!res.ok){
      throw Error("Couldn't fetch product")
    }
    const result = await res.json()
    console.log(result, '****featured Product')
    return result.data
  } catch (error) {
    console.error(error)
  } 
}




export default async function Home() {
  const [carouselContent, trustSignals, categoryArray, featuredProducts ] = await Promise.all([fetchCarousel(), fetchTrustSignal(), fetchCategories(), fetchFeaturedProducts()])
  
  // const carouselContent = await fetchCarousel()
  // const trustSignals = await fetchTrustSignal()
  // const categoryArray = await fetchCategories()
  // const featuredProducts = await fetchFeaturedProducts()
  return (
    <div className="min-h-screen">
      <HeroPageCarousel 
        carouselContent={carouselContent}
      />
      <TrustSignals
        trustSignals = {trustSignals}
      />
      <Categories
        categoryArray = {categoryArray}
      />
      <FeaturedProducts 
        products={featuredProducts}
      />
      <ClientTestimonial />
    </div>
  );
}
