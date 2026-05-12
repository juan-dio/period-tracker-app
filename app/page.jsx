import Sidebar from "@/components/Sidebar";
import DashboardContent from "@/components/DashboardContent";
import { getPredictedCyclesAction } from "@/lib/actions/cycles";
import { formatDate } from "@/lib/utils";

export default async function Dashboard() {
  const result = await getPredictedCyclesAction();
  const todayKey = formatDate(new Date());
  if (result.errors) {
    console.error("Error loading cycles:", result.errors);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <DashboardContent summary={result.predictions} todayKey={todayKey} />
    </div>
  );
}
