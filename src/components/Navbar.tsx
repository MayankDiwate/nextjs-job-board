import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="shadow-sm">
      <nav className="flex justify-between items-center mx-auto px-3 py-5 max-w-5xl">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={40} height={40} alt="logo" />
          <span className="font-bold text-xl tracking-tight">JobHunt</span>
        </Link>
        <Button asChild>
          <Link href="/job/new">Post Job</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
