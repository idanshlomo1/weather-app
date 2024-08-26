import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apikey = process.env.OPENWEATHERMAP_API_KEY
        const searchParams = req.nextUrl.searchParams

        const city = searchParams.get("search")
        
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apikey}`

        const response = await axios.get(url)

        return NextResponse.json(response.data)

    } catch (error) {
        console.log("Error fetching Geo coded data")
        return new Response("Error fetching Geo coded data", { status: 500 })
    }
}