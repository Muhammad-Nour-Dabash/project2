import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/404")({
  component: NotFoundPage,
});

// ✅ Export the component separately for use in router config
export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center p-6">
      <div>
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Page not found</p>
        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
