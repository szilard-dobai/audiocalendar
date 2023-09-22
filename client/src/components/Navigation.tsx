import Link from "next/link";
import Button from "./Button";

const Navigation = () => {
  return (
    <nav className="py-3 px-4 sm:px-16 w-full rounded-b-lg border flex flex-row items-center justify-between text-white bg-brand mb-10">
      <Link href="/" className="text-white">
        [LOGO]
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
