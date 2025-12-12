"use client"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login:", { email, password })
    // Here you’d typically call an API or Auth function
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-white transition hover:bg-gray-800"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="#" className="text-black underline hover:text-gray-800">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
