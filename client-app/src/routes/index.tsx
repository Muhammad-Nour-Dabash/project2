import RequireAuth from "@/components/auth/RequireAuth";
import LogoutButton from "@/components/ui/LogoutButton";
import { useAuth } from "@/hooks/useAuth";
import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import clsx from "clsx";
import {
  Bell,
  Calendar,
  CheckSquare,
  HelpCircle,
  LayoutGrid,
  Lightbulb,
  ListChecks,
  Search,
  Settings,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: DashboardIndexPage,
});

function DashboardIndexPage() {
  const navItems = [
    { label: "Dashboard", icon: LayoutGrid, to: "/" },
    { label: "Vital Task", icon: Lightbulb, to: "/vital-task" },
    { label: "My Task", icon: CheckSquare, to: "/my-task" },
    { label: "Task Categories", icon: ListChecks, to: "/categories" },
    { label: "Settings", icon: Settings, to: "/settings" },
    { label: "Help", icon: HelpCircle, to: "/help" },
  ];
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  const authData = useAuth();

  return (
    <RequireAuth>
      <div className="flex h-screen bg-gray-100 text-sm">
        {/* Sidebar */}
        <aside className="w-64 bg-red-400 text-white p-4 flex flex-col justify-between rounded-tr-2xl rounded-br-2xl">
          <div>
            {/* Profile */}
            <div className="flex flex-col items-center mb-6">
              <img
                src="/avatar.png"
                alt="User"
                className="rounded-full w-16 h-16 border-4 border-white"
              />
              <h3 className="font-semibold mt-2">
                {authData.user?.firstName} {authData.user?.lastName}
              </h3>
              <p className="text-xs text-white/80">{authData.user?.email}</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map(({ label, icon: Icon, to }) => {
                const isActive = currentPath === to;
                return (
                  <Link
                    key={label}
                    to={to}
                    className={clsx(
                      "flex items-center gap-2 px-3 py-2 rounded-lg transition",
                      isActive
                        ? "bg-white text-red-400 font-medium"
                        : "hover:bg-white/20"
                    )}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <LogoutButton />
        </aside>

        {/* Main Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
            {/* Logo */}
            <div className="text-2xl font-bold">
              Dash<span className="text-red-500">board</span>
            </div>

            {/* Search bar */}
            <div className="flex-1 mx-6 max-w-2xl relative">
              <input
                type="text"
                placeholder="Search your task here..."
                className="w-full bg-gray-100 rounded-full px-5 py-2 pl-6 text-sm focus:outline-none shadow-sm"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-red-400 hover:bg-red-500 text-white p-2 rounded-full">
                <Search size={16} />
              </button>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-4">
              <button className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full">
                <Bell size={16} />
              </button>
              <button className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full">
                <Calendar size={16} />
              </button>
              <div className="text-right text-sm leading-none">
                <span className="text-black font-medium block">Tuesday</span>
                <span className="text-blue-600 text-xs">20/01/2023</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
