import { useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import FeaturedServices from "./components/FeaturedServices.jsx";
import CallBand from "./components/CallBand.jsx";
import About from "./components/About.jsx";
import InfinityDivider from "./components/InfinityDivider.jsx";
import Services from "./components/Services.jsx";
import Pricing from "./components/Pricing.jsx";
import Formations from "./components/Formations.jsx";
import Gallery from "./components/Gallery.jsx";
import Contact from "./components/Contact.jsx";
import Testimonials from "./components/Testimonials.jsx";
import FAQ from "./components/FAQ.jsx";
import BookingForm from "./components/BookingForm.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart((prev) => (prev.some((i) => i.key === item.key) ? prev : [...prev, item]));
    document.getElementById("rendez-vous")?.scrollIntoView({ behavior: "smooth" });
  }

  function removeFromCart(key) {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <Hero />
        <FeaturedServices />
        <CallBand />
        <InfinityDivider />
        <About />
        <Services onReserve={addToCart} />
        <Pricing />
        <Formations />
        <Gallery />
        <Contact />
        <Testimonials />
        <FAQ />
        <BookingForm cart={cart} onAdd={addToCart} onRemove={removeFromCart} />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}