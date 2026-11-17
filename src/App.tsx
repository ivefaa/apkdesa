import { useCallback, useEffect, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { DestinationsSection } from './components/DestinationsSection';
import { GallerySection } from './components/GallerySection';
import { HeroSection } from './components/HeroSection';
import { LocationMapSection } from './components/LocationMapSection';
import { Navbar } from './components/Navbar';
import { PackagesSection } from './components/PackagesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { WhatsAppBookingModal } from './components/WhatsAppBookingModal';
import {
  DESTINATIONS,
  GALLERY_ITEMS,
  INITIAL_REVIEWS,
  TOUR_PACKAGES,
  VILLAGE_ADDRESS,
} from './data/villageData';
import type { TourPackage, VisitorReview } from './types/tourism';
import { computeReviewStats } from './utils/tourismLogic';

const REVIEWS_STORAGE_KEY = 'lereng_asri_reviews_v1';

export default function App() {
  const [reviews, setReviews] = useState<VisitorReview[]>(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to initial seed reviews
    }
    return INITIAL_REVIEWS;
  });

  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPackageName, setBookingPackageName] = useState<string>(
    TOUR_PACKAGES[0]?.name || 'Paket Jelajah Sehari Penuh'
  );
  const [bookingGuests, setBookingGuests] = useState<number>(4);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [showFloatingWa, setShowFloatingWa] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowFloatingWa(window.scrollY > 320);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // Ignore storage write errors in restricted environments
    }
  }, [reviews]);

  useEffect(() => {
    const handleQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () =>
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const openGeneralBooking = useCallback(() => {
    setBookingPackageName(TOUR_PACKAGES[0]?.name || 'Paket Jelajah Sehari Penuh');
    setBookingGuests(4);
    setBookingOpen(true);
  }, []);

  const handleSelectPackage = useCallback((pkg: TourPackage, guests: number) => {
    setBookingPackageName(pkg.name);
    setBookingGuests(guests);
    setBookingOpen(true);
  }, []);

  const handleAskDestination = useCallback((destinationName: string) => {
    setBookingPackageName(destinationName);
    setBookingGuests(4);
    setBookingOpen(true);
  }, []);

  const handleAddReview = useCallback((newReview: VisitorReview) => {
    setReviews((prev) => [newReview, ...prev]);
  }, []);

  const stats = computeReviewStats(reviews);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1F2937] flex flex-col">
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={openGeneralBooking}
      />

      <main className="flex-1 pb-20 md:pb-0">
        <HeroSection
          averageRating={stats.averageRating}
          totalReviews={stats.totalReviews}
          onOpenBooking={openGeneralBooking}
          onExplorePackages={() => handleNavigate('paket')}
        />

        <DestinationsSection
          destinations={DESTINATIONS}
          onAskDestinationWhatsApp={handleAskDestination}
        />

        <PackagesSection
          packages={TOUR_PACKAGES}
          onSelectPackage={handleSelectPackage}
        />

        <GallerySection items={GALLERY_ITEMS} />

        <LocationMapSection
          destinations={DESTINATIONS}
          quotaExceeded={quotaExceeded}
        />

        <ReviewsSection
          reviews={reviews}
          packages={TOUR_PACKAGES}
          onAddReview={handleAddReview}
        />
      </main>

      {/* Quiet Village Footer */}
      <footer className="bg-[#1B4D3E] text-[#EEF7F2] pt-12 pb-28 md:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-display text-2xl font-bold text-white mb-2">
              Desa Wisata Lereng Asri
            </p>
            <p className="text-sm sm:text-base text-[#D8EFE4] leading-relaxed">
              Dikelola bersama Kelompok Sadar Wisata (Pokdarwis) Warga Lereng Asri untuk wisata alam berkelanjutan dan ramah keluarga.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-3">
              Alamat &amp; Jam Operasional
            </h3>
            <p className="text-sm sm:text-base text-[#D8EFE4] leading-relaxed mb-2">
              {VILLAGE_ADDRESS}
            </p>
            <p className="text-sm text-[#D8EFE4]">
              Buka setiap hari: 06.30 – 17.30 WIB (Area menginap 24 jam)
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-3">
              Layanan Informasi Wisatawan
            </h3>
            <div className="flex items-center gap-2 text-sm sm:text-base text-[#D8EFE4] mb-4">
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="tabular-nums">+62 812-3456-7890 (Admin Desa)</span>
            </div>
            <button
              type="button"
              onClick={openGeneralBooking}
              className="min-h-[48px] px-5 py-2.5 bg-[#25D366] hover:bg-[#1EC15B] text-[#052E16] font-bold text-sm sm:text-base rounded-xl inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              <span>Chat Pengelola via WhatsApp</span>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-[#D8EFE4]/80">
          <span>&copy; 2026 Pokdarwis Desa Wisata Lereng Asri. Seluruh hak cipta dilindungi.</span>
          <span>Wisata Alam · Agrowisata · Homestay Warga</span>
        </div>
      </footer>

      {/* Floating WhatsApp CTA Button (Appears smoothly once scrolled past hero) */}
      {showFloatingWa && (
        <button
          type="button"
          aria-label="Hubungi Desa via WhatsApp"
          onClick={openGeneralBooking}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 h-12 md:h-14 px-4 md:px-5 bg-[#25D366] hover:bg-[#1EC15B] active:scale-[0.97] text-[#052E16] font-bold text-sm md:text-base rounded-full shadow-float flex items-center gap-2 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4D3E]"
        >
          <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span className="whitespace-nowrap">Hubungi Desa</span>
        </button>
      )}

      <WhatsAppBookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        packages={TOUR_PACKAGES}
        initialPackageName={bookingPackageName}
        initialGuests={bookingGuests}
      />
    </div>
  );
}
