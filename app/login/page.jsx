"use client";

import { loginAction } from "@/lib/actions/auth";
import Link from "next/link";
import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useActionState(loginAction, { errors: {} });

  const searchParams = useSearchParams();
  const registered = searchParams?.get("registered") === "true";
  const needsConfirmation = searchParams?.get("needs_confirmation") === "true";

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[480px] flex-1">
            <div className="flex flex-col items-center justify-center p-4">
              <div className="flex items-center gap-2 mb-8">
                <span className="material-symbols-outlined text-primary text-4xl">
                  cycle
                </span>
                <span className="text-2xl font-bold font-display text-slate-800">
                  Femina
                </span>
              </div>
              <div className="w-full">
                <div className="flex flex-wrap justify-between gap-3 p-4 text-center">
                  <div className="flex w-full flex-col gap-3">
                    <p className="text-slate-800 text-4xl font-black leading-tight tracking-[-0.033em] font-display">
                      Welcome back
                    </p>
                    <p className="text-slate-500 text-base font-normal leading-normal font-display">
                      Log in to your account
                    </p>
                  </div>
                </div>

                {registered && needsConfirmation && (
                  <div className="mx-4 mb-4 rounded-xl border border-green-200 bg-green-50 p-4">
                    <p className="text-sm font-medium text-green-700 font-display">
                      Signup successful. Check your email to confirm your
                      account before logging in.
                    </p>
                  </div>
                )}

                <form action={formAction}>
                  <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-slate-800 text-base font-medium leading-normal pb-2 font-display">
                        Email
                      </p>
                      <input
                        type="email"
                        name="email"
                        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-800 focus:outline-0 focus:ring-0 border-none bg-slate-200 focus:border-none h-14 placeholder:text-slate-500 p-4 text-base font-normal leading-normal font-display"
                        placeholder="Enter your email"
                      />
                      {state.errors?.email && (
                        <p className="mt-2 text-sm text-red-500">
                          {state.errors.email}
                        </p>
                      )}
                    </label>
                  </div>

                  <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-slate-800 text-base font-medium leading-normal pb-2 font-display">
                        Password
                      </p>
                      <div className="flex w-full flex-1 items-stretch rounded-xl">
                        <input
                          name="password"
                          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-800 focus:outline-0 focus:ring-0 border-none bg-slate-200 focus:border-none h-14 placeholder:text-slate-500 p-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal font-display"
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-slate-500 flex border-none bg-slate-200 items-center justify-center pr-4 rounded-r-xl border-l-0 hover:bg-slate-300 transition-colors"
                        >
                          <span className="material-symbols-outlined">
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                      {state.errors?.password && (
                        <p className="mt-2 text-sm text-red-500">
                          {state.errors.password}
                        </p>
                      )}
                    </label>
                  </div>

                  {state.errors?.auth && (
                    <div className="px-4">
                      <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 font-medium font-display">
                        {state.errors.auth}
                      </p>
                    </div>
                  )}

                  <div className="flex px-4 py-3 justify-center w-full">
                    <button
                      type="submit"
                      className="flex min-w-[84px] w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] font-display hover:bg-blue-600 transition-colors"
                    >
                      <span className="truncate">Login</span>
                    </button>
                  </div>
                </form>

                <p className="text-slate-500 text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline font-display cursor-pointer hover:text-primary">
                  Forgot password?
                </p>

                <div className="flex items-center justify-center mt-6">
                  <p className="text-slate-500 text-sm font-normal leading-normal font-display">
                    Don&apos;t have an account?{" "}
                    <Link
                      className="font-bold text-primary hover:underline"
                      href="/signup"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
