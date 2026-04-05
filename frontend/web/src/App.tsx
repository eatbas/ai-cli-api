import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { PianoKeyDivider } from "./components/PianoKeyDivider";
import { Features } from "./components/Features";
import { Providers } from "./components/Providers";
import { HowItWorks } from "./components/HowItWorks";
import { Stats } from "./components/Stats";
import { GetStarted } from "./components/GetStarted";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <PianoKeyDivider />
      <Features />
      <PianoKeyDivider />
      <Providers />
      <PianoKeyDivider />
      <HowItWorks />
      <PianoKeyDivider />
      <Stats />
      <PianoKeyDivider />
      <GetStarted />
      <PianoKeyDivider />
      <Footer />
    </>
  );
}
