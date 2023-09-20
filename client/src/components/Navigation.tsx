// import Image from 'next/image'
import Link from "next/link";
import React from "react";
import Button from "./Button";

const Navigation = () => {
  return (
    <nav className="py-3 px-16 w-full rounded-b-lg border flex flex-row items-center justify-between text-white bg-brand mb-10">
      {/* <Image /> */}
      <Link href="/">[LOGO]</Link>

      <Link href="/account" passHref legacyBehavior>
        <Button variant="solid">My Account</Button>
      </Link>
    </nav>
  );
};

export default Navigation;
