import Image from "next/image";
import Link from "next/link";
import linkedin from "../../public/LI-In-Bug.svg";
import github from "../../public/github-mark-white.svg";

const Footer = () => {
  return (
    <footer className="w-1/2 mx-auto mt-36 py-3 px-16 bg-complement rounded-t-lg text-white text-center text-md">
      Szilard&apos;s Emporium © {new Date().getFullYear()}
      <span className="mx-2 font-semibold">|</span>
      <Link
        className="hover:[text-shadow:_0_0_1px_white] cursor-pointer"
        href="https://github.com/szilard-dobai"
        target="_blank"
      >
        GitHub
        <Image
          src={github}
          alt="github"
          className="w-4 h-4 mx-1 inline align-baseline"
        />
      </Link>
      <span className="mx-2 font-semibold">|</span>
      <Link
        className="hover:[text-shadow:_0_0_1px_white] cursor-pointer"
        href="https://www.linkedin.com/in/szilard-dobai/"
        target="_blank"
      >
        LinkedIn
        <Image
          src={linkedin}
          alt="linkedin"
          className="w-5 mx-1 aspect-ratio inline align-baseline"
        />
      </Link>
    </footer>
  );
};

export default Footer;
