import Image from "next/image";
import HeroPageCarousel from "@/components/LandingPage/HeroPageCarousel";
import FeaturedProducts from "@/components/LandingPage/FeaturedProducts";
import TrustSignals from "@/components/LandingPage/TrustSignals";
import Categories from "@/components/LandingPage/Categories";
import ClientTestimonial from "@/components/LandingPage/ClientTestimonial";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroPageCarousel></HeroPageCarousel>
      <TrustSignals />
      <Categories />
      <FeaturedProducts></FeaturedProducts>
      <ClientTestimonial />
    </div>
  );
}
