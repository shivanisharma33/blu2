import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Opportunity from "@/components/sections/Opportunity";
import Assets from "@/components/sections/Assets";
import Strategy from "@/components/sections/Strategy";
import Partnership from "@/components/sections/Partnership";
import Milestones from "@/components/sections/Milestones";
import Leadership from "@/components/sections/Leadership";
import News from "@/components/sections/News";
import Investors from "@/components/sections/Investors";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Opportunity />
      <Assets />
      <Strategy />
      <Partnership />
      <Milestones />
      <Leadership />
      <News />
      <Investors />
      <FinalCta />
    </>
  );
}
