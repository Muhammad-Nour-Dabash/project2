import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full flex items-center justify-center text-3xl font-bold text-red-400">
      Settings
    </div>
  );
}
