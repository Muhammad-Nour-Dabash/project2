import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/vital-task")({
  component: VitalTaskPage,
  
});

function VitalTaskPage() {
  return (
    <div className="h-full flex items-center justify-center text-3xl font-bold text-red-400">
      Vital Task
    </div>
  );
}
