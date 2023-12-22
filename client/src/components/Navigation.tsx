import Link from "next/link";
import Button from "./Button";

const Navigation = () => {
  return (
    <nav className="py-3 px-4 sm:px-16 w-full rounded-b-lg border flex flex-row items-center justify-between text-white bg-brand mb-10">
      <Link href="/" className="text-white">
        <picture>
          {/* // TODO: Figure out how to make this work with next/image */}
          <source media="(min-width: 640px)" srcSet="/logo-with-text.svg" />
          <img src="/logo.svg" alt="logo" className="h-11" />
        </picture>
      </Link>

      <Link href="/account" passHref legacyBehavior>
        <Button variant="solid" color="complement">
          My Account
        </Button>
      </Link>
    </nav>
  );
};

export default Navigation;
