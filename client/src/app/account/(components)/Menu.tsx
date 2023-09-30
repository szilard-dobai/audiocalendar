"use client";

import GlobalLoader from "@/components/GlobalLoader";
import Logout from "@/components/LogoutButton";
import useGetNotifications from "@/hooks/useGetNotifications";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGES = [
  { href: "/account", label: "Home", showBubble: false },
  { href: "/account/settings", label: "Settings", showBubble: true },
];

const Menu = () => {
  const { data } = useGetNotifications();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-6 mb-12">
      <ul className="flex items-center gap-6">
        {PAGES.map(({ href, label, showBubble }) => (
          <li key={href}>
            <Link
              href={href}
              className={`text-xl cursor-pointer hover:font-semibold ${
                pathname === href ? "text-brand" : "text-primary"
              }`}
            >
              {label}
              {showBubble && !!data?.length && (
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mx-3 -translate-x-1/2 animate-pulse" />
              )}
            </Link>
          </li>
        ))}
      </ul>

      <GlobalLoader />

      <Logout className="ml-auto" />
    </div>
  );
};

export default Menu;
