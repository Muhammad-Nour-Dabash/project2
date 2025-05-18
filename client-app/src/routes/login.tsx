import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import illustration from "@/assets/login.svg"; // change this if you have a different file
import { Lock, Mail } from "lucide-react";
import { InputWithIcon } from "@/components/ui/input-with-icon";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Logged in!");
        setTimeout(() => navigate({ to: "/" }), 1000);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch {
      setMessage("❌ Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex items-center justify-center bg-red-200 p-6"
    >
      <div className="bg-white rounded-2xl shadow-lg flex w-full max-w-5xl overflow-hidden relative z-10">
        {/* Left Form */}
        <div className="w-full md:w-1/2 p-8 space-y-4">
          <h2 className="text-3xl font-bold mb-4">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputWithIcon
              icon={Mail}
              type="email"
              name="email"
              value={form.email}
              placeholder="Enter Email"
              onChange={handleChange}
              disabled={isLoading}
            />
            <InputWithIcon
              icon={Lock}
              name="password"
              type="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              disabled={isLoading}
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={form.remember}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, remember: !!checked }))
                }
              />
              <Label htmlFor="remember">Remember Me</Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-400 hover:bg-red-500 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>

            {message && (
              <p className="text-center text-sm mt-2 text-red-600">{message}</p>
            )}

            <div className="text-center text-sm mt-4">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Create One
              </Link>
            </div>
          </form>
        </div>

        {/* Right illustration */}
        <div className="w-1/2 hidden md:flex items-center justify-center p-4">
          <img
            src={illustration}
            alt="Login illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
