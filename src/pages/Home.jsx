import HeroSlider from "../components/home/HeroSlider";
import { ClientsBanner, SoftwareSolutions, ExpertTeam, Projects } from "../components/home/ShowcaseSections";
import { WhyChooseUs, AboutCards, ServicesGrid, StatsBanner, Pricing, Insights, Technologies } from "../components/home/BusinessSections";
import ContactSection from "../components/home/ContactSection";
import "../components/home/home-shell.css";

export default function Home() {
  return <main className="dc-home">
    <HeroSlider />
    <ClientsBanner />
    <SoftwareSolutions />
    <ExpertTeam />
    <Projects />
    <WhyChooseUs />
    <AboutCards />
    <ServicesGrid />
    <StatsBanner />
    <Pricing />
    <Insights />
    <Technologies />
    <ContactSection />
  </main>;
}
