import DashboardContent from "@/components/DashboardContent";
import {
  getPredictedCyclesAction,
  getRecentCyclesAction,
} from "@/lib/actions/cycles";
import { formatDate } from "@/lib/utils";
import { getUserSession } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getUserSession();
  if (!user) {
    redirect("/login");
  }

  const result = await getPredictedCyclesAction();

  if (result.errors) {
    console.error("Error loading cycles:", result.errors);
  }

  const recentCycle = await getRecentCyclesAction();

  if (recentCycle.errors) {
    console.error("Error loading recent cycles:", recentCycle.errors);
  }

  return (
    <DashboardContent
      user={user}
      summary={result.data}
      recentCycles={recentCycle.data}
    />
  );
}
