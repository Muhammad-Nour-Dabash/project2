import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate({ to: "/login" });
    } catch {
      alert("❌ Logout failed");
    }
  };

  return (
    <button
      style={{
        width: "100%",
        height: "32px",
      }}
      onClick={handleLogout}
      className="flex items-center gap-2 text-white mt-6 hover:opacity-80"
    >
      <LogOut size={16} />
      Logout
    </button>
  );
}
