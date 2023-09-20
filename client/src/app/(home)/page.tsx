import Image from "next/image";
import imagination from "../../../public/undraw_imagination.svg";
import Benefits from "./(components)/Benefits";
import CTA from "./(components)/CTA";
import FAQ from "./(components)/FAQ";
import Hero from "./(components)/Hero";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-between px-16">
      <Hero />

      <Benefits />

      <Image
        src={imagination}
        alt="person listening to music in the nature"
        className="my-10 md:my-16 w-full md:w-3/4 h-auto"
        priority
      />

      <FAQ />

      <CTA />
    </main>
  );
};

export default Home;
