import type {
  BookingMessagePayload,
  Destination,
  DestinationCategory,
  ReviewInput,
  TourPackage,
  VisitorReview,
} from '../types/tourism';

export const VILLAGE_WHATSAPP_NUMBER = '6281234567890';

export function formatRupiah(amount: number): string {
  const safeAmount = Math.max(0, Math.round(amount));
  const formatted = new Intl.NumberFormat('id-ID').format(safeAmount);
  return `Rp ${formatted}`;
}

export function filterDestinations(
  destinations: Destination[],
  category: DestinationCategory
): Destination[] {
  if (category === 'semua') {
    return destinations;
  }
  return destinations.filter((item) => item.category === category);
}

export function calculatePackageTotal(
  pkg: Pick<TourPackage, 'pricePerPerson' | 'minGuests'>,
  requestedGuests: number
): {
  guests: number;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  effectivePerPerson: number;
} {
  const guests = Math.max(pkg.minGuests, Math.floor(requestedGuests || pkg.minGuests));
  const subtotal = guests * pkg.pricePerPerson;
  let discountPercent = 0;

  if (guests >= 20) {
    discountPercent = 15;
  } else if (guests >= 10) {
    discountPercent = 10;
  }

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discountAmount;
  const effectivePerPerson = Math.round(total / guests);

  return {
    guests,
    subtotal,
    discountPercent,
    discountAmount,
    total,
    effectivePerPerson,
  };
}

export function buildWhatsAppBookingUrl(
  phone: string,
  payload: BookingMessagePayload
): { url: string; message: string } {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  const formattedDate = payload.visitDate.trim() || 'Belum ditentukan';
  const discountLine =
    payload.discountPercent > 0
      ? `Diskon Rombongan: ${payload.discountPercent}%\n`
      : '';
  const notesLine = payload.notes?.trim()
    ? `Catatan Tambahan: ${payload.notes.trim()}\n`
    : '';

  const message =
    `Halo Pengelola Desa Wisata Lereng Asri,\n` +
    `Saya ingin memesan kunjungan wisata dengan rincian berikut:\n\n` +
    `Nama Pemesan: ${payload.customerName.trim() || '-'}\n` +
    `Paket Wisata: ${payload.packageName}\n` +
    `Tanggal Kunjungan: ${formattedDate}\n` +
    `Jumlah Peserta: ${payload.guests} orang\n` +
    discountLine +
    `Estimasi Total: ${formatRupiah(payload.totalPrice)}\n` +
    notesLine +
    `\nMohon informasi ketersediaan jadwalnya. Terima kasih!`;

  return {
    url: `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`,
    message,
  };
}

export function computeReviewStats(reviews: VisitorReview[]): {
  averageRating: number;
  totalReviews: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
} {
  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  if (reviews.length === 0) {
    return { averageRating: 0, totalReviews: 0, distribution };
  }

  let sum = 0;
  for (const review of reviews) {
    sum += review.rating;
    distribution[review.rating] += 1;
  }

  const averageRating = Math.round((sum / reviews.length) * 10) / 10;

  return {
    averageRating,
    totalReviews: reviews.length,
    distribution,
  };
}

export function filterReviews(
  reviews: VisitorReview[],
  ratingFilter: 'all' | 5 | 4
): VisitorReview[] {
  if (ratingFilter === 'all') {
    return reviews;
  }
  return reviews.filter((review) => review.rating === ratingFilter);
}

export function validateReviewInput(input: ReviewInput): {
  valid: boolean;
  errors: Partial<Record<keyof ReviewInput, string>>;
} {
  const errors: Partial<Record<keyof ReviewInput, string>> = {};

  if (!input.visitorName.trim() || input.visitorName.trim().length < 2) {
    errors.visitorName = 'Mohon isi nama lengkap minimal 2 huruf.';
  }
  if (!input.city.trim() || input.city.trim().length < 2) {
    errors.city = 'Mohon isi kota asal Anda.';
  }
  if (!input.packageName.trim()) {
    errors.packageName = 'Pilih paket atau destinasi yang dikunjungi.';
  }
  if (input.rating < 1 || input.rating > 5) {
    errors.rating = 'Pilih penilaian 1 hingga 5 bintang.';
  }
  if (!input.comment.trim() || input.comment.trim().length < 12) {
    errors.comment = 'Ceritakan pengalaman Anda minimal 12 karakter.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
