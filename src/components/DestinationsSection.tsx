import { useEffect, useState } from 'react';
import { Clock, MapPin, MessageCircle, Ticket, X } from 'lucide-react';
import type { Destination, DestinationCategory } from '../types/tourism';
import { filterDestinations, formatRupiah } from '../utils/tourismLogic';
import { ResilientImage } from './ResilientImage';

interface DestinationsSectionProps {
  destinations: Destination[];
  onAskDestinationWhatsApp: (destinationName: string) => void;
}

const CATEGORIES: { id: DestinationCategory; label: string }[] = [
  { id: 'semua', label: 'Semua' },
  { id: 'alam', label: 'Alam & Air Terjun' },
  { id: 'agrowisata', label: 'Agrowisata' },
  { id: 'menginap', label: 'Camping & Menginap' },
];

export function DestinationsSection({
  destinations,
  onAskDestinationWhatsApp,
}: DestinationsSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<DestinationCategory>('semua');
  const [activeDestination, setActiveDestination] = useState<Destination | null>(
    null
  );

  const visibleDestinations = filterDestinations(destinations, selectedCategory);

  useEffect(() => {
    if (!activeDestination) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDestination(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeDestination]);

  return (
    <section
      id="destinasi"
      aria-labelledby="destinasi-heading"
      className="scroll-mt-20 py-14 sm:py-20 bg-[#FBF9F5]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <p className="text-sm font-semibold text-[#994703] mb-2">
            Pilihan Tempat Menarik
          </p>
          <h2
            id="destinasi-heading"
            className="font-display text-2xl sm:text-4xl font-bold text-[#1B4D3E] tracking-tight mb-3"
          >
            Destinasi Unggulan Lereng Asri
          </h2>
          <p className="text-base sm:text-lg text-[#374151] leading-relaxed">
            Setiap sudut desa dirawat bersama warga agar aman, bersih, dan nyaman dikunjungi segala usia.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter kategori destinasi"
          className="flex flex-wrap gap-2 mb-8"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`min-h-[44px] px-4 py-2 text-sm sm:text-base font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4D3E] ${
                  isSelected
                    ? 'bg-[#1B4D3E] text-white shadow-sm'
                    : 'bg-white text-[#374151] border border-[#1B4D3E]/15 hover:border-[#1B4D3E]/40 hover:text-[#1B4D3E]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Destination Cards Grid */}
        <div
          data-testid="destinations-grid"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {visibleDestinations.map((dest) => (
            <article
              key={dest.id}
              className="bg-white rounded-2xl border border-[#1B4D3E]/10 shadow-warm overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#F4EFEB]">
                  <ResilientImage
                    src={dest.image}
                    alt={dest.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    fallbackTitle={dest.name}
                  />
                </div>

                <div className="p-5 sm:p-6">
                  {/* Unboxed zero-pill metadata line */}
                  <p className="text-sm font-medium text-[#2D6A4F] mb-1.5">
                    {dest.categoryLabel} <span aria-hidden="true">·</span>{' '}
                    {dest.distanceFromGate}
                  </p>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] mb-2.5">
                    {dest.name}
                  </h3>

                  <p className="text-base text-[#374151] leading-relaxed mb-4">
                    {dest.shortDesc}
                  </p>

                  <div className="pt-3 border-t border-[#1B4D3E]/10 flex flex-wrap items-center justify-between gap-2 text-sm text-[#4B5563]">
                    <span>Jam buka: {dest.openHours}</span>
                    <span className="font-bold text-[#1B4D3E] tabular-nums">
                      Tiket {formatRupiah(dest.ticketPrice)}/org
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <button
                  type="button"
                  onClick={() => setActiveDestination(dest)}
                  className="w-full min-h-[48px] px-5 py-3 bg-[#F4EFEB] hover:bg-[#EAE2DB] text-[#1B4D3E] text-base font-semibold rounded-xl transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4D3E]"
                >
                  Lihat Detail &amp; Fasilitas
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Accessible Destination Detail Dialog */}
      {activeDestination && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dest-modal-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-xs p-0 sm:p-4"
          onClick={() => setActiveDestination(null)}
        >
          <div
            className="bg-[#FBF9F5] w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-[#F4EFEB]">
              <ResilientImage
                src={activeDestination.image}
                alt={activeDestination.imageAlt}
                className="w-full h-full object-cover sm:rounded-t-3xl"
                fallbackTitle={activeDestination.name}
              />
              <button
                type="button"
                aria-label={`Tutup detail ${activeDestination.name}`}
                onClick={() => setActiveDestination(null)}
                className="absolute top-3 right-3 min-h-[44px] min-w-[44px] rounded-full bg-white/95 text-[#1F2937] shadow-md flex items-center justify-center hover:bg-white cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1B4D3E]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <p className="text-sm font-semibold text-[#2D6A4F] mb-1">
                {activeDestination.categoryLabel}
              </p>
              <h3
                id="dest-modal-title"
                className="font-display text-2xl font-bold text-[#1B4D3E] mb-3"
              >
                {activeDestination.name}
              </h3>

              <p className="text-base text-[#374151] leading-relaxed mb-5">
                {activeDestination.fullDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#F4EFEB] rounded-2xl mb-5 text-sm sm:text-base text-[#1F2937]">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-[#994703] shrink-0" aria-hidden="true" />
                  <span>{activeDestination.openHours}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Ticket className="w-5 h-5 text-[#994703] shrink-0" aria-hidden="true" />
                  <span className="font-semibold tabular-nums">
                    {formatRupiah(activeDestination.ticketPrice)} / orang
                  </span>
                </div>
                <div className="flex items-center gap-2.5 sm:col-span-2">
                  <MapPin className="w-5 h-5 text-[#994703] shrink-0" aria-hidden="true" />
                  <span>{activeDestination.distanceFromGate}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-[#1F2937] mb-2">
                  Fasilitas Tersedia
                </h4>
                <p className="text-base text-[#374151]">
                  {activeDestination.facilities.join(' · ')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const name = activeDestination.name;
                    setActiveDestination(null);
                    onAskDestinationWhatsApp(name);
                  }}
                  className="flex-1 min-h-[50px] px-5 py-3 bg-[#1B4D3E] hover:bg-[#143B2F] text-white text-base font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" aria-hidden="true" />
                  <span>Tanya &amp; Pesan via WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDestination(null)}
                  className="min-h-[50px] px-5 py-3 bg-white border border-[#1B4D3E]/25 text-[#1F2937] text-base font-semibold rounded-2xl hover:bg-[#F4EFEB] transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
