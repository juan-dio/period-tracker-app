import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { getUserSession } from "@/lib/actions/auth";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Period App",
  description: "Track your menstrual cycle and symptoms",
};

export default async function Layout({ children }) {
  const user = await getUserSession();

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-display bg-background-light text-text-light">
        {user ? (
          <div className="min-h-screen">
            <Sidebar user={user} />
            <main className="lg:ml-64">{children}</main>
          </div>
        ) : (
          <>{children}</>
        )}
      </body>
    </html>
  );
}
