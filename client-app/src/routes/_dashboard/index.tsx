// src/routes/_dashboard/index.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/")({
  component: () => (
    <div className="h-full flex items-center justify-center text-3xl font-bold text-red-400">
      Dashboard Home
    </div>
  ),
});
