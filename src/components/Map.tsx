
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  centerLocation?: [number, number]; // [longitude, latitude]
  markers?: Array<{
    id: string;
    coordinates: [number, number];
    title: string;
    address: string;
    distance?: string;
  }>;
}

const Map = ({ centerLocation = [-75.165222, 39.952583], markers = [] }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapToken, setMapToken] = useState<string>("");

  // Note: In a production app, you would use an environment variable for this token
  // This is just for demonstration purposes
  useEffect(() => {
    setMapToken("pk.YOUR_MAPBOX_PUBLIC_TOKEN");
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: centerLocation,
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      "top-right"
    );

    // Create markers for lab locations
    markers.forEach((marker) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage = "url('/marker.png')";
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.backgroundSize = "100%";
      
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3 class="font-bold">${marker.title}</h3>
         <p>${marker.address}</p>
         ${marker.distance ? `<p class="text-sm text-gray-500">${marker.distance} miles away</p>` : ''}`
      );

      new mapboxgl.Marker(el)
        .setLngLat(marker.coordinates)
        .setPopup(popup)
        .addTo(map.current);
    });

    return () => {
      map.current?.remove();
    };
  }, [centerLocation, markers, mapToken]);

  // If no token is set, show a message
  if (!mapToken || mapToken.includes("YOUR_MAPBOX_PUBLIC_TOKEN")) {
    return (
      <div className="relative rounded-lg overflow-hidden bg-gray-100 min-h-[400px] flex items-center justify-center">
        <div className="text-center p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-2">Map Placeholder</h3>
          <p className="text-gray-600 mb-2">
            Please add your Mapbox token to view the interactive map.<br />
            In a production environment, this would be securely configured.
          </p>
          <div className="text-sm bg-white p-4 rounded-md max-w-md mx-auto text-left">
            <p className="font-semibold mb-1">To configure the map:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Create a Mapbox account at <a href="https://mapbox.com" className="text-[#6941C6] underline">mapbox.com</a></li>
              <li>Get your public access token from the Mapbox dashboard</li>
              <li>Replace "pk.YOUR_MAPBOX_PUBLIC_TOKEN" in the Map.tsx component</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md">
      <div ref={mapContainer} className="w-full h-[400px]" />
    </div>
  );
};

export default Map;
