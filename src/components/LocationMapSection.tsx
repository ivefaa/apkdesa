import { useCallback, useState } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { Car, ExternalLink, MapPin, Navigation } from 'lucide-react';
import type { Destination } from '../types/tourism';
import { VILLAGE_ADDRESS, VILLAGE_CENTER } from '../data/villageData';

interface MapSpot {
  id: string;
  name: string;
  subtitle: string;
  coordinates: { lat: number; lng: number };
}

interface SpotMarkerProps {
  spot: MapSpot;
  isSelected: boolean;
  onSelect: (spotId: string) => void;
  onCloseInfo: () => void;
}

function SpotMarker({
  spot,
  isSelected,
  onSelect,
  onCloseInfo,
}: SpotMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={spot.coordinates}
        title={spot.name}
        onClick={() => onSelect(spot.id)}
      >
        <Pin
          background={isSelected ? '#D97736' : '#1B4D3E'}
          borderColor={isSelected ? '#994703' : '#003629'}
          glyphColor="#FFFFFF"
          scale={isSelected ? 1.25 : 1.05}
        />
      </AdvancedMarker>
      {isSelected && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={240}
          headerContent={
            <span className="font-bold text-sm text-[#1B4D3E] pr-2">
              {spot.name}
            </span>
          }
          onCloseClick={onCloseInfo}
        >
          <p className="text-xs text-[#4B5563] pt-0.5">{spot.subtitle}</p>
        </InfoWindow>
      )}
    </>
  );
}

interface LocationMapSectionProps {
  destinations: Destination[];
  quotaExceeded: boolean;
}

export function LocationMapSection({
  destinations,
  quotaExceeded,
}: LocationMapSectionProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const spots: MapSpot[] = [
    {
      id: 'gerbang-desa',
      name: 'Gerbang Utama & Pusat Informasi',
      subtitle: 'Area parkir bus & mobil, loket tiket terpadu, dan musala.',
      coordinates: VILLAGE_CENTER,
    },
    ...destinations.map((d) => ({
      id: d.id,
      name: d.name,
      subtitle: `${d.categoryLabel} · ${d.distanceFromGate}`,
      coordinates: d.coordinates,
    })),
  ];

  const [selectedSpotId, setSelectedSpotId] = useState<string>('gerbang-desa');
  const [infoOpen, setInfoOpen] = useState<boolean>(true);
  const [cameraCenter, setCameraCenter] = useState(VILLAGE_CENTER);
  const [cameraZoom, setCameraZoom] = useState<number>(15);

  const selectedSpot =
    spots.find((s) => s.id === selectedSpotId) || spots[0];

  const handleSelectSpot = useCallback(
    (spot: MapSpot) => {
      setSelectedSpotId(spot.id);
      setInfoOpen(true);
      setCameraCenter(spot.coordinates);
      setCameraZoom(16);
    },
    []
  );

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${selectedSpot.coordinates.lat},${selectedSpot.coordinates.lng}`;
  const canRenderGoogleMap = Boolean(apiKey) && !quotaExceeded;

  return (
    <section
      id="lokasi"
      aria-labelledby="lokasi-heading"
      className="scroll-mt-20 py-14 sm:py-20 bg-[#F4EFEB]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <p className="text-sm font-semibold text-[#994703] mb-2">
            Akses Mudah &amp; Jalan Beraspal
          </p>
          <h2
            id="lokasi-heading"
            className="font-display text-2xl sm:text-4xl font-bold text-[#1B4D3E] tracking-tight mb-3"
          >
            Peta Lokasi &amp; Rute Menuju Desa
          </h2>
          <p className="text-base sm:text-lg text-[#374151] leading-relaxed">
            {VILLAGE_ADDRESS}. Dapat ditempuh sekitar 45 menit dari pusat Kota Semarang atau Salatiga melalui jalur beraspal mulus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Spot Selector & Travel Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-[#1B4D3E]/10 shadow-warm">
              <h3 className="text-lg font-bold text-[#1F2937] mb-3">
                Pilih Titik Lokasi di Desa
              </h3>
              <div className="space-y-2" role="list">
                {spots.map((spot) => {
                  const isActive = spot.id === selectedSpotId;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => handleSelectSpot(spot)}
                      className={`w-full min-h-[52px] text-left px-4 py-3 rounded-xl border transition-colors flex items-start gap-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1B4D3E] ${
                        isActive
                          ? 'bg-[#1B4D3E] text-white border-[#1B4D3E]'
                          : 'bg-[#FBF9F5] text-[#1F2937] border-[#1B4D3E]/10 hover:border-[#1B4D3E]/40'
                      }`}
                    >
                      <MapPin
                        className={`w-5 h-5 shrink-0 mt-0.5 ${
                          isActive ? 'text-[#FC934F]' : 'text-[#994703]'
                        }`}
                        aria-hidden="true"
                      />
                      <div>
                        <span className="block text-sm sm:text-base font-bold leading-snug">
                          {spot.name}
                        </span>
                        <span
                          className={`block text-xs sm:text-sm mt-0.5 ${
                            isActive ? 'text-[#D8EFE4]' : 'text-[#4B5563]'
                          }`}
                        >
                          {spot.subtitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#1B4D3E]/10 shadow-warm space-y-3">
              <div className="flex items-start gap-3 text-sm sm:text-base text-[#374151]">
                <Car className="w-5 h-5 text-[#1B4D3E] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-bold text-[#1F2937]">Akses Kendaraan</p>
                  <p>
                    Masuk mobil pribadi, minibus elf, hingga bus medium. Area parkir terpusat dijaga petugas desa 24 jam.
                  </p>
                </div>
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[50px] px-5 py-3 bg-[#1B4D3E] hover:bg-[#143B2F] text-white text-base font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-5 h-5" aria-hidden="true" />
                <span>Buka Petunjuk Arah Google Maps</span>
                <ExternalLink className="w-4 h-4 opacity-80" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Interactive Google Maps Platform Map */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl overflow-hidden border border-[#1B4D3E]/10 shadow-warm">
              {canRenderGoogleMap ? (
                <div className="h-[380px] sm:h-[440px] w-full">
                  <APIProvider apiKey={apiKey} language="id" region="ID" libraries={['marker']}>
                    <GoogleMap
                      center={cameraCenter}
                      zoom={cameraZoom}
                      onCameraChanged={(ev) => {
                        setCameraCenter(ev.detail.center);
                        setCameraZoom(ev.detail.zoom);
                      }}
                      mapId="DEMO_MAP_ID"
                      gestureHandling="cooperative"
                      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                      style={{ width: '100%', height: '100%' }}
                    >
                      {spots.map((spot) => (
                        <SpotMarker
                          key={spot.id}
                          spot={spot}
                          isSelected={infoOpen && selectedSpotId === spot.id}
                          onSelect={(id) => {
                            const found = spots.find((s) => s.id === id);
                            if (found) handleSelectSpot(found);
                          }}
                          onCloseInfo={() => setInfoOpen(false)}
                        />
                      ))}
                    </GoogleMap>
                  </APIProvider>
                </div>
              ) : (
                <div className="h-[380px] sm:h-[440px] w-full bg-gradient-to-br from-[#E7F0EA] to-[#F4EFEB] flex flex-col items-center justify-center p-6 text-center">
                  <MapPin className="w-12 h-12 text-[#1B4D3E] mb-3" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-[#1B4D3E] mb-2">
                    {selectedSpot.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[#374151] max-w-md mb-2">
                    {selectedSpot.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm font-mono text-[#4B5563] mb-5 tabular-nums">
                    Koordinat: {selectedSpot.coordinates.lat.toFixed(4)},{' '}
                    {selectedSpot.coordinates.lng.toFixed(4)}
                  </p>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] px-6 py-3 bg-[#1B4D3E] text-white font-semibold rounded-xl inline-flex items-center gap-2 hover:bg-[#143B2F] transition-colors"
                  >
                    <Navigation className="w-4 h-4" aria-hidden="true" />
                    <span>Buka Peta &amp; Rute Google Maps</span>
                  </a>
                </div>
              )}

              <div className="px-4 py-3 bg-[#FBF9F5] border-t border-[#1B4D3E]/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#4B5563]">
                <span>
                  Titik aktif: <strong className="text-[#1F2937]">{selectedSpot.name}</strong>
                </span>
                <span>
                  Peta menggunakan layanan Google Maps sesuai{' '}
                  <a
                    href="https://maps.google.com/help/terms_maps/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#1B4D3E]"
                  >
                    Persyaratan Pengguna Akhir Google Maps
                  </a>
                  .
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
