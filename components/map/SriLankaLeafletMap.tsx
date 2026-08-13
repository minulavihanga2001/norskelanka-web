"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";
import type { Destination, Locale } from "@/lib/data/types";
import { t } from "@/lib/i18n/dictionaries";
import "leaflet/dist/leaflet.css";

/** Full island frame — prevents panning/zooming away from Sri Lanka */
const SRI_LANKA_BOUNDS = L.latLngBounds(
  L.latLng(5.7, 79.35),
  L.latLng(10.0, 82.15),
);
const SRI_LANKA_CENTER: [number, number] = [7.87, 80.77];
const MIN_ZOOM = 7;
const MAX_ZOOM = 13;
const DEFAULT_ZOOM = 7;

const SATELLITE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const LABELS_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}";

function createPinIcon(active: boolean, trending: boolean) {
  const fill = active ? "#66BB6A" : trending ? "#43A047" : "#2E7D32";
  const size = active ? 36 : 30;
  const glow = active
    ? "filter: drop-shadow(0 0 8px rgba(102,187,106,.9));"
    : "filter: drop-shadow(0 4px 8px rgba(0,0,0,.45));";

  return L.divIcon({
    className: "nl-map-pin-wrap",
    iconSize: [size, size + 8],
    iconAnchor: [size / 2, size + 4],
    popupAnchor: [0, -(size + 2)],
    html: `
      <div class="nl-map-pin ${active ? "nl-map-pin--active" : ""}" style="${glow}">
        <svg width="${size}" height="${size + 8}" viewBox="0 0 24 32" aria-hidden="true">
          <path
            d="M12 0C6.5 0 2 4.4 2 9.8c0 7.2 8.4 17.7 9.2 18.7a1 1 0 0 0 1.6 0C13.6 27.5 22 17 22 9.8 22 4.4 17.5 0 12 0z"
            fill="${fill}"
            stroke="#fff"
            stroke-width="1.6"
          />
          <circle cx="12" cy="10" r="3.4" fill="#fff"/>
        </svg>
      </div>
    `,
  });
}

function LockToFullIsland() {
  const map = useMap();

  useEffect(() => {
    map.setMinZoom(MIN_ZOOM);
    map.setMaxZoom(MAX_ZOOM);
    map.setMaxBounds(SRI_LANKA_BOUNDS);
    map.fitBounds(SRI_LANKA_BOUNDS, {
      padding: [12, 12],
      animate: false,
      maxZoom: DEFAULT_ZOOM,
    });

    const clamp = () => {
      if (!map.getBounds().intersects(SRI_LANKA_BOUNDS)) {
        map.panInsideBounds(SRI_LANKA_BOUNDS, { animate: true });
      }
      if (map.getZoom() < MIN_ZOOM) map.setZoom(MIN_ZOOM);
    };

    map.on("drag", clamp);
    map.on("zoomend", clamp);
    return () => {
      map.off("drag", clamp);
      map.off("zoomend", clamp);
    };
  }, [map]);

  return null;
}

function FlyToActive({ destination }: { destination?: Destination }) {
  const map = useMap();
  const skipFirst = useRef(true);

  useEffect(() => {
    if (!destination) return;
    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }
    const nextZoom = Math.min(Math.max(map.getZoom(), 9), MAX_ZOOM);
    map.flyTo([destination.lat, destination.lng], nextZoom, { duration: 0.7 });
  }, [destination, map]);

  return null;
}

function DestinationMarkers({
  destinations,
  locale,
  activeId,
  onSelect,
}: {
  destinations: Destination[];
  locale: Locale;
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const icons = useMemo(() => {
    const map = new Map<string, L.DivIcon>();
    for (const d of destinations) {
      map.set(d.id, createPinIcon(d.id === activeId, d.trending));
    }
    return map;
  }, [destinations, activeId]);

  return (
    <>
      {destinations.map((d) => (
        <Marker
          key={d.id}
          position={[d.lat, d.lng]}
          icon={icons.get(d.id) ?? createPinIcon(false, d.trending)}
          eventHandlers={{
            click: () => onSelect(d.id),
          }}
          zIndexOffset={d.id === activeId ? 1000 : d.trending ? 100 : 0}
        >
          <Tooltip
            direction="top"
            offset={[0, -12]}
            opacity={1}
            className="nl-map-tooltip"
          >
            <span className="font-semibold text-[11px] tracking-wide">
              {t(d.name, locale)}
            </span>
          </Tooltip>
        </Marker>
      ))}
    </>
  );
}

export function SriLankaLeafletMap({
  destinations,
  locale,
  activeId,
  onSelect,
}: {
  destinations: Destination[];
  locale: Locale;
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div
        className="flex h-full w-full items-center justify-center bg-[#0b1f14] text-sm text-white/70"
        style={{ minHeight: 420 }}
      >
        Loading map…
      </div>
    );
  }

  return (
    <MapContainer
      key="sri-lanka-map"
      center={SRI_LANKA_CENTER}
      zoom={DEFAULT_ZOOM}
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
      maxBounds={SRI_LANKA_BOUNDS}
      maxBoundsViscosity={1}
      scrollWheelZoom
      doubleClickZoom
      dragging
      zoomControl={false}
      attributionControl={false}
      className="nl-map h-full w-full z-0 overflow-hidden rounded-[1.5rem]"
      style={{ height: "100%", minHeight: 520, background: "#0b1f14" }}
    >
      <TileLayer url={SATELLITE_URL} maxZoom={MAX_ZOOM} />
      <TileLayer url={LABELS_URL} maxZoom={MAX_ZOOM} opacity={0.85} />
      <ZoomControl position="bottomright" />
      <LockToFullIsland />
      <FlyToActive destination={destinations.find((d) => d.id === activeId)} />
      <DestinationMarkers
        destinations={destinations}
        locale={locale}
        activeId={activeId}
        onSelect={onSelect}
      />
    </MapContainer>
  );
}
