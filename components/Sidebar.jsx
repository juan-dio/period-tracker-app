"use client";

import { logoutAction } from "@/lib/actions/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, memo } from "react";
import { createPortal } from "react-dom";
import Logo from "./Logo";

function Sidebar({ user }) {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 shrink-0 overflow-hidden bg-card-light p-6 flex flex-col justify-between border-r border-border-light">
      <div className="flex h-full flex-col gap-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="flex flex-col gap-2">
          <Link
            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${pathname === "/" ? "bg-primary text-white" : "text-text-muted-light hover:bg-gray-100"} transition-colors`}
            href="/"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <p className="text-sm font-medium">Dashboard</p>
          </Link>
          <Link
            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${pathname === "/tracker" ? "bg-primary text-white" : "text-text-muted-light hover:bg-gray-100"} transition-colors`}
            href="/tracker"
          >
            <span className="material-symbols-outlined">calendar_month</span>
            <p className="text-sm font-medium">Cycle Calendar</p>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="p-2 overflow-hidden">
          <p className="text-text-muted-light text-sm font-normal leading-normal">
            {user.email}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-3 rounded-lg px-4 py-2 text-left text-text-muted-light hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">logout</span>
          <p className="text-sm font-medium">Logout</p>
        </button>

        {/* <div className="flex items-center gap-3 p-3">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC7_K4zILQwmdf6NyiqkqQjBitr_kJgN5iZmcU3-5w4abRkzCJPm3t-469NjcXztKgZuZx5Lv44-CFG20j6X4M80crHNg1aVn7Rme-R-ktaDOSm2Vv4heP48--cM1rEwkB5IIOUwLaeGQxMOfgQylejChbpuERCXJM4_SZTfwBdvgdIyd0xMhqJQH5DSJfL0C-rx8s7prSBEaxB-IyqsCcOCKMcev233QFj2-dqOPQHkSlRM3yOBlxW4TEu1f6ZPE9ZdYXfzsAM33I")',
            }}
          ></div>
          <div className="flex flex-col">
            <h1 className="text-text-light text-sm font-medium leading-normal">
              Elena
            </h1>
            <p className="text-text-muted-light text-xs font-normal leading-normal">
              elena@email.com
            </p>
          </div>
        </div> */}
      </div>

      {showLogoutModal &&
        createPortal(
          <div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4 transition-all duration-200 ease-out pointer-events-auto opacity-100"
            onClick={() => setShowLogoutModal(false)}
          >
            <div
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-border-light transform transition-all duration-200 ease-out scale-100 translate-y-0"
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
                  className="flex-1 rounded-lg border border-border-light px-4 py-2 text-sm font-medium text-text-light hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <form action={logoutAction} className="flex-1">
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80 transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </aside>
  );
}

export default memo(Sidebar);
