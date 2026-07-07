import Navbar from "./Navbar";
import Hero from "./Hero";
import TrustBar from "./TrustBar";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <TrustBar />
      <Footer />
    </main>
  );
}