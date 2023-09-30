import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo-with-text.svg";
import Button from "./Button";

const Navigation = () => {
  return (
    <nav className="py-3 px-4 sm:px-16 w-full rounded-b-lg border flex flex-row items-center justify-between text-white bg-brand mb-10">
      <Link href="/" className="text-white">
        <Image src={logo} alt="logo" height={45} />
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
