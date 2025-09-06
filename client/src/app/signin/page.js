"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const Router = useRouter();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include", // for cookies
    });
    const data = await res.json();
    if (res.ok) {
      // Sign-in successful
      console.log("Sign-in successful:", data);
      Router.push("/dashboard");
    } else {
      // Sign-in failed
      setValue(data.message || "Sign-in failed");
      console.error("Sign-in failed:", data);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 p-6">SafeDrop</h1>
      <div className="font-sans flex flex-col items-center justify-center p-8 pt-16 bg-black-600">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-4xl font-bold mb-6 text-center">Sign In</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={form.email}
              onChange={handleChange}
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-center text-red-600">{value}</p>
          <p className="mt-4 text-center text-gray-400">
            Don't have an account?{" "}
            <Link href="/" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
    );
}