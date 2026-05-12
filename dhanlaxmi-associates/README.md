# DHANLAXMI ASSOCIATES — Luxury Real Estate Website (React + Vite)

High-end luxury real estate website with:
- Dark luxury UI (ink + gold)
- Smooth animations (Framer Motion)
- Lead generation system (floating enquiry button + modal + sticky enquiry form)
- Form validation + mobile-friendly inputs
- Optional EmailJS integration (fallback to console logging)

## Tech stack
- React (Vite)
- React Router
- Tailwind CSS
- Framer Motion
- EmailJS (optional)

## Run locally

```bash
cd dhanlaxmi-associates
npm install
npm run dev
```

## Home hero video

Place your hero video at `public/hero.mp4` (MP4, muted-friendly). The home hero section will auto-play it with a slow premium zoom and soft overlay.

## Enquiry submissions

By default, form submissions are logged to the console (basic mode).

To enable EmailJS (best mode):
1. Create a `.env` file based on `.env.example`
2. Add your EmailJS keys
3. Restart the dev server

## Pages
- `/` Home
- `/ongoing-projects` Ongoing Projects
- `/completed-projects` Completed Projects (gallery layout)
- `/projects/:slug` Project Detail (sticky enquiry form)
- `/about` About Us
- `/contact` Contact (main enquiry form + map)

## Key components
- `src/components/EnquiryForm.jsx`
- `src/components/ModalForm.jsx`
- `src/components/FloatingButton.jsx`
