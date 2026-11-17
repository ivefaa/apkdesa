import { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink, MessageCircle, X } from 'lucide-react';
import type { TourPackage } from '../types/tourism';
import {
  VILLAGE_WHATSAPP_NUMBER,
  buildWhatsAppBookingUrl,
  calculatePackageTotal,
  formatRupiah,
} from '../utils/tourismLogic';

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packages: TourPackage[];
  initialPackageName?: string;
  initialGuests?: number;
}

export function WhatsAppBookingModal({
  isOpen,
  onClose,
  packages,
  initialPackageName,
  initialGuests = 4,
}: WhatsAppBookingModalProps) {
  const [selectedName, setSelectedName] = useState<string>(
    initialPackageName || packages[0]?.name || 'Paket Jelajah Sehari Penuh'
  );
  const [customerName, setCustomerName] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [guests, setGuests] = useState<number>(initialGuests);
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedName(
        initialPackageName || packages[0]?.name || 'Paket Jelajah Sehari Penuh'
      );
      setGuests(initialGuests);
      setCopied(false);
    }
  }, [isOpen, initialPackageName, initialGuests, packages]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedPkg = packages.find((p) => p.name === selectedName);
  const calc = matchedPkg
    ? calculatePackageTotal(matchedPkg, guests)
    : {
        guests: Math.max(1, guests),
        total: Math.max(1, guests) * 25000,
        discountPercent: 0,
      };

  const { url, message } = buildWhatsAppBookingUrl(VILLAGE_WHATSAPP_NUMBER, {
    packageName: selectedName,
    visitDate,
    guests: calc.guests,
    customerName,
    notes,
    totalPrice: calc.total,
    discountPercent: calc.discountPercent,
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-xs p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#FBF9F5] w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto p-5 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-sm font-semibold text-[#994703] mb-0.5">
              Terhubung Langsung dengan Pengelola Desa
            </p>
            <h2
              id="wa-modal-title"
              className="font-display text-2xl font-bold text-[#1B4D3E]"
            >
              Pesan Wisata via WhatsApp
            </h2>
          </div>

          <button
            type="button"
            aria-label="Tutup jendela pemesanan WhatsApp"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] rounded-full bg-white border border-[#1B4D3E]/15 text-[#1F2937] flex items-center justify-center hover:bg-[#F4EFEB] cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="wa-customer-name"
              className="block text-sm font-semibold text-[#374151] mb-1.5"
            >
              Nama Pemesan
            </label>
            <input
              id="wa-customer-name"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Contoh: Bapak Ahmad Fauzi"
              className="w-full min-h-[48px] px-4 py-2.5 bg-white border-[1.5px] border-[#D1D5DB] rounded-xl text-base text-[#1F2937] focus:outline-none focus:border-[#2D6A4F]"
            />
          </div>

          <div>
            <label
              htmlFor="wa-package"
              className="block text-sm font-semibold text-[#374151] mb-1.5"
            >
              Pilihan Paket / Tujuan
            </label>
            <select
              id="wa-package"
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
              className="w-full min-h-[48px] px-4 py-2.5 bg-white border-[1.5px] border-[#D1D5DB] rounded-xl text-base text-[#1F2937] focus:outline-none focus:border-[#2D6A4F]"
            >
              {packages.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} ({formatRupiah(p.pricePerPerson)}/org)
                </option>
              ))}
              <option value="Air Terjun Embun Pelangi">
                Tanya Wisata Air Terjun Embun Pelangi
              </option>
              <option value="Agrowisata Kebun Kopi & Teh">
                Tanya Agrowisata Kebun Kopi &amp; Teh
              </option>
              <option value="Hutan Pinus & Glamping Asri">
                Tanya Hutan Pinus &amp; Glamping Asri
              </option>
              <option value="Pendopo Homestay & Dapur Desa">
                Tanya Pendopo Homestay &amp; Dapur Desa
              </option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="wa-date"
                className="block text-sm font-semibold text-[#374151] mb-1.5"
              >
                Rencana Tanggal
              </label>
              <input
                id="wa-date"
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full min-h-[48px] px-4 py-2.5 bg-white border-[1.5px] border-[#D1D5DB] rounded-xl text-base text-[#1F2937] focus:outline-none focus:border-[#2D6A4F]"
              />
            </div>

            <div>
              <label
                htmlFor="wa-guests"
                className="block text-sm font-semibold text-[#374151] mb-1.5"
              >
                Jumlah Peserta (Orang)
              </label>
              <input
                id="wa-guests"
                type="number"
                min={matchedPkg?.minGuests || 1}
                max={100}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value) || 1)}
                className="w-full min-h-[48px] px-4 py-2.5 bg-white border-[1.5px] border-[#D1D5DB] rounded-xl text-base text-[#1F2937] tabular-nums focus:outline-none focus:border-[#2D6A4F]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="wa-notes"
              className="block text-sm font-semibold text-[#374151] mb-1.5"
            >
              Catatan Tambahan (Opsional)
            </label>
            <input
              id="wa-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Bawa balita atau pesan makanan tanpa pedas"
              className="w-full min-h-[48px] px-4 py-2.5 bg-white border-[1.5px] border-[#D1D5DB] rounded-xl text-base text-[#1F2937] focus:outline-none focus:border-[#2D6A4F]"
            />
          </div>

          <div className="p-4 bg-[#F4EFEB] rounded-2xl border border-[#1B4D3E]/10 flex items-center justify-between">
            <span className="text-sm font-medium text-[#374151]">
              Estimasi Total Biaya
              {calc.discountPercent > 0 && (
                <span className="block text-xs text-[#994703] font-semibold">
                  Termasuk diskon rombongan {calc.discountPercent}%
                </span>
              )}
            </span>
            <span className="text-xl font-bold text-[#1B4D3E] tabular-nums">
              {formatRupiah(calc.total)}
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[52px] px-6 py-3.5 bg-[#1B4D3E] hover:bg-[#143B2F] text-white text-base font-bold rounded-2xl flex items-center justify-center gap-2.5 transition-colors shadow-md"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" aria-hidden="true" />
              <span>Buka WhatsApp &amp; Kirim Pesan</span>
              <ExternalLink className="w-4 h-4 opacity-80" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full min-h-[48px] px-5 py-3 bg-white border border-[#1B4D3E]/20 hover:bg-[#F4EFEB] text-[#1F2937] text-sm font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#2D6A4F]" aria-hidden="true" />
                  <span>Teks Pesanan Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>Salin Format Pesan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
