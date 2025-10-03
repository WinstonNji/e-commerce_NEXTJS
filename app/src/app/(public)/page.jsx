import Image from "next/image";
import HeroPageCarousel from "@/components/(public)/LandingPage/HeroPageCarousel";
import FeaturedProducts from "@/components/(public)/LandingPage/FeaturedProducts";
import TrustSignals from "@/components/(public)/LandingPage/TrustSignals";
import Categories from "@/components/(public)/LandingPage/Categories";
import ClientTestimonial from "@/components/(public)/LandingPage/ClientTestimonial";

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
