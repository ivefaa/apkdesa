import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppBookingUrl,
  calculatePackageTotal,
  computeReviewStats,
  filterDestinations,
  filterReviews,
  formatRupiah,
  validateReviewInput,
} from './tourismLogic';
import type { Destination, VisitorReview } from '../types/tourism';

test('formatRupiah formats Indonesian currency without decimals', () => {
  assert.equal(formatRupiah(125000), 'Rp 125.000');
  assert.equal(formatRupiah(0), 'Rp 0');
  assert.equal(formatRupiah(-5000), 'Rp 0');
});

test('filterDestinations filters correctly by category', () => {
  const sample: Destination[] = [
    {
      id: '1',
      name: 'Air Terjun',
      category: 'alam',
      categoryLabel: 'Alam & Air Terjun',
      shortDesc: 'Segar',
      fullDesc: 'Segar alami',
      image: '/a.jpg',
      imageAlt: 'Air Terjun',
      openHours: '07.00–17.00',
      ticketPrice: 15000,
      distanceFromGate: '10 menit',
      facilities: ['Parkir'],
      coordinates: { lat: -7.45, lng: 110.43 },
    },
    {
      id: '2',
      name: 'Kebun Kopi',
      category: 'agrowisata',
      categoryLabel: 'Agrowisata',
      shortDesc: 'Kopi',
      fullDesc: 'Kopi lereng',
      image: '/b.jpg',
      imageAlt: 'Kebun Kopi',
      openHours: '08.00–16.00',
      ticketPrice: 20000,
      distanceFromGate: '15 menit',
      facilities: ['Pemandu'],
      coordinates: { lat: -7.45, lng: 110.44 },
    },
  ];

  assert.equal(filterDestinations(sample, 'semua').length, 2);
  assert.equal(filterDestinations(sample, 'alam').length, 1);
  assert.equal(filterDestinations(sample, 'alam')[0].id, '1');
  assert.equal(filterDestinations(sample, 'menginap').length, 0);
});

test('calculatePackageTotal enforces minimum guests and applies group discounts', () => {
  const pkg = { pricePerPerson: 100000, minGuests: 2 };

  const belowMin = calculatePackageTotal(pkg, 1);
  assert.equal(belowMin.guests, 2);
  assert.equal(belowMin.discountPercent, 0);
  assert.equal(belowMin.total, 200000);

  const group10 = calculatePackageTotal(pkg, 10);
  assert.equal(group10.discountPercent, 10);
  assert.equal(group10.discountAmount, 100000);
  assert.equal(group10.total, 900000);

  const group20 = calculatePackageTotal(pkg, 20);
  assert.equal(group20.discountPercent, 15);
  assert.equal(group20.total, 1700000);
});

test('buildWhatsAppBookingUrl creates valid wa.me URL with encoded Indonesian summary', () => {
  const result = buildWhatsAppBookingUrl('+62 812-3456-7890', {
    packageName: 'Paket Jelajah Alam & Kopi',
    visitDate: '2026-12-20',
    guests: 4,
    customerName: 'Budi Santoso',
    notes: 'Minta pemandu ramah anak',
    totalPrice: 500000,
    discountPercent: 0,
  });

  assert.ok(result.url.startsWith('https://wa.me/6281234567890?text='));
  assert.ok(result.message.includes('Budi Santoso'));
  assert.ok(result.message.includes('Paket Jelajah Alam & Kopi'));
  assert.ok(result.message.includes('Rp 500.000'));
});

test('computeReviewStats and filterReviews calculate averages and filter stars', () => {
  const reviews: VisitorReview[] = [
    {
      id: 'r1',
      visitorName: 'Siti',
      city: 'Semarang',
      packageName: 'Paket Sehari',
      rating: 5,
      comment: 'Luar biasa sejuk',
      visitDate: '10 Nov 2026',
    },
    {
      id: 'r2',
      visitorName: 'Andi',
      city: 'Yogyakarta',
      packageName: 'Glamping Pinus',
      rating: 4,
      comment: 'Nyaman sekali',
      visitDate: '08 Nov 2026',
    },
  ];

  const stats = computeReviewStats(reviews);
  assert.equal(stats.totalReviews, 2);
  assert.equal(stats.averageRating, 4.5);
  assert.equal(stats.distribution[5], 1);
  assert.equal(stats.distribution[4], 1);

  assert.equal(filterReviews(reviews, 5).length, 1);
  assert.equal(filterReviews(reviews, 4).length, 1);
  assert.equal(filterReviews(reviews, 'all').length, 2);
});

test('validateReviewInput rejects empty or too-short inputs and accepts valid reviews', () => {
  const invalid = validateReviewInput({
    visitorName: '',
    city: 'A',
    packageName: '',
    rating: 0,
    comment: 'Bagus',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.visitorName);
  assert.ok(invalid.errors.city);
  assert.ok(invalid.errors.packageName);
  assert.ok(invalid.errors.rating);
  assert.ok(invalid.errors.comment);

  const valid = validateReviewInput({
    visitorName: 'Dewi Lestari',
    city: 'Solo',
    packageName: 'Paket Jelajah Alam & Kopi',
    rating: 5,
    comment: 'Pemandu sangat ramah dan air terjunnya bersih sekali!',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});
