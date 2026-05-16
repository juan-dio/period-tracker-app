"use client";

import Logo from "@/components/Logo";
import { signUpAction } from "@/lib/actions/auth";
import Link from "next/link";
import { useActionState, useState } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [state, formAction, isPending] = useActionState(signUpAction, {
    errors: {},
  });

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center px-4 py-5 sm:px-6 md:px-40">
          <div className="layout-content-container flex w-full flex-col max-w-md sm:max-w-sm md:max-w-[480px]">
            <div className="flex flex-col items-center justify-center p-4">
              <div className="flex justify-center">
                <Logo />
              </div>

              <div className="w-full">
                <div className="flex flex-wrap justify-between gap-2 p-3 text-center sm:gap-3 sm:p-4">
                  <div className="flex w-full flex-col gap-2 sm:gap-3">
                    <p className="text-2xl font-black leading-tight tracking-[-0.033em] text-text-light font-display sm:text-3xl md:text-4xl">
                      Create account
                    </p>
                    <p className="text-sm font-normal leading-normal text-slate-500 font-display sm:text-base">
                      Sign up to start tracking your cycle
                    </p>
                  </div>
                </div>

                <form action={formAction}>
                  <div className="flex w-full flex-wrap items-end gap-3 px-4 py-2 sm:gap-4 sm:py-3">
                    <label className="flex w-full flex-col">
                      <p className="text-sm font-medium leading-normal pb-2 text-text-light font-display sm:text-base">
                        Email
                      </p>
                      <input
                        type="email"
                        name="email"
                        className="flex w-full resize-none overflow-hidden rounded-xl border-none bg-slate-200 p-3 text-sm text-text-light placeholder:text-slate-500 focus:border-none focus:outline-0 focus:ring-0 font-display h-12 sm:h-14 sm:p-4 sm:text-base"
                        placeholder="Enter your email"
                      />
                      {state.errors?.email && (
                        <p className="mt-2 text-sm text-red-500">
                          {state.errors.email}
                        </p>
                      )}
                    </label>
                  </div>

                  <div className="flex w-full flex-wrap items-end gap-3 px-4 py-2 sm:gap-4 sm:py-3">
                    <label className="flex w-full flex-col">
                      <p className="text-sm font-medium leading-normal pb-2 text-text-light font-display sm:text-base">
                        Password
                      </p>
                      <div className="flex w-full flex-1 items-stretch rounded-xl">
                        <input
                          name="password"
                          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-xl border-none border-r-0 bg-slate-200 p-3 text-sm text-text-light placeholder:text-slate-500 focus:border-none focus:outline-0 focus:ring-0 rounded-r-none font-display pr-2 h-12 sm:h-14 sm:p-4 sm:text-base"
                          placeholder="Create a password"
                          type={showPassword ? "text" : "password"}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-slate-500 flex border-none bg-slate-200 items-center justify-center pr-4 rounded-r-xl border-l-0 transition-colors cursor-pointer"
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

                  <div className="flex w-full flex-wrap items-end gap-3 px-4 py-2 sm:gap-4 sm:py-3">
                    <label className="flex w-full flex-col">
                      <p className="text-sm font-medium leading-normal pb-2 text-text-light font-display sm:text-base">
                        Confirm Password
                      </p>
                      <div className="flex w-full flex-1 items-stretch rounded-xl">
                        <input
                          name="confirm_password"
                          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-xl border-none border-r-0 bg-slate-200 p-3 text-sm text-text-light placeholder:text-slate-500 focus:border-none focus:outline-0 focus:ring-0 rounded-r-none font-display pr-2 h-12 sm:h-14 sm:p-4 sm:text-base"
                          placeholder="Confirm your password"
                          type={showPasswordConfirm ? "text" : "password"}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswordConfirm(!showPasswordConfirm)
                          }
                          className="text-slate-500 flex border-none bg-slate-200 items-center justify-center pr-4 rounded-r-xl border-l-0 transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined">
                            {showPasswordConfirm
                              ? "visibility_off"
                              : "visibility"}
                          </span>
                        </button>
                      </div>
                      {state.errors?.confirm_password && (
                        <p className="mt-2 text-sm text-red-500">
                          {state.errors.confirm_password}
                        </p>
                      )}
                    </label>
                  </div>

                  {state.errors?.auth && (
                    <p className="text-red-500 text-sm px-4">
                      {state.errors.auth}
                    </p>
                  )}

                  <div className="flex w-full justify-center px-4 py-2 sm:py-3">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-primary px-5 py-3 text-sm font-bold leading-normal text-white tracking-[0.015em] transition-colors hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50 font-display sm:py-4 sm:text-base h-12 sm:h-14"
                    >
                      <span className="truncate">
                        {isPending ? "Signing up..." : "Sign Up"}
                      </span>
                    </button>
                  </div>
                </form>

                <div className="flex items-center justify-center px-4 py-2 sm:mt-2 sm:py-3">
                  <p className="text-xs text-slate-500 font-normal leading-normal font-display sm:text-sm">
                    Already have an account?{" "}
                    <Link
                      className="font-bold text-primary hover:underline"
                      href="/login"
                    >
                      Login
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
