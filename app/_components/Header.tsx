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
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
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
        </div>
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
        <div className="flex flex-1 items-center justify-end gap-x-6">
          {isLoaded && (
            <>
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="hidden text-sm/6 font-semibold text-foreground hover:text-primary lg:block"
                  >
                    Profile
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="hidden text-sm/6 font-semibold text-foreground hover:text-primary lg:block">
                      Log in
                    </button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <button className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                      Sign up
                    </button>
                  </SignInButton>
                </>
              )}
            </>
          )}
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
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background p-6 sm:max-w-sm sm:ring-1 sm:ring-border">
          <div className="flex items-center gap-x-6">
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
            </Link>
            {isLoaded && !user && (
              <SignInButton mode="modal">
                <button className="ml-auto rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  Sign up
                </button>
              </SignInButton>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-foreground-secondary"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-border">
              <div className="space-y-2 py-6">
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
              <div className="py-6">
                {isLoaded && (
                  <>
                    {user ? (
                      <>
                        <Link
                          href="/profile"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-foreground hover:bg-background-secondary"
                        >
                          Profile
                        </Link>
                        <div className="mt-4 flex justify-center">
                          <UserButton afterSignOutUrl="/" />
                        </div>
                      </>
                    ) : (
                      <SignInButton mode="modal">
                        <button className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-foreground hover:bg-background-secondary w-full text-left">
                          Log in
                        </button>
                      </SignInButton>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
