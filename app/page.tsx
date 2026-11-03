import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/motion/MotionProvider";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Assets from "@/components/sections/Assets";
import Technology from "@/components/sections/Technology";
import Partnership from "@/components/sections/Partnership";
import Responsible from "@/components/sections/Responsible";
import Investors from "@/components/sections/Investors";
import News from "@/components/sections/News";
import Leadership from "@/components/sections/Leadership";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Intro />
        <Assets />
        <Technology />
        <Partnership />
        <Responsible />
        <Investors />
        <News />
        <Leadership />
        <FinalCta />
      </main>
      <Footer />
      <MotionProvider />
    </>
  );
}
