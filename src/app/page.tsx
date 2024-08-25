import AirPollution from "@/components/AirPollution";
import DailyForecast from "@/components/DailyForecast";
import FeelsLike from "@/components/FeelsLike";
import Humidity from "@/components/Humidity";
import Navbar from "@/components/Navbar";
import Population from "@/components/Population";
import Sunset from "@/components/Sunset";
import Temperature from "@/components/Temperature";
import UvIndex from "@/components/UvIndex";
import Visibility from "@/components/Visibility";
import Wind from "@/components/Wind";

export default function Home() {

  console.log("Hello from Home component!");

  return (
    <main className="mx-4 lg:mx-8 xl:mx-24 2xl:mx-64 m-auto pb-48">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">

        <div className="flex flex-col gap-4 w-full min-w-[288px] md:w-[560px]">
          <Temperature />
        </div>

        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility/>
          </div>
        </div>

      </div>
    </main>
  );
}
