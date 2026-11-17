import { Compass, Home, MessageCircle, Package, Star } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export function Navbar({
  activeSection,
  onNavigate,
  onOpenBooking,
}: NavbarProps) {
  const navLinks = [
    { id: 'destinasi', label: 'Destinasi' },
    { id: 'paket', label: 'Paket' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'lokasi', label: 'Lokasi' },
    { id: 'ulasan', label: 'Ulasan' },
  ];

  const mobileTabs = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'destinasi', label: 'Destinasi', icon: Compass },
    { id: 'paket', label: 'Paket', icon: Package },
    { id: 'ulasan', label: 'Ulasan', icon: Star },
  ];

  return (
    <>
      {/* Top Bar: 3-Zone Contract on Desktop, Compact Static Bar on Mobile (preserves <=15% mobile sticky cap) */}
      <header className="bg-[#FBF9F5]/95 md:sticky md:top-0 z-30 border-b border-[#1B4D3E]/10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('beranda');
            }}
            className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#1B4D3E] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B4D3E] rounded"
          >
            Lereng Asri
          </a>

          {/* Zone 2: 5 Concise Single-Line Nav Links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-6 text-[15px] font-medium text-[#374151]"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.id);
                }}
                className={`py-2 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                  activeSection === link.id
                    ? 'text-[#1B4D3E] border-[#1B4D3E] font-semibold'
                    : 'border-transparent hover:text-[#1B4D3E] hover:border-[#2D6A4F]/40'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onOpenBooking}
              className="min-h-[44px] px-4 sm:px-5 py-2.5 bg-[#1B4D3E] hover:bg-[#143B2F] active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4D3E]"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
              <span>Pesan WhatsApp</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Dock (Thumb Zone, <= 8% viewport height) */}
      <nav
        aria-label="Navigasi cepat seluler"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-t border-[#1B4D3E]/15 shadow-float"
      >
        <div className="grid grid-cols-4 h-16">
          {mobileTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigate(tab.id)}
                className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 text-[11px] font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#1B4D3E] bg-[#1B4D3E]/5'
                    : 'text-[#4B5563] hover:text-[#1B4D3E]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? 'text-[#1B4D3E]' : 'text-[#6B7280]'}`}
                  aria-hidden="true"
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
