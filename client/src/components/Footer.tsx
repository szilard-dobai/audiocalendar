import Image from "next/image";
import Link from "next/link";
import linkedin from "../../public/LI-In-Bug.svg";
import github from "../../public/github-mark-white.svg";

const Footer = () => {
  return (
    <footer className="w-4/5 sm:w-2/3 lg:w-1/2 mx-auto mt-36 py-3 px-0 md:px-16 bg-brand rounded-t-lg text-white text-md text-center flex flex-row justify-center items-center gap-2">
      <span className="whitespace-nowrap">
        Szilard&apos;s Emporium © {new Date().getFullYear()}
      </span>

      <Link
        className="hover:[text-shadow:_0_0_1px_white] cursor-pointer whitespace-nowrap"
        href="https://github.com/szilard-dobai"
        target="_blank"
      >
        <span className="hidden md:inline">GitHub</span>
        <Image
          src={github}
          alt="github"
          className="w-4 min-w-[1rem] h-4 mx-1 inline align-baseline"
        />
      </Link>

      <Link
        className="hover:[text-shadow:_0_0_1px_white] cursor-pointer whitespace-nowrap"
        href="https://www.linkedin.com/in/szilard-dobai/"
        target="_blank"
      >
        <span className="hidden md:inline">LinkedIn</span>
        <Image
          src={linkedin}
          alt="linkedin"
          className="w-5 min-w-[1.25rem] mx-1 shrink-0 inline align-baseline"
        />
      </Link>
    </footer>
  );
};

export default Footer;
