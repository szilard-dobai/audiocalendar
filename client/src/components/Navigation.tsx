// import Image from 'next/image'
import Link from "next/link";
import React from "react";
import Button from "./Button";

const Navigation = () => {
  return (
    <nav className="p-3 w-full rounded-b-lg border flex flex-row items-center justify-between text-white bg-brand mb-10">
      {/* <Image /> */}
      <p>LOGO</p>

      <Button variant="solid">My Account</Button>
      {/* <Link href="/account"></Link> */}
    </nav>
  );
};

export default Navigation;
