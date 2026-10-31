"use client";

import { VectorMap } from "@/components/plugins/vector-map";

const markers: { coords: [number, number]; name: string }[] = [
  { coords: [31.230391, 121.473701], name: "Shanghai" },
  { coords: [28.70406, 77.102493], name: "Delhi" },
  { coords: [6.524379, 3.379206], name: "Lagos" },
  { coords: [35.689487, 139.691711], name: "Tokyo" },
  { coords: [23.12911, 113.264381], name: "Guangzhou" },
  { coords: [40.7127837, -74.0059413], name: "New York" },
  { coords: [34.052235, -118.243683], name: "Los Angeles" },
  { coords: [41.878113, -87.629799], name: "Chicago" },
  { coords: [51.507351, -0.127758], name: "London" },
  { coords: [40.416775, -3.70379], name: "Madrid " },
];

/** Real-time visitors on a world map */
export function WorldMap() {
  return (
    <div className="card flex-fill w-100">
      <div className="card-header">
        <h2 className="card-title mb-0">Real-Time Visitors</h2>
      </div>
      <div className="card-body px-4">
        <div className="position-relative" style={{ height: 350 }}>
          <VectorMap
            map="world"
            className="h-100"
            options={(theme) => ({
              zoomButtons: true,
              markers,
              markerStyle: {
                initial: {
                  r: 9,
                  stroke: theme.white,
                  strokeWidth: 7,
                  stokeOpacity: 0.4,
                  fill: theme.primary,
                },
                hover: {
                  fill: theme.primary,
                  stroke: theme.primary,
                },
              },
              regionStyle: {
                initial: {
                  fill: theme["gray-300"],
                },
              },
              zoomOnScroll: false,
            })}
          />
        </div>
      </div>
    </div>
  );
}
