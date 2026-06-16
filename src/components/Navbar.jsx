import { BsGithub } from "react-icons/bs";
import { Link } from "@/components/BaseKit";
import { LangSwitcher } from "./Lang";
import { IoMenuOutline } from "react-icons/io5";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-100 py-2 bg-base-200 shadow-sm w-full rounded-none flex justify-between">
      <div className="flex-none">
        <Link className="btn btn-ghost text-xl font-normal" href="/">
          easy-three
        </Link>
        <Link
          className="btn btn-ghost px-2"
          href="https://github.com/masabando/easy-three"
        >
          <BsGithub style={{ fontSize: "180%" }} />
        </Link>
      </div>
      <div className="flex-none flex items-center gap-4 px-4">
        <LangSwitcher />
        <label
          htmlFor="menuSidebar"
          className="btn btn-ghost md:hidden px-1"
        >
          <IoMenuOutline style={{ fontSize: "180%" }} />
        </label>
      </div>
    </div>
  );
}

