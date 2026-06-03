"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit = async (values: LoginFormValues) => {
    setPending(true);
    setError("");

    try {
      if (!auth) {
        throw new Error("Firebase authentication is not available.");
      }

      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push("/admin/dashboard");
    } catch (error) {
      setError("Could not sign in. Please check your credentials.");
      console.error("Admin login failed", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 text-slate-900">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold">Clinic Admin login</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to update website content and manage clinic data.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <label className="block text-sm font-semibold text-slate-700">
            Email
            <input
              type="email"
              {...register("email", { required: true })}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Password
            <input
              type="password"
              {...register("password", { required: true })}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button type="submit" disabled={pending} className="w-full rounded-xl">
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
