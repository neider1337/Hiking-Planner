import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { config } from "../config/env";

mapboxgl.accessToken = config.mapboxToken;

export default function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [16.925, 51.107], // Wrocław
      zoom: 8,
    });

    // fix dla rozmiaru (ważne jeśli nie fullscreen)
    map.on("load", () => {
      map.resize();
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={mapContainer} className="w-full h-full" />;
}