
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
  }, [centerLocation, markers]);

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md">
      <div ref={mapContainer} className="w-full h-[400px]" />
    </div>
  );
};

export default Map;
