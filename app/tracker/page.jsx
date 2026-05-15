import Calendar from "@/components/Calendar";
import { getUserSession } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function TrackerPage() {
  const user = await getUserSession();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-6 lg:p-10">
      <Calendar />
    </div>
  );
}
