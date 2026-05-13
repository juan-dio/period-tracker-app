import Sidebar from "@/components/Sidebar";
import Calendar from "@/components/Calendar";
import { getUserSession } from "@/lib/actions/auth";

export default async function TrackerPage() {
  const user = await getUserSession();
  if (!user) {
    console.warn("User not authenticated. Redirecting to login.");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">
          Please log in to view the cycle tracker.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} />
      <main className="flex-1 p-6 lg:p-10">
        <Calendar />
      </main>
    </div>
  );
}
