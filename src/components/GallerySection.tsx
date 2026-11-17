import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItem } from '../types/tourism';
import { ResilientImage } from './ResilientImage';

interface GallerySectionProps {
  items: GalleryItem[];
}

export function GallerySection({ items }: GallerySectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeItem = selectedIndex !== null ? items[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % items.length
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev - 1 + items.length) % items.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, items.length]);

  return (
    <section
      id="galeri"
      aria-labelledby="galeri-heading"
      className="scroll-mt-20 py-14 sm:py-20 bg-[#FBF9F5]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <p className="text-sm font-semibold text-[#994703] mb-2">
            Potret Suasana Desa
          </p>
          <h2
            id="galeri-heading"
            className="font-display text-2xl sm:text-4xl font-bold text-[#1B4D3E] tracking-tight mb-3"
          >
            Galeri Kegiatan &amp; Alam Asri
          </h2>
          <p className="text-base sm:text-lg text-[#374151] leading-relaxed">
            Ketuk foto untuk memperbesar dan melihat kisah di balik setiap sudut Desa Wisata Lereng Asri.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item, idx) => {
            const isHeroTile = idx === 0;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`Perbesar foto ${item.title}`}
                className={`group relative overflow-hidden rounded-2xl bg-[#F4EFEB] text-left border border-[#1B4D3E]/10 shadow-warm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4D3E] ${
                  isHeroTile ? 'sm:col-span-2 aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              >
                <ResilientImage
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  fallbackTitle={item.title}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                  <p className="text-xs sm:text-sm font-medium text-[#D8EFE4] mb-0.5">
                    {item.category}
                  </p>
                  <p className="text-base sm:text-lg font-bold leading-snug">
                    {item.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau foto ${activeItem.title}`}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="flex items-center justify-between text-white max-w-5xl w-full mx-auto">
            <span className="text-sm font-medium tabular-nums">
              {selectedIndex + 1} / {items.length} · {activeItem.category}
            </span>
            <button
              type="button"
              aria-label="Tutup galeri foto"
              onClick={() => setSelectedIndex(null)}
              className="min-h-[48px] min-w-[48px] rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <div
            className="flex-1 flex items-center justify-center my-4 max-w-5xl w-full mx-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.image}
              alt={activeItem.imageAlt}
              referrerPolicy="no-referrer"
              className="max-h-[68vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>

          <div
            className="max-w-3xl w-full mx-auto text-center text-white space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-xl font-bold mb-1">{activeItem.title}</h3>
              <p className="text-sm sm:text-base text-white/85">
                {activeItem.caption}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Foto sebelumnya"
                onClick={() =>
                  setSelectedIndex(
                    (selectedIndex - 1 + items.length) % items.length
                  )
                }
                className="min-h-[48px] px-5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold flex items-center gap-2 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                <span>Sebelumnya</span>
              </button>
              <button
                type="button"
                aria-label="Foto berikutnya"
                onClick={() =>
                  setSelectedIndex((selectedIndex + 1) % items.length)
                }
                className="min-h-[48px] px-5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold flex items-center gap-2 cursor-pointer"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
