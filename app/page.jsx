import Sidebar from "@/components/Sidebar";
import DashboardContent from "@/components/DashboardContent";
import {
  getPredictedCyclesAction,
  getRecentCyclesAction,
} from "@/lib/actions/cycles";
import { formatDate } from "@/lib/utils";
import { getUserSession } from "@/lib/actions/auth";

export default async function Dashboard() {
  const user = await getUserSession();
  if (!user) {
    console.warn("User not authenticated. Redirecting to login.");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Please log in to view your dashboard.</p>
      </div>
    );
  }

  const result = await getPredictedCyclesAction();

  if (result.errors) {
    console.error("Error loading cycles:", result.errors);
  }

  const recentCycle = await getRecentCyclesAction();

  if (recentCycle.errors) {
    console.error("Error loading recent cycles:", recentCycle.errors);
  }
  console.log("Recent cycles:", recentCycle.data);

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} />
      <DashboardContent
        user={user}
        summary={result.data}
        recentCycles={recentCycle.data}
      />
    </div>
  );
}
