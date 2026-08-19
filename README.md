# AeroX — Drone Marketing, Shop & CMS Platform

A production-grade web platform for **AeroX**, a consumer drone brand ("*Engineered for What's Next.*"). Built with **Next.js 16 (App Router)**, **React 19**, and **TypeScript**, it combines a public marketing + e‑commerce storefront with a full self-service **admin dashboard (CMS)** so non-technical staff can manage every piece of site content — hero banners, products, blog, gallery, testimonials, staff, roles, and more — without touching code.

---

## Overview

| | |
|---|---|
| **Type** | Full-stack frontend (Next.js) consuming a REST API |
| **Audience** | Public marketing/e‑commerce site + internal content-management dashboard |
| **Stack** | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Redux Toolkit (RTK Query) |
| **Rendering** | App Router with route groups for layout separation |

The codebase is organized into two clearly separated experiences under a single Next.js App Router instance:

- **`(withCommonLayout)`** — the public site: Home, Shop, About (story, sustainability, portfolio, careers, news, partners, offices/people), Blog, Contact, Features, Privacy Policy, Terms & Conditions, Refund Policy.
- **`(dashboardLayout)`** — the internal CMS: authenticated staff tooling for managing every content type on the public site (hero sections, products & categories, orders & payments, blog & categories, gallery, video gallery & categories, testimonials, client video reviews, events, experiences, portfolio, innovation concepts, FAQs/Q&A, employees, roles & permissions, and account settings).

Authentication (`/login`, `/signup`, `/otp`) lives outside both layouts. This route-group pattern keeps public, authenticated, and CMS experiences on independent layouts, navigation, and data-fetching strategies while sharing the same build and deployment pipeline.

---

## Tech Stack

**Core**
- [Next.js 16](https://nextjs.org/) — App Router, file-based routing, image optimization, server/client component split
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/) — strict typing across pages, components, hooks, and API layer

**State & Data**
- [Redux Toolkit](https://redux-toolkit.js.org/) (RTK Query) + `react-redux` — global state and API caching, with one API slice per resource under `src/redux/api/` (products, cart, wishlist, orders, payments, blog, gallery, testimonials, roles, etc.)
- `redux-persist` — persisted client state (e.g. auth session)
- [Axios](https://axios-http.com/) — typed HTTP client (`src/helpers/axiosInstance.ts`) with an RTK Query `axiosBaseQuery` adapter
- `js-cookie` / `cookies-next` — cookie-based session handling
- `jwt-decode` — client-side token inspection, used by the auth middleware

**UI & Forms**
- [Tailwind CSS 4](https://tailwindcss.com/) — utility-first styling
- [Framer Motion](https://www.framer.com/motion/) — page/section animation
- [react-hook-form](https://react-hook-form.com/) — form state and validation
- [react-datepicker](https://reactdatepicker.com/), `react-paginate`, `lucide-react`, `react-icons`
- `sweetalert2`, `react-toastify` — user feedback / alerts
- `recharts` — dashboard analytics and charts
- `html2canvas` + `jspdf` — client-side document/PDF export
- `socket.io-client` — real-time support chat (dashboard "Support Chat" + `useChatSocket` hook)

**Tooling**
- ESLint 9 (flat config) with `eslint-config-next`
- `date-fns` for date formatting/manipulation

---

## Project Structure

```
src/
├── app/
│   ├── (withCommonLayout)/     # Public site: home, shop, about, blog, contact, legal pages
│   ├── (dashboardLayout)/
│   │   └── dashboard/          # Admin CMS: content management for every public section
│   ├── login/ signup/ otp/     # Authentication flows (outside both layouts)
│   ├── layout.tsx              # Root layout, fonts, SEO metadata
│   └── proxy.ts → src/proxy.ts # Auth/route-protection middleware
├── components/
│   ├── Common/                 # Shared form controls, modals, auth UI, rich-text editor
│   ├── Shared/                 # Navbar, Footer, PageHero, Logo, mobile nav/menu, chat widget
│   └── Ui/
│       ├── HomePage/           # Hero, destinations, featured products, sustainability, FAQ, etc.
│       ├── AboutPage/ ContactPage/ YachtsPage/ YachtDetail/ PrivacyPolicy/
│       └── Dashboard/          # CMS modules, one per content type (mirrors app/dashboard routes)
├── redux/
│   ├── api/                    # RTK Query API slices (one per resource)
│   ├── features/auth/          # Auth state slice
│   ├── store.ts / rootReducer.ts / hooks.ts
├── services/                   # Axios-based API service functions (e.g. token refresh)
├── hooks/                      # Custom React hooks (debounce, infinite scroll, chat socket, token verify)
├── helpers/ lib/ utils/        # Axios instance, providers, icon sets, PDF export, pagination, slugify
├── constants/                  # Centralized data (e.g. curated stock imagery)
└── types/                      # Shared TypeScript types (products, orders, blog, gallery, roles, etc.)
```

Each CMS module under `dashboard/` follows a consistent **add / all / edit** pattern (e.g. `hero/add-hero`, `hero/all-hero`, `hero/edit-hero/[id]`), giving content editors a predictable CRUD workflow across every content type.

> **Note:** parts of the codebase (some component/folder names such as `Yachts`, `FeaturedYachtsSection`) were carried over from an earlier template and are being renamed to match the AeroX domain incrementally — functionality is unaffected.

---

## Key Features

- **Public marketing & storefront** — product showcase (AeroX Max Pro and related gear), shop/browse, cart, wishlist, checkout/orders, sustainability messaging, testimonials, and a contact/inquiry flow.
- **Full CMS/admin dashboard** — role-based staff access to manage hero content, products & categories, orders & payments, blog (posts, details, categories), gallery and video gallery, testimonials & client video reviews, events, experiences, portfolio, innovation concepts, FAQs (Q&A), employees, and roles/permissions — no code changes required to update the live site.
- **Authentication** — email/OTP-based signup and login, JWT session handling (access + refresh token), route-level protection via middleware (`src/proxy.ts`) that gates `/dashboard` on staff/super-admin claims.
- **Role & permission management** — configurable staff roles with a live permission matrix, enforced client-side (sidebar filtering) and server-side.
- **Real-time support chat** — Socket.IO-powered chat widget on the public site with a corresponding CMS inbox.
- **Document generation** — client-side PDF export via `html2canvas` + `jspdf`.
- **Optimized media delivery** — Next.js `Image` component with remote patterns configured for Cloudinary, Unsplash, and YouTube thumbnails.
- **SEO-ready** — centralized metadata (Open Graph, Twitter cards, canonical URL, robots) in `src/app/layout.tsx`.

---

## Getting Started

### Prerequisites
- Node.js 18.18+ (recommended: latest LTS)
- npm (project is committed with `package-lock.json`)
- A running instance of the backend API

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_API_URL=https://your-api-host/api
```

### Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public site, and `/dashboard` for the CMS (requires staff/super-admin authentication).

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## Deployment

The app builds as a standard Next.js application and deploys cleanly to [Vercel](https://vercel.com/) or any Node-compatible host. Ensure `NEXT_PUBLIC_API_URL` and any additional remote image hostnames (see `next.config.ts` → `images.remotePatterns`) are configured per environment. Before going live, replace the placeholder domain (`aerox-drones.com`) in `src/app/layout.tsx` metadata with the real production domain.

---

## Author

Built and maintained by **Zamirul Kabir** — frontend engineer specializing in Next.js/React platforms with integrated CMS tooling for non-technical stakeholders.
