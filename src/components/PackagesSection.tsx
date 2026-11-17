import { useState } from 'react';
import { Check, MessageCircle, Minus, Plus, Users } from 'lucide-react';
import type { TourPackage } from '../types/tourism';
import { calculatePackageTotal, formatRupiah } from '../utils/tourismLogic';

interface PackagesSectionProps {
  packages: TourPackage[];
  onSelectPackage: (pkg: TourPackage, guests: number) => void;
}

export function PackagesSection({
  packages,
  onSelectPackage,
}: PackagesSectionProps) {
  const [guestCounts, setGuestCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const pkg of packages) {
      initial[pkg.id] = 4;
    }
    return initial;
  });

  const updateGuests = (pkg: TourPackage, delta: number) => {
    setGuestCounts((prev) => {
      const current = prev[pkg.id] ?? pkg.minGuests;
      const next = Math.max(pkg.minGuests, Math.min(60, current + delta));
      return { ...prev, [pkg.id]: next };
    });
  };

  return (
    <section
      id="paket"
      aria-labelledby="paket-heading"
      className="scroll-mt-20 py-14 sm:py-20 bg-[#F4EFEB]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <p className="text-sm font-semibold text-[#994703] mb-2">
            Harga Transparan &amp; Ramah Rombongan
          </p>
          <h2
            id="paket-heading"
            className="font-display text-2xl sm:text-4xl font-bold text-[#1B4D3E] tracking-tight mb-3"
          >
            Paket Wisata Desa Lereng Asri
          </h2>
          <p className="text-base sm:text-lg text-[#374151] leading-relaxed">
            Atur jumlah peserta untuk melihat estimasi biaya otomatis. Rombongan minimal 10 orang mendapat diskon 10%, dan 20+ orang diskon 15%.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {packages.map((pkg) => {
            const count = guestCounts[pkg.id] ?? pkg.minGuests;
            const calc = calculatePackageTotal(pkg, count);

            return (
              <article
                key={pkg.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-shadow ${
                  pkg.popular
                    ? 'bg-white border-2 border-[#1B4D3E] shadow-warm'
                    : 'bg-white border border-[#1B4D3E]/12 shadow-warm'
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-[#994703] mb-1.5">
                    {pkg.popular ? 'Pilihan Favorit Keluarga · ' : ''}
                    {pkg.duration}
                  </p>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] mb-2">
                    {pkg.name}
                  </h3>

                  <p className="text-sm text-[#4B5563] mb-4">
                    Cocok untuk: {pkg.recommendedFor} · Min. {pkg.minGuests} orang
                  </p>

                  <div className="pb-5 mb-5 border-b border-[#1B4D3E]/10">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-bold text-[#1B4D3E] tabular-nums">
                        {formatRupiah(pkg.pricePerPerson)}
                      </span>
                      <span className="text-sm text-[#4B5563]">/ orang</span>
                    </div>
                  </div>

                  <p className="text-base text-[#374151] leading-relaxed mb-5">
                    {pkg.summary}
                  </p>

                  <ul className="space-y-2.5 mb-6" aria-label={`Fasilitas ${pkg.name}`}>
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm sm:text-base text-[#1F2937]"
                      >
                        <Check
                          className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-[#1B4D3E]/10 space-y-4">
                  {/* Guest Count Stepper */}
                  <div className="flex items-center justify-between gap-3 bg-[#FBF9F5] p-3 rounded-xl border border-[#1B4D3E]/10">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]">
                      <Users className="w-4 h-4 text-[#1B4D3E]" aria-hidden="true" />
                      <span>Peserta</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={`Kurangi jumlah peserta ${pkg.name}`}
                        onClick={() => updateGuests(pkg, -1)}
                        disabled={calc.guests <= pkg.minGuests}
                        className="min-h-[44px] min-w-[44px] rounded-lg bg-white border border-[#1B4D3E]/20 text-[#1B4D3E] flex items-center justify-center hover:bg-[#F4EFEB] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" aria-hidden="true" />
                      </button>

                      <span
                        data-testid={`guest-count-${pkg.id}`}
                        className="min-w-[3.5rem] text-center text-base font-bold text-[#1F2937] tabular-nums"
                      >
                        {calc.guests} org
                      </span>

                      <button
                        type="button"
                        aria-label={`Tambah jumlah peserta ${pkg.name}`}
                        onClick={() => updateGuests(pkg, 1)}
                        className="min-h-[44px] min-w-[44px] rounded-lg bg-white border border-[#1B4D3E]/20 text-[#1B4D3E] flex items-center justify-center hover:bg-[#F4EFEB] cursor-pointer"
                      >
                        <Plus className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Total Readout */}
                  <div className="flex items-center justify-between text-sm sm:text-base">
                    <span className="text-[#4B5563]">
                      Estimasi total
                      {calc.discountPercent > 0 && (
                        <span className="block text-xs font-semibold text-[#994703]">
                          Hemat {calc.discountPercent}% ({formatRupiah(calc.discountAmount)})
                        </span>
                      )}
                    </span>
                    <span
                      data-testid={`package-total-${pkg.id}`}
                      className="text-lg font-bold text-[#1B4D3E] tabular-nums"
                    >
                      {formatRupiah(calc.total)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg, calc.guests)}
                    className={`w-full min-h-[52px] px-5 py-3.5 text-base font-bold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4D3E] ${
                      pkg.popular
                        ? 'bg-[#1B4D3E] hover:bg-[#143B2F] text-white'
                        : 'bg-[#D97736] hover:bg-[#C26528] text-white'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    <span>Pesan Paket via WhatsApp</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
