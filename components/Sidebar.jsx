"use client";

import { logoutAction } from "@/lib/actions/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, memo } from "react";
import { useFormStatus } from "react-dom";
import { createPortal } from "react-dom";
import Logo from "./Logo";

function Sidebar({ user }) {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);

  const handleMenuOpen = () => {
    setIsMobileMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuAnimating(false);
    setTimeout(() => setIsMobileMenuOpen(false), 300);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Trigger animation on next frame after portal renders
      requestAnimationFrame(() => setIsMenuAnimating(true));
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!showLogoutModal) {
      return;
    }

    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;
    const previousBodyOverflow = bodyStyle.overflow;
    const previousHtmlOverflow = htmlStyle.overflow;
    const previousBodyPaddingRight = bodyStyle.paddingRight;
    const previousScrollPosition = window.scrollY;

    // Calculate scrollbar width
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    bodyStyle.overflow = "hidden";
    htmlStyle.overflow = "hidden";
    if (scrollbarWidth > 0) {
      bodyStyle.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      bodyStyle.overflow = previousBodyOverflow;
      htmlStyle.overflow = previousHtmlOverflow;
      bodyStyle.paddingRight = previousBodyPaddingRight;
      window.scrollTo(0, previousScrollPosition);
    };
  }, [showLogoutModal]);

  const navItems = [
    { href: "/", label: "Dashboard", icon: "dashboard" },
    { href: "/tracker", label: "Cycle Calendar", icon: "calendar_month" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border-light bg-card-light px-4 py-3 lg:hidden">
        <Logo />
        <button
          type="button"
          aria-label="Open menu"
          onClick={handleMenuOpen}
          className="flex size-10 items-center justify-center rounded-lg text-text-light hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      <aside className="fixed top-0 left-0 hidden h-screen w-64 shrink-0 overflow-hidden border-r border-border-light bg-card-light p-6 lg:flex lg:flex-col lg:justify-between">
        <div className="flex h-full flex-col gap-8">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${pathname === item.href ? "bg-primary text-white" : "text-text-muted-light hover:bg-gray-100"}`}
                href={item.href}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <p className="text-sm font-medium">{item.label}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="overflow-hidden p-2">
            <p className="text-sm font-normal leading-normal text-text-muted-light">
              {user.email}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2 text-left text-text-muted-light transition-colors hover:bg-gray-100"
          >
            <span className="material-symbols-outlined">logout</span>
            <p className="text-sm font-medium">Logout</p>
          </button>
        </div>
      </aside>

      {isMobileMenuOpen &&
        createPortal(
          <div
            className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ease-in-out lg:hidden ${isMenuAnimating ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={handleMenuClose}
          >
            <aside
              className={`h-full w-72 max-w-[85vw] border-r border-border-light bg-card-light p-5 transform transition-transform duration-300 ease-in-out ${isMenuAnimating ? "translate-x-0" : "-translate-x-full"}`}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={handleMenuClose}
                  className="flex size-10 items-center justify-center rounded-lg text-text-light hover:bg-gray-100 transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${pathname === item.href ? "bg-primary text-white" : "text-text-muted-light hover:bg-gray-100"}`}
                    href={item.href}
                    onClick={handleMenuClose}
                  >
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                    <p className="text-sm font-medium">{item.label}</p>
                  </Link>
                ))}
              </div>

              <div className="mt-8 border-t border-border-light pt-4">
                <p className="truncate px-2 text-sm text-text-muted-light">
                  {user.email}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    handleMenuClose();
                    setShowLogoutModal(true);
                  }}
                  className="mt-2 flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-2 text-left text-text-muted-light transition-colors hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined">logout</span>
                  <p className="text-sm font-medium">Logout</p>
                </button>
              </div>
            </aside>
          </div>,
          document.body,
        )}

      {showLogoutModal &&
        createPortal(
          <div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4 transition-all duration-200 ease-out pointer-events-auto opacity-100"
            onClick={() => setShowLogoutModal(false)}
          >
            <div
              className="w-full max-w-sm rounded-2xl border border-border-light bg-white p-6 shadow-2xl transform transition-all duration-200 ease-out scale-100 translate-y-0"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <span className="material-symbols-outlined">logout</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-text-light">
                    Confirm logout
                  </h2>
                  <p className="mt-1 text-sm text-text-muted-light">
                    Are you sure you want to logout from this account?
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 cursor-pointer rounded-lg border border-border-light px-4 py-2 text-sm font-medium text-text-light transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <form action={logoutAction} className="flex-1">
                  <LogoutButton />
                </form>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Logging out..." : "Logout"}
    </button>
  );
}

export default memo(Sidebar);
