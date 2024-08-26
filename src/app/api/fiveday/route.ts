import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apikey = process.env.OPENWEATHERMAP_API_KEY
        
        const searchParams = req.nextUrl.searchParams

        const lat = searchParams.get("lat")
        const lon = searchParams.get("lon")

        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`

        const response = await fetch(url, {
            next: { revalidate: 3600 },

        })

        const data = await response.json()

        return NextResponse.json(data)

    } catch (error) {
        console.log("Error fetching 5 day forecast data")
        return new Response("Error fetching 5 day forecast data", { status: 500 })
    }
}