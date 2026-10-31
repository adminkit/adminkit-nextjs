"use client";

// Usage: https://github.com/themustafaomar/jsvectormap
import {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { type Theme, useTheme } from "@/hooks/use-theme";

type Style = Record<string, string | number>;

/** jsVectorMap's options, without selector and map (props of <VectorMap>) */
export type VectorMapOptions = {
  regionStyle?: { initial?: Style; hover?: Style; selected?: Style };
  markerStyle?: { initial?: Style; hover?: Style; selected?: Style };
  markers?: { name: string; coords: [number, number] }[];
  [option: string]: unknown;
};

type MapInstance = {
  regions: Record<string, { element: { setStyle: (style: Style) => void } }>;
  _markers: Record<string, { element: { setStyle: (style: Style) => void } }>;
  updateSize: () => void;
  destroy: () => void;
};

// The map files register themselves on window.jsVectorMap, which jsvectormap sets
const maps = {
  world: () => import("./vector-maps/world.js"),
};

/**
 * A jsVectorMap map from options(theme). Its regions and markers are restyled with
 * options(newTheme) when the color mode changes. jsVectorMap needs the browser, so it
 * loads on the client; a skeleton shows until it has drawn. Give it a height.
 *
 * <VectorMap map="world" options={(theme) => ({ regionStyle: { initial: { fill: theme["gray-200"] } } })} />
 */
export function VectorMap({
  map,
  options,
  ...props
}: {
  map: keyof typeof maps;
  options: (theme: Theme) => VectorMapOptions;
} & ComponentPropsWithoutRef<"div">) {
  const element = useRef<HTMLDivElement>(null);
  const instance = useRef<MapInstance | null>(null);
  const latest = useRef(options);
  const [ready, setReady] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    latest.current = options;
  });

  useEffect(() => {
    if (!theme || !element.current) {
      return;
    }
    const target = element.current;
    const next = latest.current(theme);
    let cancelled = false;

    if (instance.current) {
      const { regionStyle, markerStyle } = next;
      if (regionStyle?.initial) {
        for (const { element: region } of Object.values(
          instance.current.regions
        )) {
          region.setStyle(regionStyle.initial);
        }
      }
      if (markerStyle?.initial) {
        for (const { element: marker } of Object.values(
          instance.current._markers
        )) {
          marker.setStyle(markerStyle.initial);
        }
      }
      return;
    }

    import("jsvectormap")
      .then(async ({ default: JsVectorMap }) => {
        await maps[map]();
        return JsVectorMap;
      })
      .then((JsVectorMap) => {
        if (cancelled || instance.current) {
          return;
        }
        instance.current = new JsVectorMap({
          ...next,
          selector: target,
          map,
        }) as unknown as MapInstance;
        setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [theme, map]);

  useEffect(() => {
    const resize = () => instance.current?.updateSize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      instance.current?.destroy();
      instance.current = null;
    };
  }, []);

  return (
    <>
      {!ready && <Skeleton />}
      <div ref={element} {...props} />
    </>
  );
}
