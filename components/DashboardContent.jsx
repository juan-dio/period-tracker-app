"use client";

import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function DashboardContent({ user, summary, recentCycles }) {
  const {
    lastPeriod,
    meanCycleLength = 28,
    meanPeriodLength = 5,
    lutealPhaseLength = 14,
    predictions = [],
  } = summary || {};

  const today = new Date();
  const todayKey = formatDate(new Date());
  const dayMs = 1000 * 60 * 60 * 24;
  const recentSymptoms = recentCycles.symptoms || [];

  const symptomOptions = [
    { id: "cramps", label: "Cramps", icon: "sentiment_stressed" },
    { id: "headache", label: "Headache", icon: "sick" },
    { id: "bloating", label: "Bloating", icon: "grain" },
    { id: "fatigue", label: "Fatigue", icon: "battery_very_low" },
  ];

  // Ambil prediksi period terdekat setelah hari ini
  let nextPeriod = null;
  for (const prediction of predictions) {
    if (prediction.period.start >= todayKey) {
      nextPeriod = prediction.period;
      break;
    }
  }

  // Jika tidak ada, pakai terakhir
  if (!nextPeriod && predictions.length > 0) {
    nextPeriod = predictions[predictions.length - 1].period;
  }

  // Ambil prediksi ovulasi terdekat setelah hari ini
  let nextOvulation = null;
  for (const prediction of predictions) {
    if (prediction.ovulation >= todayKey) {
      nextOvulation = prediction.ovulation;
      break;
    }
  }

  // Jika tidak ada, pakai terakhir
  if (!nextOvulation && predictions.length > 0) {
    nextOvulation = predictions[predictions.length - 1].ovulation;
  }

  // Days until ovulation
  const nextOvulationDays = nextOvulation
    ? Math.ceil((new Date(nextOvulation) - today) / (1000 * 60 * 60 * 24))
    : null;

  // Days until next period
  const nextPeriodDays = nextPeriod
    ? Math.ceil((new Date(nextPeriod.start) - today) / (1000 * 60 * 60 * 24))
    : null;

  // Current cycle day selalu dibatasi dalam 1..meanCycleLength
  const daysSinceLastPeriod = lastPeriod
    ? Math.floor((today - new Date(lastPeriod.start)) / dayMs)
    : null;

  const currentCycle =
    daysSinceLastPeriod !== null
      ? (Math.max(daysSinceLastPeriod, 0) % meanCycleLength) + 1
      : null;

  // Current phase
  const currentPhase = (() => {
    if (!lastPeriod)
      return {
        phase: "Unknown Phase",
        message: "No period data available to determine current phase.",
      };

    const cycleDay = currentCycle;

    if (!cycleDay) {
      return {
        phase: "Unknown Phase",
        message: "No period data available to determine current phase.",
      };
    }

    // menstrual
    if (cycleDay <= meanPeriodLength) {
      return {
        phase: "Menstrual Phase",
        message: "It's your period. Rest and take care of yourself.",
      };
    }

    const ovulationDay = meanCycleLength - lutealPhaseLength;

    if (cycleDay < ovulationDay) {
      return {
        phase: "Follicular Phase",
        message:
          "Energy levels may be rising. It's a great time for creativity and planning.",
      };
    }

    if (cycleDay === ovulationDay) {
      return {
        phase: "Ovulation Phase",
        message: "Ovulation is happening today. Stay hydrated and take care!",
      };
    }

    return {
      phase: "Luteal Phase",
      message: "The luteal phase is here. It's a time for rest and reflection.",
    };
  })();

  // cycle progress percentage
  const currentCyclePercentage = currentCycle
    ? Math.min((currentCycle / meanCycleLength) * 100, 100)
    : 0;

  // time
  let timeOfDay;
  const hour = new Date().getHours();
  if (hour < 12) {
    timeOfDay = "Morning";
  } else if (hour < 18) {
    timeOfDay = "Afternoon";
  } else {
    timeOfDay = "Evening";
  }

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-10" suppressHydrationWarning>
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold leading-tight text-text-light sm:text-3xl">
              Good {timeOfDay}, {user.email.split("@")[0]}!
            </h1>
            <p className="text-text-muted-light text-base font-normal leading-normal">
              Here is your cycle summary for today.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-card-light p-6 rounded-xl border border-border-light">
              <div className="flex flex-col sm:flex-row items-center justify-start gap-6">
                <div className="relative h-32 w-32 shrink-0 sm:h-40 sm:w-40">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      className="stroke-current text-gray-200"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="3"
                    ></path>
                    <path
                      className="stroke-current text-primary"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeDasharray={`${currentCyclePercentage}, 100`}
                      strokeLinecap="round"
                      strokeWidth="3"
                    ></path>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <p className="text-text-muted-light text-sm">Day</p>
                    <p className="text-3xl font-bold text-text-light sm:text-4xl">
                      {currentCycle ?? "-"}
                    </p>
                    <p className="text-text-muted-light text-sm">
                      of {meanCycleLength}{" "}
                    </p>
                  </div>
                </div>
                <div className="flex w-full grow flex-col items-start justify-center gap-1">
                  <p className="text-text-muted-light text-xs font-medium uppercase tracking-wider">
                    CURRENT CYCLE
                  </p>
                  <p className="text-xl font-bold leading-tight text-text-light sm:text-2xl">
                    You&apos;re in your {currentPhase.phase}
                  </p>
                  <p className="text-text-muted-light text-base font-normal leading-normal max-w-md">
                    {currentPhase.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card-light p-6 rounded-xl border border-border-light">
              <h2 className="text-text-light text-lg font-bold leading-tight mb-4">
                Recent Symptoms
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {recentSymptoms.map((symptom) => (
                  <div
                    key={symptom}
                    className="flex items-center gap-3 rounded-lg p-3 bg-background-light"
                  >
                    <div className="flex items-center justify-center size-8 rounded-full bg-primary-light text-primary">
                      <span className="material-symbols-outlined text-base">
                        {symptomOptions.find((s) => s.id === symptom)?.icon ||
                          "help"}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-text-light">
                      {symptomOptions.find((s) => s.id === symptom)?.label ||
                        symptom}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Upcoming Predictions */}
            <div className="bg-card-light p-6 rounded-xl border border-border-light">
              <h2 className="text-text-light text-lg font-bold leading-tight mb-4">
                Upcoming Predictions
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-1 flex-col gap-1 rounded-lg bg-background-light p-4">
                  <p className="text-sm font-medium text-text-muted-light">
                    Predicted Ovulation
                  </p>
                  <p className="text-xl font-bold leading-tight tracking-light text-text-light sm:text-2xl">
                    {nextOvulationDays !== null
                      ? `in ${nextOvulationDays} days`
                      : "Not enough data yet"}
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-1 rounded-lg bg-background-light p-4">
                  <p className="text-sm font-medium text-text-muted-light">
                    Next Period Starts
                  </p>
                  <p className="text-xl font-bold leading-tight tracking-light text-text-light sm:text-2xl">
                    {nextPeriodDays !== null
                      ? `in ${nextPeriodDays} days`
                      : "Not enough data yet"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary-light p-6 rounded-xl">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center justify-center size-10 rounded-full bg-primary text-white">
                  <span className="material-symbols-outlined">
                    edit_calendar
                  </span>
                </div>
                <h3 className="text-text-light font-bold">
                  Log Today&apos;s Data
                </h3>
                <p className="text-text-muted-light text-sm">
                  Logging your feelings and symptoms helps improve prediction
                  accuracy.
                </p>
                <Link
                  href="/tracker"
                  className="w-full bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary/80 transition-colors cursor-pointer"
                >
                  Log Today&apos;s Feelings & Symptoms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
