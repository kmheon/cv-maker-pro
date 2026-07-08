import Navbar from "./Navbar";
import Hero from "./Hero";
import Story from "./Story";
import Templates from "./Templates";
import TrustBar from "./TrustBar";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <Templates />
      <Story />
      <TrustBar />
      <Footer />
    </main>
  );
}