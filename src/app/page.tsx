"use client"
import AirPollution from "@/components/AirPollution";
import DailyForecast from "@/components/DailyForecast";
import FeelsLike from "@/components/FeelsLike";
import FiveDayForecast from "@/components/FiveDayForecast";
import Humidity from "@/components/Humidity";
import MapBox from "@/components/MapBox";
import Navbar from "@/components/Navbar";
import Population from "@/components/Population";
import Pressure from "@/components/Pressure";
import Sunset from "@/components/Sunset";
import Temperature from "@/components/Temperature";
import UvIndex from "@/components/UvIndex";
import Visibility from "@/components/Visibility";
import Wind from "@/components/Wind";
import { defaultStates } from "@/lib/defaultStates";
import { useGlobalContextUpdate } from "@/lib/globalContext";
import { Coords } from "@/lib/types";
import Image from "next/image";

export default function Home() {

  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedCityCords = (coords: Coords) => {
    setActiveCityCoords(coords);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="mx-4 lg:mx-8 xl:mx-24 2xl:mx-64 m-auto pb-48 ">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">

        <div className="flex flex-col gap-4 w-full min-w-[288px] md:w-[560px]">
          <Temperature />
          <FiveDayForecast />
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
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-container mt-4 flex gap-4">

              <MapBox />

            <div className="states flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gap-2 font-medium">
                Top Large Cities
              </h2>
              <div className="flex flex-col gap-4 h-4">
                {
                  defaultStates.map((state, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => getClickedCityCords({ lat: state.lat, lon: state.lon })}
                        className="border rounded-lg cursor-pointer shadow-sm dark:shadow-none hover:bg-accent duration-200"
                      >
                        <p className="px-6 py-4">
                          {state.name}

                        </p>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>


    </main>
  );
}
