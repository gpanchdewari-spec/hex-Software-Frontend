# HexSoftwares homepage — DigiCoders reference adaptation

The live DigiCoders homepage was successfully retrieved on 25 September 2026 after a longer timeout. This version replaces the previous temporary homepage preparation.

## What changed

- New homepage follows the reference section order, blue/white palette, full-width banners, three-column software/project cards, team carousel, about cards, service grid, counters, packages, insights, technology strip and contact layout.
- Blue announcement bar and moving contact/location strip appear ABOVE the existing navbar on the home route. The large three-image hero carousel appears BELOW the navbar, matching the reference arrangement.
- Navbar.jsx and Footer.jsx are unchanged. A route-scoped sticky wrapper positions the existing navbar below the new strips.
- The original welcome popup is suppressed on the homepage so it does not obscure the design. It remains on other non-admin pages.
- All three hero banners, six software cards, ten service cards and package links lead to /services. Project enquiries lead to /contact; portfolio CTAs lead to /portfolio.
- All homepage display content is local/static. No homepage service/project/testimonial collection requests are made.
- 100 original reference images were downloaded and bundled locally; ten original inline service SVGs were extracted. Local fonts are bundled too.
- Original image artwork was kept unchanged, including any DigiCoders branding already embedded in it.
- HexSoftwares contact details come from your original footer; existing hexSite stats are reused.
- Reference team names/photos, client logos and project screenshots retain source labels. They are NOT asserted to be HexSoftwares employees, clients or projects. Replace these records in homeContent.js with your own when ready.
- Pricing cards retain reference price figures with a reference-pricing label; they are not presented as confirmed HexSoftwares offers.
- Blog links open the original DigiCoders articles. Those links are editorial sources, not service navigation.
- The contact form validates inputs and prepares an email to info@hexsoftwares.com using the visitor's email app. Nothing is submitted to DigiCoders. No fake success message or CAPTCHA is used.
- Original third-party tracking/chat/review widgets and DigiCoders backend forms are not included. Your existing auth, navbar data fetching, footer and other routes retain their original behavior.

## Changed / added files

Modified:
- src/App.jsx
- src/pages/Home.jsx

Added/updated:
- src/components/home/HomeTopBars.jsx
- src/components/home/HeroSlider.jsx
- src/components/home/ShowcaseSections.jsx
- src/components/home/BusinessSections.jsx
- src/components/home/ContactSection.jsx
- src/components/home/homeContent.js
- src/components/home/home-shell.css
- src/components/home/fonts.css
- public/images/home/
- public/fonts/home/
- REFERENCE-ASSETS.json (source image credits)

No new npm dependencies were required. Styling uses your existing Tailwind installation and scoped CSS for carousels/fonts.

## Run on Windows

Extract the ZIP. Open a terminal INSIDE the extracted frontend folder (where package.json is):

    npm install
    npm run dev

For production:

    npm run build

Keep your existing .env. The ZIP excludes node_modules, dist and private .env files. If replacing an existing frontend, back it up first and copy the changed source/assets listed above. Do not overwrite your configured .env.

## Validation

- Vite production build passed.
- React server rendering passed.
- All rendered image paths resolved to bundled local files.
- Six software cards and ten service cards were checked to target /services.
- No nested links were found in the rendered homepage.
- Navbar/Footer files match the uploaded originals byte-for-byte.
- Desktop/mobile layouts are implemented with responsive CSS, but browser visual/interaction verification of the local build was unavailable because the cloud browser rejected local preview URLs. Exact pixel equality is not claimed.
