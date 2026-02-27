import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FoodMarquee from "@/components/FoodMarquee";
import GallerySection from "@/components/GallerySection";
import MenuSection from "@/components/MenuSection";
import LunchSection from "@/components/LunchSection";
import BanquetSection from "@/components/BanquetSection";
import ContactSection from "@/components/ContactSection";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FoodMarquee />
      <GallerySection />
      <MenuSection />
      <div id="specials">
        <LunchSection />
      </div>
      <BanquetSection />
      <ContactSection />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
