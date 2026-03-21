import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Fetch latest disasters in India from ReliefWeb
    console.log("[Disasters API] Fetching from ReliefWeb...");
    const reliefUrl = "https://api.reliefweb.int/v1/disasters?appname=disasterapp&filter[field]=country.name&filter[value]=India&limit=10&fields[include][]=name&fields[include][]=glide&fields[include][]=date&fields[include][]=country&fields[include][]=status";
    
    // Add User-Agent to pass 403 Forbidden security blocks on APIs
    const res = await fetch(reliefUrl, {
      headers: {
        "User-Agent": "DisasterHelpDemo/1.0 (harinithamg03@gmail.com)"
      }
    });
    
    if (!res.ok) {
      console.error("[Disasters API] ReliefWeb API Error:", res.status, res.statusText);
      throw new Error(`ReliefWeb API Error: ${res.statusText}`);
    }
    
    const data = await res.json();
    const disasters = data.data || [];
    console.log(`[Disasters API] Fetched ${disasters.length} disasters from ReliefWeb`);

    // 2. Geocode the disaster locations using Nominatim
    // We process sequentially to be polite to the Nominatim rate limits (absolute maximum 1 request per second)
    const geocodedDisasters = [];
    
    for (const disaster of disasters) {
      const name = disaster.fields?.name || "";
      const date = disaster.fields?.date?.created || "";
      const status = disaster.fields?.status || "unknown";
      const id = disaster.id;

      // Try to extract a more specific location from the name (e.g. "India: Floods - Aug 2024")
      // First, take everything before the dash or colon to find a base search string
      let searchQuery = name.split('-')[0].split(':')[1] || name.split('-')[0];
      searchQuery = searchQuery.trim() + ", India";

      try {
        const nomUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`;
        const nomRes = await fetch(nomUrl, {
          headers: {
            "User-Agent": "DisasterHelpDemo/1.0"
          }
        });
        
        const nomData = await nomRes.json();
        let lat = 0;
        let lng = 0;

        if (nomData && nomData.length > 0) {
          lat = parseFloat(nomData[0].lat);
          lng = parseFloat(nomData[0].lon);
        } else {
          // Fallback to center of India if specific region mapping fails
          lat = 22.5937;
          lng = 78.9629;
        }

        geocodedDisasters.push({
          id,
          name,
          date,
          status,
          lat,
          lng
        });
        
        console.log(`[Disasters API] Geocoded ${name} to ${lat}, ${lng}`);
        
        // Polite delay (1 second) for Nominatim usage requirements
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (err) {
        console.error("Geocoding failed for:", searchQuery, err);
      }
    }

    return NextResponse.json(geocodedDisasters);
  } catch (error) {
    console.error("Failed to fetch disasters:", error);
    return NextResponse.json({ error: "Failed to fetch disasters" }, { status: 500 });
  }
}
