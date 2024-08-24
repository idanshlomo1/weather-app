import Navbar from "@/components/Navbar";
import Temperature from "@/components/Temperature";

export default function Home() {

  console.log("Hello from Home component!");

  return (
    <main className="mx-4 lg:mx-8 xl:mx-24 2xl:mx-64 m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">

        <div className="flex flex-col gap-4 w-full min-w-[288px] md:w-[560px]">
          <Temperature />
        </div>

        <div className="flex flex-col">

        </div>

      </div>
    </main>
  );
}
