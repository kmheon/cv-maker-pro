import Navbar from "./Navbar";
import Hero from "./Hero";
import Story from "./Story";
import TrustBar from "./TrustBar";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <Story />
      <TrustBar />
      <Footer />
    </main>
  );
}