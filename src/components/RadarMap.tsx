'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './RadarMap.module.css';

// Dynamic import for Leaflet as it needs window object
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface Flight {
  icao24: string;
  callsign: string;
  origin_country: string;
  longitude: number;
  latitude: number;
  velocity: number;
  altitude: number;
}

export default function RadarMap() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    import('leaflet').then((leaflet) => {
      setL(leaflet);
    });

    const fetchFlights = async () => {
      try {
        // OpenSky API (limited free tier)
        const res = await fetch('https://opensky-network.org/api/states/all?lamin=22.0&lomin=51.0&lamax=26.0&lomax=57.0'); // Box around UAE
        const data = await res.json();
        const mapped = data.states.slice(0, 20).map((s: any) => ({
          icao24: s[0],
          callsign: s[1],
          origin_country: s[2],
          longitude: s[5],
          latitude: s[6],
          velocity: s[9],
          altitude: s[7]
        }));
        setFlights(mapped);
      } catch (e) {
        // Fallback mock data if API fails
        setFlights([
          { icao24: '1', callsign: 'UAE123', origin_country: 'UAE', longitude: 55.3, latitude: 25.2, velocity: 250, altitude: 10000 },
          { icao24: '2', callsign: 'ETH456', origin_country: 'UAE', longitude: 54.4, latitude: 24.4, velocity: 240, altitude: 12000 }
        ]);
      }
    };

    fetchFlights();
    const interval = setInterval(fetchFlights, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!L) return <div className={styles.loading}>Loading Radar...</div>;

  const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/68/68380.png',
    iconSize: [25, 25],
  });

  return (
    <div className={`${styles.radarContainer} glass`}>
      <div className={styles.header}>
        <h3>🛰️ Live Flight Radar (UAE Region)</h3>
        <p>Real-time aircraft positions and tracking</p>
      </div>
      <div className={styles.mapWrapper}>
        <MapContainer center={[25.2, 55.3]} zoom={7} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {flights.map(f => (
            <Marker key={f.icao24} position={[f.latitude, f.longitude]} icon={customIcon}>
              <Popup>
                <div className={styles.popup}>
                  <h4>{f.callsign || 'N/A'}</h4>
                  <p>Origin: {f.origin_country}</p>
                  <p>Altitude: {Math.round(f.altitude)}m</p>
                  <p>Speed: {Math.round(f.velocity * 3.6)} km/h</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
