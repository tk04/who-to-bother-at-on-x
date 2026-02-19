import { Link, useMatches } from "@tanstack/react-router";
import {
  ChartColumnIncreasing,
  GithubIcon,
  HeartIcon,
  LogOut,
  PlusIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { companyLogos } from "@/components/company-logos";
import { signOut, useSession } from "@/lib/auth-client";
import type { Company } from "@/types/company";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();

  // Get company data if we're on a company page
  const matches = useMatches();
  const companyRoute = matches.find((match) => match.routeId === "/$company");
  const company = companyRoute?.loaderData as Company | undefined;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-zinc-200/80 border-b bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      {/* Main Header */}
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
        {/* Left side - Logo or Sub Navigation */}
        <div className="relative">
          {/* Sub Navigation - Visible when NOT scrolled */}
          <nav
            className={`flex items-center gap-4 transition-all duration-300 ${
              isScrolled
                ? "pointer-events-none -translate-x-4 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <Link
              className="flex items-center gap-2 font-medium text-sm text-zinc-600 transition-colors hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-600"
              to="/contribute"
            >
              <PlusIcon className="size-3.5" />
              <span>Contribute</span>
            </Link>
            <Link
              className="flex items-center gap-2 font-medium text-sm text-zinc-600 transition-colors hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-600"
              to="/sponsors"
            >
              <HeartIcon className="size-3.5" />
              <span>Sponsors</span>
            </Link>
            <Link
              className="flex items-center gap-2 font-medium text-sm text-zinc-600 transition-colors hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-600"
              to="/stats"
            >
              <ChartColumnIncreasing className="size-3.5" />
              <span>Stats</span>
            </Link>
            {session ? (
              <button
                className="flex cursor-pointer items-center gap-2 font-medium text-sm text-zinc-600 transition-colors hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-600"
                onClick={() => signOut()}
                type="button"
              >
                <LogOut className="size-3.5" />
                <span>Sign Out</span>
              </button>
            ) : null}
          </nav>

          {/* Logo / Title - Visible when scrolled */}
          <Link
            className={`absolute top-1/2 left-0 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap text-zinc-900 transition-all duration-300 hover:text-orange-600 dark:text-zinc-100 dark:hover:text-orange-600 ${
              isScrolled
                ? "translate-x-0 opacity-100"
                : "pointer-events-none -translate-x-4 opacity-0"
            }`}
            to="/"
          >
            {company ? (
              // Show "bother at [logo]" for company pages
              <>
                <span className="font-medium text-lg">who to bother at</span>
                <div className="flex items-center [&>svg]:h-[18px] [&>svg]:w-auto">
                  {companyLogos[company.logoType]}
                </div>
              </>
            ) : (
              // Show default "WHO TO BOTHER" for other pages
              <span className="font-medium text-lg">WHO TO BOTHER</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {/* Contribute Button */}
          <a
            aria-label="View the repository on GitHub"
            className="flex items-center gap-1.5 rounded-lg bg-orange-600 p-2 font-medium text-sm text-white transition-colors hover:bg-orange-700 sm:px-3 sm:py-1.5"
            href="https://github.com/kulterryan/who-to-bother-at-on-x"
            rel="noopener noreferrer"
            target="_blank"
          >
            <GithubIcon className="size-4 sm:size-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </div>

      {/* Sub Navigation Bar - Appears on scroll */}
      <div
        className={`overflow-hidden border-zinc-200/80 border-t transition-all duration-300 dark:border-zinc-800/80 ${
          isScrolled ? "max-h-12 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex h-12 max-w-3xl items-center justify-start px-6">
          <nav className="flex items-center gap-4">
            <Link
              className="flex items-center gap-2 font-medium text-sm text-zinc-600 transition-colors hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-600"
              to="/contribute"
            >
              <PlusIcon className="size-3.5" />
              <span>Contribute</span>
            </Link>
            <Link
              className="flex items-center gap-2 font-medium text-sm text-zinc-600 transition-colors hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-600"
              to="/sponsors"
            >
              <HeartIcon className="size-3.5" />
              <span>Sponsors</span>
            </Link>
            <Link
              className="flex items-center gap-2 font-medium text-sm text-zinc-600 transition-colors hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-600"
              to="/stats"
            >
              <ChartColumnIncreasing className="size-3.5" />
              <span>Stats</span>
            </Link>
            {session ? (
              <button
                className="flex cursor-pointer items-center gap-2 font-medium text-sm text-zinc-600 transition-colors hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-600"
                onClick={() => signOut()}
                type="button"
              >
                <LogOut className="size-3.5" />
                <span>Sign Out</span>
              </button>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  );
}
