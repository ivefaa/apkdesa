import { useState, type FormEvent } from 'react';
import { CheckCircle2, MessageSquarePlus, Star } from 'lucide-react';
import type { ReviewInput, TourPackage, VisitorReview } from '../types/tourism';
import {
  computeReviewStats,
  filterReviews,
  validateReviewInput,
} from '../utils/tourismLogic';

interface ReviewsSectionProps {
  reviews: VisitorReview[];
  packages: TourPackage[];
  onAddReview: (review: VisitorReview) => void;
}

export function ReviewsSection({
  reviews,
  packages,
  onAddReview,
}: ReviewsSectionProps) {
  const [ratingFilter, setRatingFilter] = useState<'all' | 5 | 4>('all');
  const [showForm, setShowForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [visitorName, setVisitorName] = useState('');
  const [city, setCity] = useState('');
  const [packageName, setPackageName] = useState(packages[0]?.name || '');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewInput, string>>>(
    {}
  );

  const stats = computeReviewStats(reviews);
  const visibleReviews = filterReviews(reviews, ratingFilter);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateReviewInput({
      visitorName,
      city,
      packageName,
      rating,
      comment,
    });

    if (!result.valid) {
      setErrors(result.errors);
      setSubmitSuccess(false);
      return;
    }

    const newReview: VisitorReview = {
      id: `rev-${Date.now()}`,
      visitorName: visitorName.trim(),
      city: city.trim(),
      packageName,
      rating: rating as 1 | 2 | 3 | 4 | 5,
      comment: comment.trim(),
      visitDate: 'Baru saja',
      verified: false,
    };

    onAddReview(newReview);
    setVisitorName('');
    setCity('');
    setComment('');
    setRating(5);
    setErrors({});
    setSubmitSuccess(true);
    setShowForm(false);
    setRatingFilter('all');
  };

  return (
    <section
      id="ulasan"
      aria-labelledby="ulasan-heading"
      className="scroll-mt-20 py-14 sm:py-20 bg-[#FBF9F5]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#994703] mb-2">
              Cerita Asli Wisatawan
            </p>
            <h2
              id="ulasan-heading"
              className="font-display text-2xl sm:text-4xl font-bold text-[#1B4D3E] tracking-tight mb-3"
            >
              Ulasan Pengunjung Lereng Asri
            </h2>
            <p className="text-base sm:text-lg text-[#374151] leading-relaxed">
              Baca pengalaman keluarga dan rombongan yang sudah berkunjung untuk membantu rencana liburan Anda.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowForm((prev) => !prev);
              setSubmitSuccess(false);
            }}
            aria-expanded={showForm}
            className="min-h-[50px] px-6 py-3 bg-[#1B4D3E] hover:bg-[#143B2F] text-white text-base font-semibold rounded-2xl flex items-center justify-center gap-2 shrink-0 cursor-pointer transition-colors"
          >
            <MessageSquarePlus className="w-5 h-5" aria-hidden="true" />
            <span>{showForm ? 'Tutup Form Ulasan' : 'Tulis Ulasan Anda'}</span>
          </button>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div
            role="status"
            className="mb-8 p-4 rounded-2xl bg-[#E7F4EC] border border-[#2D6A4F]/30 text-[#1B4D3E] flex items-center gap-3 text-base font-medium"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>
              Terima kasih! Ulasan Anda telah ditambahkan ke daftar ulasan pengunjung.
            </span>
          </div>
        )}

        {/* Interactive Write Review Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mb-10 bg-white p-5 sm:p-7 rounded-2xl border border-[#1B4D3E]/15 shadow-warm space-y-5"
          >
            <h3 className="text-xl font-bold text-[#1F2937]">
              Bagikan Pengalaman Kunjungan Anda
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="review-name"
                  className="block text-sm font-semibold text-[#374151] mb-1.5"
                >
                  Nama Lengkap
                </label>
                <input
                  id="review-name"
                  type="text"
                  value={visitorName}
                  onChange={(e) => {
                    setVisitorName(e.target.value);
                    if (errors.visitorName) setErrors({ ...errors, visitorName: undefined });
                  }}
                  placeholder="Contoh: Ibu Kartini"
                  className="w-full min-h-[48px] px-4 py-2.5 bg-white border-[1.5px] border-[#D1D5DB] rounded-xl text-base text-[#1F2937] focus:outline-none focus:border-[#2D6A4F]"
                />
                {errors.visitorName && (
                  <p className="mt-1 text-sm text-[#BA1A1A] font-medium">
                    {errors.visitorName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="review-city"
                  className="block text-sm font-semibold text-[#374151] mb-1.5"
                >
                  Kota Asal
                </label>
                <input
                  id="review-city"
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (errors.city) setErrors({ ...errors, city: undefined });
                  }}
                  placeholder="Contoh: Semarang"
                  className="w-full min-h-[48px] px-4 py-2.5 bg-white border-[1.5px] border-[#D1D5DB] rounded-xl text-base text-[#1F2937] focus:outline-none focus:border-[#2D6A4F]"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-[#BA1A1A] font-medium">
                    {errors.city}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="review-package"
                  className="block text-sm font-semibold text-[#374151] mb-1.5"
                >
                  Paket atau Destinasi yang Dikunjungi
                </label>
                <select
                  id="review-package"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  className="w-full min-h-[48px] px-4 py-2.5 bg-white border-[1.5px] border-[#D1D5DB] rounded-xl text-base text-[#1F2937] focus:outline-none focus:border-[#2D6A4F]"
                >
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.name}>
                      {pkg.name}
                    </option>
                  ))}
                  <option value="Kunjungan Mandiri">Kunjungan Mandiri</option>
                </select>
              </div>

              <div>
                <span className="block text-sm font-semibold text-[#374151] mb-1.5">
                  Penilaian Bintang
                </span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      aria-label={`Beri nilai ${star} bintang`}
                      aria-pressed={rating === star}
                      onClick={() => setRating(star)}
                      className="min-h-[48px] min-w-[48px] rounded-xl border border-[#1B4D3E]/15 flex items-center justify-center hover:bg-[#F4EFEB] cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'fill-[#D97736] text-[#D97736]'
                            : 'text-[#D1D5DB]'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="review-comment"
                className="block text-sm font-semibold text-[#374151] mb-1.5"
              >
                Cerita Pengalaman Anda
              </label>
              <textarea
                id="review-comment"
                rows={3}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  if (errors.comment) setErrors({ ...errors, comment: undefined });
                }}
                placeholder="Ceritakan tentang suasana alam, pelayanan pemandu, atau fasilitas di desa..."
                className="w-full p-4 bg-white border-[1.5px] border-[#D1D5DB] rounded-xl text-base text-[#1F2937] focus:outline-none focus:border-[#2D6A4F]"
              />
              {errors.comment && (
                <p className="mt-1 text-sm text-[#BA1A1A] font-medium">
                  {errors.comment}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="min-h-[50px] px-6 py-3 bg-[#D97736] hover:bg-[#C26528] text-white text-base font-bold rounded-xl cursor-pointer transition-colors"
              >
                Kirim Ulasan Pengunjung
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="min-h-[50px] px-6 py-3 bg-[#F4EFEB] text-[#1F2937] text-base font-semibold rounded-xl hover:bg-[#EAE2DB] cursor-pointer transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        )}

        {/* Rating Summary + Filter Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#1B4D3E]/10 shadow-warm">
            <div className="flex items-baseline gap-2 mb-2">
              <span
                data-testid="average-rating"
                className="text-4xl font-bold text-[#1B4D3E] tabular-nums"
              >
                {stats.averageRating.toFixed(1)}
              </span>
              <span className="text-base text-[#4B5563]">/ 5.0</span>
            </div>

            <div className="flex items-center gap-1 mb-2" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(stats.averageRating)
                      ? 'fill-[#D97736] text-[#D97736]'
                      : 'text-[#D1D5DB]'
                  }`}
                />
              ))}
            </div>

            <p
              data-testid="total-reviews-count"
              className="text-sm text-[#4B5563] mb-5"
            >
              Berdasarkan {stats.totalReviews} ulasan wisatawan
            </p>

            <div className="space-y-2 mb-6">
              {([5, 4, 3, 2, 1] as const).map((star) => {
                const count = stats.distribution[star];
                const pct =
                  stats.totalReviews > 0
                    ? Math.round((count / stats.totalReviews) * 100)
                    : 0;
                return (
                  <div
                    key={star}
                    className="flex items-center gap-2.5 text-sm text-[#374151]"
                  >
                    <span className="w-12 tabular-nums">{star} bintang</span>
                    <div className="flex-1 h-2 bg-[#F4EFEB] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2D6A4F] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-7 text-right tabular-nums text-[#4B5563]">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter ulasan berdasarkan bintang">
              {[
                { id: 'all' as const, label: 'Semua' },
                { id: 5 as const, label: '5 Bintang' },
                { id: 4 as const, label: '4 Bintang' },
              ].map((btn) => (
                <button
                  key={String(btn.id)}
                  type="button"
                  onClick={() => setRatingFilter(btn.id)}
                  className={`min-h-[44px] px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                    ratingFilter === btn.id
                      ? 'bg-[#1B4D3E] text-white'
                      : 'bg-[#F4EFEB] text-[#374151] hover:bg-[#EAE2DB]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div
            data-testid="reviews-list"
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {visibleReviews.length === 0 ? (
              <div className="sm:col-span-2 bg-white rounded-2xl p-8 text-center border border-[#1B4D3E]/10 text-[#4B5563]">
                Belum ada ulasan dengan filter penilaian ini.
              </div>
            ) : (
              visibleReviews.map((review) => (
                <article
                  key={review.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-[#1B4D3E]/10 shadow-warm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-0.5" aria-label={`Penilaian ${review.rating} dari 5 bintang`}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              s <= review.rating
                                ? 'fill-[#D97736] text-[#D97736]'
                                : 'text-[#D1D5DB]'
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#6B7280]">
                        {review.visitDate}
                      </span>
                    </div>

                    <p className="text-base text-[#1F2937] leading-relaxed mb-4">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1B4D3E]/10">
                    <p className="font-bold text-sm sm:text-base text-[#1B4D3E]">
                      {review.visitorName}
                    </p>
                    <p className="text-xs sm:text-sm text-[#4B5563]">
                      {review.city} <span aria-hidden="true">·</span>{' '}
                      {review.packageName}
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
