import { Footer } from "@/components/Footer/Footer";
import { HeroBanner } from "@/components/HeroBanner/HeroBanner";
import { MainContent } from "@/components/MainContent/MainContent";

export default function Home() {
  return (
    <div className="homepage">
      <HeroBanner />

      <MainContent />

      <Footer />
    </div>
  );
}
