import Button from "@/components/Button";
import banner from "@public/undraw_walk_in_the_city.svg";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="hero"
      className="flex flex-col gap-12 md:gap-0 md:grid md:grid-cols-10 my-20 md:my-36 items-center"
    >
      <div className="md:col-start-1 md:col-end-7 md:row-start-1 md:z-10 text-center md:text-left">
        <hgroup className="mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-primary">
            Never Lose a Song Again with{" "}
            <span className="text-brand">Audiocalendar</span>
          </h1>
          <p className="text-lg md:text-2xl text-secondary">
            Your Personal Soundtrack, Organized Automatically
          </p>
        </hgroup>

        <div className="flex gap-5 justify-center md:justify-start flex-wrap">
          <Link href="/account" passHref legacyBehavior>
            <Button variant="solid">Get Started</Button>
          </Link>
          <Link href="#faq" passHref legacyBehavior>
            <Button variant="outline">Learn More</Button>
          </Link>
        </div>
      </div>

      <div className="md:col-start-6 md:col-end-11 md:row-start-1 md:z-0 max-w-md md:max-w-lg justify-self-end">
        <Image
          src={banner}
          alt="person listening to music in the city"
          className="aspect-auto lg:w-full"
        />
      </div>
    </section>
  );
};

export default Hero;
