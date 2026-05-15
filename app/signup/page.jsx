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
        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[480px] flex-1">
            <div className="flex flex-col items-center justify-center p-4">
              <div className="flex justify-center">
                <Logo />
              </div>

              <div className="w-full">
                <div className="flex flex-wrap justify-between gap-3 p-4 text-center">
                  <div className="flex w-full flex-col gap-3">
                    <p className="text-text-light text-4xl font-black leading-tight tracking-[-0.033em] font-display">
                      Create account
                    </p>
                    <p className="text-slate-500 text-base font-normal leading-normal font-display">
                      Sign up to start tracking your cycle
                    </p>
                  </div>
                </div>

                <form action={formAction}>
                  <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-text-light text-base font-medium leading-normal pb-2 font-display">
                        Email
                      </p>
                      <input
                        type="email"
                        name="email"
                        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-light focus:outline-0 focus:ring-0 border-none bg-slate-200 focus:border-none h-14 placeholder:text-slate-500 p-4 text-base font-normal leading-normal font-display"
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
                      <p className="text-text-light text-base font-medium leading-normal pb-2 font-display">
                        Password
                      </p>
                      <div className="flex w-full flex-1 items-stretch rounded-xl">
                        <input
                          name="password"
                          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-light focus:outline-0 focus:ring-0 border-none bg-slate-200 focus:border-none h-14 placeholder:text-slate-500 p-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal font-display"
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

                  <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-text-light text-base font-medium leading-normal pb-2 font-display">
                        Confirm Password
                      </p>
                      <div className="flex w-full flex-1 items-stretch rounded-xl">
                        <input
                          name="confirm_password"
                          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text-light focus:outline-0 focus:ring-0 border-none bg-slate-200 focus:border-none h-14 placeholder:text-slate-500 p-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal font-display"
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

                  <div className="flex px-4 py-3 justify-center w-full">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="flex min-w-[84px] w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] font-display hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="truncate">
                        {isPending ? "signing up..." : "Sign Up"}
                      </span>
                    </button>
                  </div>
                </form>

                <div className="flex items-center justify-center mt-6">
                  <p className="text-slate-500 text-sm font-normal leading-normal font-display">
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
