"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen w-64 shrink-0 overflow-hidden bg-card-light p-6 flex flex-col justify-between border-r border-border-light">
      <div className="flex h-full flex-col gap-8">
        <div className="flex items-center gap-2 px-2">
          <span className="material-symbols-outlined text-primary text-3xl">
            cycle
          </span>
          <h1 className="text-xl font-bold text-text-light">Femina</h1>
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
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3 p-3">
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
        </div>
      </div>
    </aside>
  );
}
