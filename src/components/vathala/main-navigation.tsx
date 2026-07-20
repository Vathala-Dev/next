"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { navServicesMenuLinks } from "@/lib/vathala-services";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/contact-us", label: "Contact Us" },
] as const;

const desktopNavLinkOnHero =
  "nav-link inline-flex min-h-11 items-center gap-1 text-[20px] font-medium text-white transition-colors hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const desktopNavLinkOnLight =
  "nav-link inline-flex min-h-11 items-center gap-1 text-[20px] font-medium text-vathala-forest transition-colors hover:text-vathala-forest/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest";

type MainNavigationProps = {
  /** Force forest green nav links (defaults to on for every page except home). */
  lightHeader?: boolean;
};

export const MainNavigation = ({ lightHeader }: MainNavigationProps) => {
  const pathname = usePathname();
  const onLightBackground = lightHeader ?? pathname !== "/";
  const desktopNavLinkClass = onLightBackground
    ? desktopNavLinkOnLight
    : desktopNavLinkOnHero;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const mobileMenuRootRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileDropdownRef = useRef<HTMLDivElement | null>(null);
  const [menuPanelStyle, setMenuPanelStyle] = useState<CSSProperties>({});
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileMenuOpenRef = useRef(false);
  const scrollHideOffsetRef = useRef(0);
  const [scrolled, setScrolled] = useState(false);
  const [scrollHideOffset, setScrollHideOffset] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  mobileMenuOpenRef.current = mobileMenuOpen;

  useEffect(() => {
    if (mobileMenuOpen) {
      scrollHideOffsetRef.current = scrollHideOffset;
    }
  }, [mobileMenuOpen, scrollHideOffset]);

  useEffect(() => {
    const updateHeaderScroll = () => {
      const y = window.scrollY;
      const height = headerRef.current?.offsetHeight ?? 0;
      setHeaderHeight(height);
      setScrolled(y > 48);

      if (mobileMenuOpenRef.current) {
        setScrollHideOffset(scrollHideOffsetRef.current);
        return;
      }

      const offset = -Math.min(Math.max(y, 0), height);
      scrollHideOffsetRef.current = offset;
      setScrollHideOffset(offset);
    };

    updateHeaderScroll();
    window.addEventListener("scroll", updateHeaderScroll, { passive: true });
    window.addEventListener("resize", updateHeaderScroll);

    return () => {
      window.removeEventListener("scroll", updateHeaderScroll);
      window.removeEventListener("resize", updateHeaderScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileServicesOpen(false);
      return;
    }

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      const inTrigger = mobileMenuRootRef.current?.contains(target);
      const inPanel = mobileDropdownRef.current?.contains(target);
      if (!inTrigger && !inPanel) {
        setMobileMenuOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    let listenersAttached = false;
    const openFrame = requestAnimationFrame(() => {
      listenersAttached = true;
      window.addEventListener("mousedown", onPointerDown);
      window.addEventListener("touchstart", onPointerDown, { passive: true });
      window.addEventListener("keydown", onKeyDown);
    });

    return () => {
      cancelAnimationFrame(openFrame);
      if (listenersAttached) {
        window.removeEventListener("mousedown", onPointerDown);
        window.removeEventListener("touchstart", onPointerDown);
        window.removeEventListener("keydown", onKeyDown);
      }
    };
  }, [mobileMenuOpen]);

  const updateMenuPanelPosition = useCallback(() => {
    const button = mobileMenuButtonRef.current;
    if (!button || !mobileMenuOpenRef.current) return;

    const rect = button.getBoundingClientRect();
    const gap = 8;
    const edgeMargin = 12;
    const top = rect.bottom + gap;
    const maxHeight = Math.max(160, window.innerHeight - top - edgeMargin);

    setMenuPanelStyle({
      position: "fixed",
      top,
      right: Math.max(edgeMargin, window.innerWidth - rect.right),
      width: Math.min(264, window.innerWidth - edgeMargin * 2),
      maxHeight,
    });
  }, []);

  useLayoutEffect(() => {
    if (!mobileMenuOpen) {
      setMenuPanelStyle({});
      return;
    }

    updateMenuPanelPosition();
    window.addEventListener("resize", updateMenuPanelPosition);
    window.addEventListener("scroll", updateMenuPanelPosition, { passive: true });

    return () => {
      window.removeEventListener("resize", updateMenuPanelPosition);
      window.removeEventListener("scroll", updateMenuPanelPosition);
    };
  }, [mobileMenuOpen, mobileServicesOpen, updateMenuPanelPosition]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isHeaderFullyHidden =
    !mobileMenuOpen && headerHeight > 0 && Math.abs(scrollHideOffset) >= headerHeight - 1;

  return (
    <>
      <header
        ref={headerRef}
        style={{ transform: `translate3d(0, ${scrollHideOffset}px, 0)` }}
        className={`nav-overlay fixed inset-x-0 top-0 z-50 overflow-visible bg-transparent will-change-transform ${
          onLightBackground ? "nav-overlay--light" : ""
        } ${isHeaderFullyHidden ? "pointer-events-none" : ""} ${
          scrolled ? "nav-scrolled border-b border-black/5" : "border-b border-transparent"
        }`}
      >
        <div className="relative min-h-14 w-full overflow-visible sm:min-h-16">
          <Link
            href="/"
            className="absolute left-3 top-1/2 z-[1] flex h-14 w-max -translate-y-1/2 shrink-0 items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest sm:left-4 sm:h-16 sm:gap-3 lg:left-6 xl:left-8"
            aria-label="VaThala home"
            onClick={closeMobileMenu}
          >
            <span className="nav-logo-mark flex size-10 shrink-0 items-center justify-center rounded-full sm:size-12">
              <span className="nav-logo-mark__letter font-heading font-bold" aria-hidden>
                V
              </span>
            </span>
            <span className="nav-logo-text whitespace-nowrap font-heading text-2xl font-bold tracking-tight text-vathala-forest sm:text-4xl lg:text-[2.75rem] lg:leading-none">
              VaThala
            </span>
          </Link>

          <nav
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-12 lg:flex xl:gap-14"
            aria-label="Primary"
          >
            <div className="pointer-events-auto relative group">
              <Link href="/#services" className={desktopNavLinkClass}>
                Services
                <ChevronDown className="size-4 opacity-70" aria-hidden />
              </Link>
              <div className="pointer-events-none absolute left-1/2 top-full z-[100] w-72 max-w-[85vw] -translate-x-1/2 pt-3 opacity-0 translate-y-2 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0">
                <div
                  role="menu"
                  className="vathala-services-dropdown-glass p-2 text-vathala-forest"
                >
                  <div className="flex flex-col gap-1">
                    {navServicesMenuLinks.map((s) => (
                      <Link
                        key={s.slug}
                        href={s.path}
                        role="menuitem"
                        className="min-h-[44px] rounded-xl px-4 py-2 text-left text-base font-semibold text-vathala-forest transition-colors hover:bg-vathala-band"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`pointer-events-auto ${desktopNavLinkClass}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden min-h-16 lg:block" aria-hidden />
        </div>
      </header>

      {/* Mobile: right-aligned menu trigger + dropdown */}
      <div
        ref={mobileMenuRootRef}
        className="fixed left-auto right-4 top-0 z-[70] flex h-14 w-auto items-center justify-end overflow-visible pt-[env(safe-area-inset-top,0px)] sm:right-6 sm:h-16 lg:hidden"
      >
        <button
          ref={mobileMenuButtonRef}
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="nav-mobile-menu-trigger inline-flex size-12 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest sm:size-[3.25rem]"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-panel"
          aria-haspopup="true"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="size-5 stroke-[2.25]" aria-hidden />
          ) : (
            <Menu className="size-5 stroke-[2.25]" aria-hidden />
          )}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div
          ref={mobileDropdownRef}
          id="mobile-nav-panel"
          style={menuPanelStyle}
          className="vathala-mobile-nav-dropdown z-[65] overflow-y-auto overscroll-contain px-4 py-3 lg:hidden"
          role="menu"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            onClick={() => setMobileServicesOpen((v) => !v)}
            className="vathala-mobile-nav-dropdown__services-trigger vathala-mobile-nav-dropdown__item-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest"
            aria-expanded={mobileServicesOpen}
          >
            Services
            <ChevronDown
              className={`size-4 shrink-0 text-vathala-forest/70 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
          {mobileServicesOpen ? (
            <div className="vathala-mobile-nav-dropdown__submenu">
              {navServicesMenuLinks.map((s) => (
                <Link
                  key={s.slug}
                  href={s.path}
                  role="menuitem"
                  onClick={closeMobileMenu}
                  className="vathala-mobile-nav-dropdown__submenu-link vathala-mobile-nav-dropdown__item-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          ) : null}

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={closeMobileMenu}
              className="vathala-mobile-nav-dropdown__link vathala-mobile-nav-dropdown__item-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vathala-forest"
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
};
