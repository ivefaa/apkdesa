---
name: Lereng Asri Natural Tourism
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#404945'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#707974'
  outline-variant: '#c0c9c3'
  surface-tint: '#376757'
  primary: '#003629'
  on-primary: '#ffffff'
  primary-container: '#1b4d3e'
  on-primary-container: '#8abda9'
  inverse-primary: '#9ed1bd'
  secondary: '#994703'
  on-secondary: '#ffffff'
  secondary-container: '#fc934f'
  on-secondary-container: '#6d3000'
  tertiary: '#003714'
  on-tertiary: '#ffffff'
  tertiary-container: '#005021'
  on-tertiary-container: '#16cc60'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#baeed9'
  primary-fixed-dim: '#9ed1bd'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#1d4f40'
  secondary-fixed: '#ffdbc9'
  secondary-fixed-dim: '#ffb68c'
  on-secondary-fixed: '#321200'
  on-secondary-fixed-variant: '#753400'
  tertiary-fixed: '#66ff8e'
  tertiary-fixed-dim: '#3de273'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005322'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses the serene, welcoming, and grounded essence of mountain rural tourism. The design language marries earthy warmth with contemporary mobile clarity, evoking lush highland canopies, fertile volcanic soil, and authentic village hospitality. 

The visual movement blends **Modern Humanist Organicism** with subtle **Tactile Warmth**:
- Generous touch zones and soft radiuses make navigation effortless for visitors on the move.
- Earthy, high-contrast typography conveys sincerity and reliable wayfinding.
- Visual surfaces feel natural and unhurried—warm ivory backdrops, leafy canopy accents, and sun-baked terracotta cues create a tranquil digital retreat.

## Colors

The palette draws directly from sub-alpine agrarian flora and terracotta clay craft:

- **Primary (`#1B4D3E` & `#2D6A4F`)**: Deep highland forest green, serving as the foundational anchor for headers, primary actions, and brand dominance.
- **Secondary (`#D97736` & `#E07A5F`)**: Rich terracotta and sun-baked clay, utilized for promotional highlights, booking accents, and warm call-to-actions.
- **Tertiary / Action Accent (`#25D366`)**: Instant conversational messaging green, reserved exclusively for the dedicated floating WhatsApp concierge button and direct communication badges.
- **Surface & Background (`#FBF9F5` base, `#F4EFEB` container)**: Gentle ivory and soft raw parchment, keeping daylight brightness readable outdoors without clinical glare.
- **Neutral Typography (`#1F2937` primary, `#374151` secondary, `#6B7280` muted)**: High-contrast deep charcoal, ensuring WCAG AAA legibility in direct sunlight.

## Typography

The typography leverages **Plus Jakarta Sans** across all hierarchies to maintain a modern, hospitable, and open posture. The rounded terminals and generous x-height prevent fatigue when reading itinerary guides or accommodation details on mobile screens.

Headlines employ medium-tight tracking for a grounded, editorial presence. Body text preserves open line heights (1.5x to 1.6x) to facilitate swift scanning during outdoor navigation and travel planning.

## Layout & Spacing

This design system uses a mobile-first fluid grid structured for ergonomic thumb-zone usage:

- **Mobile Viewports (<640px)**: 4-column layout, 16px (`1rem`) outer margins, and 16px gutters. Interactive components maintain a generous safe area along the bottom bar for thumb accessibility.
- **Tablet Viewports (640px - 1024px)**: 8-column layout with 24px margins, allowing split card listings and side-by-side amenity overviews.
- **Desktop Viewports (>1024px)**: 12-column layout capped at a maximum content boundary of 1200px, utilizing 32px (`2rem`) margins.

Vertical rhythm adheres strictly to 8px base increments to keep content density predictable.

## Elevation & Depth

Visual depth avoids cold, artificial dropshadows in favor of warm, sunlight-diffused layering:

- **Surface Layering**: The canvas sits on `#FBF9F5`. Embedded sections, card modules, and drawers rest on `#F4EFEB` or crisp `#FFFFFF` cards with warm ambient cast.
- **Soft Ambient Shadows**: Shadows incorporate an earthy pine and umber tint: `0 8px 24px -4px rgba(27, 77, 62, 0.08), 0 2px 6px -1px rgba(27, 77, 62, 0.04)`.
- **Card Depth**: Cards use hairline tonal borders (`1px solid rgba(45, 106, 79, 0.1)`) instead of heavy outlines, generating a soft, paper-like boundary.
- **Floating Overlays & Sticky Bars**: The floating WhatsApp CTA and bottom navigation dock rely on elevated diffuse depth: `0 12px 32px -4px rgba(0, 0, 0, 0.12)`, floating proudly above scroll surfaces.

## Shapes

The geometric form language is rounded and friendly, reinforcing the organic atmosphere of rural hills and natural contours:

- Standard cards, interactive controls, and modal bottom sheets utilize **Rounded (0.5rem to 1rem)** and **Rounded-2xl (1rem to 1.5rem)** for comfortable tactile hand-feel.
- Filter chips, amenity tags, and circular action icons use pill geometry for intuitive touch affordance.

## Components

### Buttons
- **Touch Targets**: Minimum height of `48px` (desktop: `44px`) across all primary and secondary buttons.
- **Primary Action**: Solid `#1B4D3E` forest green background, crisp `#FFFFFF` label text, radius of `1rem` (`rounded-2xl`), subtle hover scale.
- **Secondary Action**: Warm terracotta `#D97736` background or outline variant with `1.5px` border in `#1B4D3E` on an ivory background.
- **Padding**: `14px 24px` for prominent finger taps.

### Floating WhatsApp CTA Button
- **Placement**: Fixed floating at bottom-right corner, `20px` offset above bottom safe areas.
- **Styling**: `#25D366` vibrant emerald background, `#FFFFFF` messaging icon, circular `56px × 56px` footprint or pill variant with "Hubungi Desa" label.
- **Elevation**: Lifted shadow `0 8px 20px rgba(37, 211, 102, 0.35)`.

### Cards (Homestays, Tours & Nature Attractions)
- **Container**: `#FFFFFF` background with `1px` subtle outline in `rgba(45, 106, 79, 0.08)`, radius `1.25rem` (`rounded-2xl`).
- **Imagery**: Edge-to-edge top image with a 4:3 or 16:9 ratio, softly rounded at top corners.
- **Internal Padding**: `1.25rem` (`20px`) spacing for headline, pricing, location pin, and facility chip strip.

### Chips & Facility Badges
- **Facility Badges**: Pill-shaped (`rounded-full`), `#F4EFEB` background with `#2D6A4F` text, compact padding `6px 12px`, featuring micro-icons (e.g., Wi-Fi, Gazebo, Pemandu, Parkir).
- **Filter Chips**: Tap-toggleable pill chips; inactive uses `#FFFFFF` with muted grey text; active uses `#1B4D3E` with white text.

### Form Inputs & Date Pickers
- **Height**: Minimum `48px` input box.
- **Borders & Background**: `#FFFFFF` background, `1.5px` border in `#D1D5DB`, transitions to `#2D6A4F` on focus with an organic glow ring `rgba(45, 106, 79, 0.15)`.
- **Labels**: Fixed above input in `#374151`, font size `14px` (`body-sm`), weight `600`.

### Lists & Activity Guides
- **Dividers**: Gentle parchment borders `1px solid rgba(224, 122, 95, 0.15)`.
- **List Items**: Touch area padded to minimum `52px` vertical height, including leading icons tinted with `#D97736` terracotta.