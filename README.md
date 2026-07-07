# Aura & Light Wedding Photography Studio

An elegant, romantic, and editorial-grade fine art wedding photography website. This is a custom-coded, highly optimized single-page replacement built using **React 19**, **Vite 6**, and **Tailwind CSS v4** (with custom design values), utilizing **motion** for high-performance scroll reveals, carousels, and animations.

---

## 🎨 Design Theme & Core Aesthetic

- **Visual Palette**: Neutral tones featuring **Ivory / Cream** (#FCFBFA / #F7F4EE) for high-contrast background negative space, **Blush Pink** (#F5E6E3) for soft emotional highlights, and **Warm Gold** (#C5A880) accents paired with deep **Charcoal** (#2C2A29) instead of heavy solid black.
- **Typography Pairings**:
  - **Primary**: *Inter* (sans-serif) for high-readability metadata, forms, and secondary lists.
  - **Display (Headings)**: *Cormorant Garamond* (serif) for classic, magazine-style editorial displays.
  - **Light Script Accents**: *Great Vibes* (cursive script) representing signatures, storytelling hand-drawings, and romantic taglines.
- **Micro-Animations**: Staggered scroll-reveals (fade-and-slide up), auto-advancing carousels, instant image zoom triggers, and responsive mobile drawer transitions.

---

## 📁 Component Folder Structure

All code is split into modular components to ensure clean maintenance:

- **`/src/types.ts`**: Holds all TypeScript interface definitions for portfolio projects, team members, blog posts, testimonials, partner/press logos, and stats.
- **`/src/data.ts`**: The dedicated local database file containing structured JSON records for all content (stories, blogs, photos, quotes, team bios). **The client can easily edit copy and photo URLs here without editing visual React layouts.**
- **`/src/App.tsx`**: The master compose entry point orchestrating all page sections and managing the lightbox popup modal state controllers.
- **`/src/index.css`**: Configures custom Google Fonts imports and sets the custom Tailwind v4 `@theme` colors and variables.
- **`/src/components/`**:
  - `Header.tsx`: Sticky navigation bar with scroll-adaptive glass background and full-screen mobile menu.
  - `Hero.tsx`: Full-screen slide-show carousel with beautiful text transitions, controls, and floating social networks sidebar.
  - `FeaturedWork.tsx`: The primary 4-column highlight portfolio grid with mouse-hover info displays.
  - `ProjectModal.tsx`: Elegant, magazine-style detail dialog containing a dedicated storyteller narrative block and multiple grid images.
  - `IntroVideo.tsx`: Core philosophy intro with an interactive video play button that opens a YouTube cinematic wedding reel in a dark overlay lightbox.
  - `StatsCounter.tsx`: Panel of 4 stats counters that animate and count up dynamically from 0 once they scroll into view.
  - `MeetTheTeam.tsx`: Team member biographical grid where hovering over a card replaces their primary portrait with a candid, laughing action photo.
  - `PressLogoStrip.tsx`: Typography-driven banner representing elite publishers (Vogue, Harper's Bazaar, Brides) using custom tracking and fonts.
  - `PortfolioFilter.tsx`: Complete archive portfolio grid supporting real-time filter categories (Weddings, Engagements, Editorial, Events) with reflow layouts.
  - `ValueProps.tsx`: Interactive benefits row linking icons to core studio values.
  - `BlogPreview.tsx`: Previews for 3 custom articles. Clicking a card opens a full-screen reader.
  - `BlogModal.tsx`: Clean, typography-optimized blog post dialog containing drop-caps, quote pullouts, and read-time stats.
  - `Testimonials.tsx`: Kind reviews carousel with dots and circles for couple photos.
  - `CtaBanner.tsx`: Visual focal banner driving users down to the inquiry panel.
  - `SecondPortfolioFeature.tsx`: Asymmetrical secondary portfolio highlight highlighting extra shoots.
  - `ContactSection.tsx`: Complete, verified client inquiry form (Name, Email, Phone, Date, and message text) with custom validation alerts, submitting states, success confirmations, and an embedded Google map.
  - `InstagramFeed.tsx`: Static Instagram grid layout displaying likes and comments on hover.
  - `Footer.tsx`: Brand statement, site index, address listings, and a fully functional newsletter signup with active inputs and confirmations.

---

## ✏️ How to Swap in Real Client Copy & Images

To update this website for launch, you only need to modify one file &mdash; **`/src/data.ts`**:

1. **Portfolio Images & Projects**: Locate `portfolioProjects` in `/src/data.ts` and change titles, locations, cover images, descriptions, and gallery slide arrays.
2. **Team Member Bios & Photos**: Update `teamMembers` with your team names, official roles, primary clean portraits, and secondary candid action photos.
3. **Blog Posts**: Edit `blogPosts` with actual planning advice, photography timeline notes, and high-quality hero graphics.
4. **Testimonials**: Swap out couples' quotes and names in `testimonials`.
5. **Hero Graphics**: Change images and headlines in `HERO_SLIDES` to show your absolute best first-impression captures.

All image assets use high-resolution royalty-free photography and fit the elegant wedding editorial feel perfectly. When replacing them, upload your photos to your hosting server or CDN and copy the URLs directly into the JSON objects.
