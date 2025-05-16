import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="">
          <div>
            <Button onClick={() => alert("Clicked")}>Click me</Button>
          </div>
          <div className="bg-yellow-200 min-h-screen flex justify-center items-center">
            <h1 className="text-4xl font-bold text-purple-500">
              Tailwind is Working!
            </h1>
          </div>
        </div>
      </nav>
    </header>
  );
}
