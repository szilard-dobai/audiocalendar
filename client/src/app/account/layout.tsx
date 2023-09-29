"use client";

import Logout from "@/components/LogoutButton";
import QueryClientProvider from "@/components/QueryClientProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

const PAGES = [
  { href: "/account", label: "Home" },
  { href: "/account/settings", label: "Settings" },
];

const AccountLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <QueryClientProvider>
        <ul className="flex items-center gap-6 mb-12">
          {PAGES.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`cursor-pointer hover:font-semibold ${
                  pathname === href ? "text-brand" : "text-primary"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}

          <Logout className="ml-auto" />
        </ul>

        {children}
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default AccountLayout;
