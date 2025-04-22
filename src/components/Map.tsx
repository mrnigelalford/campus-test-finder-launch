
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Check, MapPin } from "lucide-react";
import { createElement } from "react";
import ReactDOMServer from "react-dom/server";

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

const Map = ({ centerLocation = [-84.5819, 34.0378], markers = [] }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Use the provided Mapbox public token
    mapboxgl.accessToken = "pk.eyJ1IjoibGZtYXBib3giLCJhIjoiY2wwcTRoZjQzMjY0bTNqcDdqbjlqNmFociJ9.Q8jPUrCDqxkQ2ZYNp70LxQ";
    
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

    // Add KSU marker (using Check as a star substitute)
    const ksuEl = document.createElement("div");
    ksuEl.innerHTML = ReactDOMServer.renderToString(
      createElement(Check, {
        size: 32,
        color: "#6941C6",
        fill: "#6941C6"
      })
    );
    
    const ksuPopup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3 class="font-bold">Kennesaw State University</h3>
       <p>1000 Chastain Road, Kennesaw, GA 30144</p>`
    );

    new mapboxgl.Marker({ element: ksuEl })
      .setLngLat(centerLocation)
      .setPopup(ksuPopup)
      .addTo(map.current);

    // Create markers for lab locations
    markers.forEach((marker) => {
      const el = document.createElement("div");
      el.innerHTML = ReactDOMServer.renderToString(
        createElement(MapPin, {
          size: 32,
          color: "#6941C6"
        })
      );
      
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3 class="font-bold">${marker.title}</h3>
         <p>${marker.address}</p>
         ${marker.distance ? `<p class="text-sm text-gray-500">${marker.distance} miles away</p>` : ''}`
      );

      new mapboxgl.Marker({ element: el })
        .setLngLat(marker.coordinates)
        .setPopup(popup)
        .addTo(map.current);
    });

    return () => {
      map.current?.remove();
    };
  }, [centerLocation, markers]);

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md">
      <div ref={mapContainer} className="w-full h-[400px]" />
    </div>
  );
};

export default Map;
