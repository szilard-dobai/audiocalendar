import Button from "@/components/Button";
import Link from "next/link";

const CTA = () => {
  return (
    <section
      id="cta"
      className="my-20 md:my-36 bg-brand-50 w-full min-w-min rounded-lg p-16 relative overflow-hidden z-0 text-center"
    >
      <div className="absolute -top-12 -right-6 w-1/3 h-4/5 bg-brand-200 rotate-12 rounded-3xl -z-10" />
      <div className="absolute top-[-5%] left-[-10%] w-[15rem] h-[20rem] bg-brand-300 rotate-[-30deg] rounded-3xl -z-10" />

      <h2 className="text-3xl text md:text-5xl md:leading-tight font-bold text-primary mb-6 max-w-2xl mx-auto">
        Start Organizing Your Music Journey{" "}
        <span className="text-complement">Today</span>
      </h2>

      <Link href="/account" passHref legacyBehavior>
        <Button variant="solid" className="mx-auto">
          Sign Up Now
        </Button>
      </Link>
    </section>
  );
};

export default CTA;
