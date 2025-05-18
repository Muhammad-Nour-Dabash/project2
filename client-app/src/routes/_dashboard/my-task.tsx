import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/my-task")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full flex items-center justify-center text-3xl font-bold text-red-400">
      My Task
    </div>
  );
}
