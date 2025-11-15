"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-background">
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-background-secondary lg:block"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <div className="hidden sm:mb-10 sm:flex">
                  <div className="relative rounded-full px-3 py-1 text-sm/6 text-foreground-secondary ring-1 ring-border hover:ring-border/80">
                    Anim aute id magna aliqua ad ad non deserunt sunt.{" "}
                    <a
                      href="#"
                      className="whitespace-nowrap font-semibold text-primary"
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      Read more <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
                <h1 className="text-pretty text-5xl font-display tracking-tight text-foreground sm:text-7xl">
                  Grow with knowledge and opportunity
                </h1>
                <p className="mt-8 text-pretty text-lg font-medium text-foreground-secondary sm:text-xl/8">
                  Connecting cannabis opportunities for applicants and investors
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link href="/features" className="btn-primary">
                    Get started
                  </Link>

                  <Link
                    href="/company"
                    className="text-sm/6 font-semibold text-foreground hover:text-primary"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-background-secondary lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            src="/sgHeroNoWordsMobile.png"
            alt=""
            className="aspect-[3/2] object-cover lg:aspect-auto lg:size-full"
            width={1587}
            height={1058}
          />
        </div>
      </div>
    </div>
  );
}
