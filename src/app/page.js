import ControlWidget from "../components/ControlWidget"
import VisBarChart from "@/components/VisBarChart";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-10 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
        <h1 className="text-xl font-semibold text-center my-1 mb-4">Visualization</h1>

        <div className="w-full flex gap-4 items-center flex-col sm:flex-row mb-12">
          <ControlWidget />
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <VisBarChart />
        </div>
      </main>
    </div>
  );
}
