import { createClient } from "../server";
import { predictFuturePeriods, predictNextPeriod } from "@/lib/predictions";

export async function getCycles(userId) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("cycles").select("*").eq("user_id", userId).order("date", { ascending: true });

  if (error) throw error;

  return data;
}

export async function getCyclesByDate(userId, date) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cycles")
    .select("*")
    .eq("user_id", userId)
    .eq("date", date)
    .single();

  if (error) throw error;

  return data;
}

export async function getCyclesLast6Month(userId) {
  const supabase = await createClient();

  const { data: latestCycle, error: latestError } = await supabase
    .from("cycles")
    .select("date")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (latestError) throw latestError;

  if (!latestCycle) return [];

  const latestDate = new Date(latestCycle.date);
  const sixMonthsAgo = new Date(latestDate);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const { data, error } = await supabase
    .from("cycles")
    .select("*")
    .eq("user_id", userId)
    .gte("date", sixMonthsAgo.toISOString().split("T")[0])
    .lte("date", latestDate.toISOString().split("T")[0])
    .order("date", { ascending: true });

  if (error) throw error;

  return data;
}

export async function addOrUpdateCycle(userId, date, flow, mood, symptoms, activities, notes) {
  const supabase = await createClient();

  const { data: existedData, error: fetchError } = await supabase
    .from("cycles")
    .select("*")
    .eq("user_id", userId)
    .eq("date", date)
    .single();

  if (existedData) {
    // Update existing cycle
    const { data, error } = await supabase
      .from("cycles")
      .update({ flow, mood, symptoms, activities, notes })
      .eq("id", existedData.id)
      .select();

    if (error) throw error;

    return data[0];
  }

  // Create new cycle
  const { data, error } = await supabase
    .from("cycles")
    .insert([{ user_id: userId, date, flow, mood, symptoms, activities, notes }])
    .select();

  if (error) throw error;

  return data[0];
}

export async function deleteCycle(userId, id) {
  const supabase = await createClient();

  const { error } = await supabase.from("cycles").delete().eq("id", id).eq("user_id", userId);

  if (error) throw error;

  return true;
}

export async function predictUserCycle(userId) {
  const cycles = await getCyclesLast6Month(userId);

  if (cycles.length === 0) return null;

  return await predictFuturePeriods(cycles);
}

export async function getRecentCycles(userId) {
  const cycles = await getCyclesLast6Month(userId);

  if (cycles.length === 0) return null;

  const symptoms = cycles
    .map(cycle => cycle.symptoms)
    .flat()
    .filter(Boolean);

  return { symptoms: [...new Set(symptoms)] };
}
