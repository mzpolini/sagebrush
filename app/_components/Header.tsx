"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const navigation = [
  { name: "Features", href: "/features" },
  { name: "Company", href: "/company" },
  { name: "FAQ", href: "/faq" },
  
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoaded } = useUser();

  return (
    <header className="bg-background">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex flex-1">
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-foreground hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground-secondary"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
          <span className="sr-only">Sagebrush</span>
          <svg width="32" height="32" viewBox="0 0 120 80" className="h-8 w-auto">
            {/* Chart bars that look like growing plants */}
            <rect x="10" y="50" width="15" height="30" fill="#22c55e" rx="2" opacity="0.6" />
            <rect x="35" y="35" width="15" height="45" fill="#22c55e" rx="2" opacity="0.75" />
            <rect x="60" y="20" width="15" height="60" fill="#22c55e" rx="2" opacity="0.9" />
            <rect x="85" y="10" width="15" height="70" fill="#22c55e" rx="2" />
            {/* Leaf on top of tallest bar */}
            <circle cx="92" cy="8" r="6" fill="#10b981" />
            <path d="M 92 8 Q 95 5 98 8" stroke="#10b981" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-xl font-bold tracking-tight text-foreground hidden sm:block">
            Sagebrush
          </span>
        </Link>
        <div className="flex flex-1 justify-end">
          {isLoaded && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/profile"
                    className="text-sm/6 font-semibold text-foreground hover:text-primary"
                  >
                    Profile
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button className="text-sm/6 font-semibold text-foreground hover:text-primary">
                    Log in <span aria-hidden="true">&rarr;</span>
                  </button>
                </SignInButton>
              )}
            </>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-background px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-1">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-foreground-secondary"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <Link href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
              <span className="sr-only">Sagebrush</span>
              <svg width="32" height="32" viewBox="0 0 120 80" className="h-8 w-auto">
                {/* Chart bars that look like growing plants */}
                <rect x="10" y="50" width="15" height="30" fill="#22c55e" rx="2" opacity="0.6" />
                <rect x="35" y="35" width="15" height="45" fill="#22c55e" rx="2" opacity="0.75" />
                <rect x="60" y="20" width="15" height="60" fill="#22c55e" rx="2" opacity="0.9" />
                <rect x="85" y="10" width="15" height="70" fill="#22c55e" rx="2" />
                {/* Leaf on top of tallest bar */}
                <circle cx="92" cy="8" r="6" fill="#10b981" />
                <path d="M 92 8 Q 95 5 98 8" stroke="#10b981" strokeWidth="2" fill="none" />
              </svg>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Sagebrush
              </span>
            </Link>
            <div className="flex flex-1 justify-end">
              {isLoaded && user ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal">
                  <button className="text-sm/6 font-semibold text-foreground hover:text-primary">
                    Log in <span aria-hidden="true">&rarr;</span>
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-foreground hover:bg-background-secondary"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
