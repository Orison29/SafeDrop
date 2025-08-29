"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const Router = useRouter();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
    credentials: "include", // for cookies
  });
  const data = await res.json();
  console.log(data);
  // handle response (show message, redirect, etc.)

  if (res.ok) {
    // Registration successful
    console.log("Registration successful:", data);
    Router.push("/signin");
  } else {
    // Registration failed
    console.error("Registration failed:", data);
  }
};


  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 p-6">SafeDrop</h1>
      <div className="font-sans  flex flex-col items-center justify-center p-8 pt-16 bg-black-600">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-4xl font-bold mb-6 text-center">Sign Up</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
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
              Sign Up
            </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account? <Link href="/signin" className="text-blue-500">
              Sign In
            </Link>
        </p>
      </div>
    </div>
    </div>
  );
}