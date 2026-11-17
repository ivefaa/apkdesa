import { ArrowDown, MessageCircle } from 'lucide-react';
import { HERO_IMAGE } from '../data/villageData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  averageRating: number;
  totalReviews: number;
  onOpenBooking: () => void;
  onExplorePackages: () => void;
}

export function HeroSection({
  averageRating,
  totalReviews,
  onOpenBooking,
  onExplorePackages,
}: HeroSectionProps) {
  return (
    <section
      id="beranda"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden bg-[#122C23]"
    >
      <div className="relative min-h-[460px] sm:min-h-[560px] lg:min-h-[600px] flex items-end">
        <div className="absolute inset-0">
          <ResilientImage
            src={HERO_IMAGE}
            alt="Panorama pagi Desa Wisata Lereng Asri dengan gazebo bambu, terasering hijau, dan kabut pegunungan"
            className="w-full h-full object-cover object-center"
            fallbackTitle="Desa Wisata Lereng Asri"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0C2119]/95 via-[#0C2119]/55 to-[#0C2119]/20"
          />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-9 sm:pb-14">
          <div className="max-w-2xl text-white">
            <p className="text-sm sm:text-base font-medium text-[#D8EFE4] mb-3 tracking-normal">
              Kabupaten Semarang · Ketinggian 1.150 mdpl · Rating {averageRating.toFixed(1)}/5 ({totalReviews} ulasan tamu)
            </p>

            <h1
              id="hero-heading"
              className="font-display text-3xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-white mb-4"
            >
              Segarnya Alam Pegunungan dan Hangatnya Ramah Tamah Desa
            </h1>

            <p className="text-base sm:text-lg text-[#EEF7F2] leading-relaxed mb-8 max-w-xl">
              Nikmati liburan tenang bersama keluarga di Desa Wisata Lereng Asri. Jelajahi air terjun jernih, kebun kopi dan teh, serta glamping hutan pinus dengan pemesanan mudah langsung bersama warga desa.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="min-h-[52px] px-6 py-3.5 bg-[#D97736] hover:bg-[#C26528] active:scale-[0.98] text-white text-base font-bold rounded-2xl transition-all flex items-center justify-center gap-2.5 shadow-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Pesan Kunjungan via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={onExplorePackages}
                className="min-h-[52px] px-6 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/40 text-white text-base font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Lihat Paket &amp; Harga</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
