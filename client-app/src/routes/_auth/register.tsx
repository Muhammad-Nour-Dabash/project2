import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import illustration from "@/assets/register.svg";
import { useAuth } from "@/hooks/useAuth";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Lock, Mail, User } from "lucide-react";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
});

export default function RegisterPage() {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      navigate({ to: "/" });
    }
  }, [loading, isLoggedIn, navigate]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!form.username.trim()) newErrors.username = "Username is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format.";
    if (!form.password) newErrors.password = "Password is required.";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!form.agree) newErrors.agree = "You must agree to the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

    if (!validate()) return;

    setLoading(true); // 🔄 Start spinner

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Registered successfully!");
        setTimeout(() => navigate({ to: "/login" }), 1500);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch {
      setMessage("❌ Network error");
    } finally {
      setLoading(false); // ✅ Stop spinner
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
        {/* Left illustration */}
        <div className="w-1/2 bg-white hidden md:flex items-center justify-center p-4">
          <img
            src={illustration}
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Right form */}
        <div className="w-full md:w-1/2 p-8 space-y-4">
          <h2 className="text-3xl font-bold mb-4">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <InputWithIcon
                name="firstName"
                placeholder="Enter First Name"
                value={form.firstName}
                onChange={handleChange}
                icon={User}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div>
              <InputWithIcon
                name="lastName"
                placeholder="Enter Last Name"
                value={form.lastName}
                onChange={handleChange}
                icon={User}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>

            <div>
              <InputWithIcon
                name="username"
                placeholder="Enter Username"
                value={form.username}
                onChange={handleChange}
                icon={User}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            <div>
              <InputWithIcon
                name="email"
                type="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
                icon={Mail}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <InputWithIcon
                name="password"
                type="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                icon={Lock}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div>
              <InputWithIcon
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                icon={Lock}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agree"
                checked={form.agree}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, agree: !!checked }))
                }
              />
              <Label htmlFor="agree">I agree to all terms</Label>
            </div>
            {errors.agree && (
              <p className="text-red-500 text-sm">{errors.agree}</p>
            )}

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
                  Registering...
                </span>
              ) : (
                "Register"
              )}
            </Button>

            {message && (
              <p className="text-center text-sm mt-2 text-red-600">{message}</p>
            )}

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
