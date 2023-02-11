import Link from "next/link";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-gray-800 shadow md:flex md:items-center md:justify-between md:p-2.5">
      <span className="text-[15px] text-[#e8e8e8] sm:text-center">
        © 2023{" "}
        <a href="/" className="hover:text-[#009ac9]">
          PKDR Finance™
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-[15px] text-[#e8e8e8] sm:mt-0">
        <li>
          <Link href="/pkdrInfo/about"  className="mr-4 hover:underline md:mr-6 ">
            About
          </Link>
        </li>
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">
            Licensing
          </a>
        </li>
        <li>
          <Link href="/pkdrInfo/contact" className="hover:underline">
            Contact
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
