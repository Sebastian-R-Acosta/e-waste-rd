# e-waste RD

> **Reciclaje Electrónico Responsable en República Dominicana**

A web platform that promotes the responsible recycling of electronic waste (e-waste) such as batteries, cell phones, computers, and other devices. It connects citizens with collection points and proper disposal information across the Dominican Republic, starting with the Universidad Nacional Pedro Henríquez Ureña (UNPHU).

## Features

- **Device Type Catalog** — 10 categories of recyclable e-waste with detailed info per type (materials, impact, process, fun facts)
- **Dynamic Detail Pages** — Individual pages for each device type (`/que-reciclamos/[tipo]`) with animated icons, material recovery charts, environmental impact metrics, and step-by-step recycling process
- **Collection Point Map** — Interactive map showing e-waste collection locations (powered by OpenStreetMap + Leaflet)
- **Authentication** — Full login/registration with JWT (jose) + bcrypt password hashing
- **Points & Level System** — Gamified recycling: earn points per drop-off, level up (Bronze/Silver/Gold), bonus multipliers for 5th/10th deliveries
- **Rewards Catalog** — Redeem points for discounts, donations, and certificates
- **Digital Certificates** — Generate verifiable impact certificates with SHA-256 hashes
- **User Profile** — Personal stats dashboard with level progress, CO₂ savings, activity history
- **Points Calculator** — Real-time points estimation when scheduling a drop-off
- **Educational** — Information on what e-waste is, why proper recycling matters, and device-specific recycling processes
- **Impact Stats** — Visual data on the environmental and social impact of e-waste
- **Dark Mode** — Palantir-inspired dark theme with smooth animations (next-themes)

## Tech Stack

| Layer          | Technology                                       |
| -------------- | ------------------------------------------------ |
| Framework      | [Next.js 16](https://nextjs.org/) (App Router)   |
| Language       | TypeScript                                       |
| Styling        | [Tailwind CSS v4](https://tailwindcss.com/)      |
| Animations     | [Framer Motion](https://www.framer.com/motion/)  |
| Map            | [Leaflet](https://leafletjs.com/) + OpenStreetMap |
| Icons          | [Lucide React](https://lucide.dev/)              |
| Database       | SQLite via [Prisma](https://prisma.io/) + libSQL |
| Auth           | JWT ([jose](https://github.com/panva/jose)) + bcryptjs |
| Dark Mode      | [next-themes](https://github.com/pacocoursey/next-themes) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/yourusername/e-waste-rd.git
cd e-waste-rd
npm install
npm run dev
```

The development server will start at [http://localhost:3000](http://localhost:3000).

### Database Setup

```bash
npx prisma db push
npx prisma db seed
```

## Project Structure

```
e-waste-rd/
├── prisma/
│   ├── schema.prisma      # Database schema (User, DropOff, Reward, etc.)
│   ├── seed.ts            # Seed rewards data
│   └── dev.db             # SQLite database
├── public/                # Static assets
├── src/
│   ├── app/
│   │   ├── globals.css    # Global styles + Tailwind config
│   │   ├── layout.tsx     # Root layout with ThemeProvider + AuthProvider
│   │   ├── page.tsx       # Landing page (Hero)
│   │   ├── api/           # API routes (auth, drop-offs, points, rewards, certificates, user)
│   │   ├── beneficios/    # Benefits page
│   │   ├── certificados/  # Digital certificates page
│   │   ├── mapa/          # Interactive map page
│   │   ├── perfil/        # User profile/dashboard page
│   │   ├── que-reciclamos/# Device catalog + [tipo]/ detail pages
│   │   ├── quienes-somos/ # About us page
│   │   ├── recompensas/   # Rewards catalog page
│   │   └── solicitar/     # Schedule a drop-off page
│   ├── components/
│   │   ├── Navbar.tsx       # Navigation bar with auth state
│   │   ├── Hero.tsx         # Full-screen hero with battery animation
│   │   ├── QueReciclamos.tsx # Device type catalog cards
│   │   ├── MapaSection.tsx  # Interactive map with UNPHU marker
│   │   ├── ParaQueSirve.tsx # Benefits and stats
│   │   ├── QuienesSomos.tsx # About us section
│   │   ├── AuthModal.tsx    # Login/Register modal
│   │   ├── AuthProvider.tsx # Auth context provider
│   │   ├── PointsBadge.tsx  # Navbar points display
│   │   ├── Footer.tsx       # Site footer
│   │   └── ThemeProvider.tsx # Next-themes wrapper
│   ├── lib/
│   │   ├── auth.ts          # JWT verification utilities
│   │   ├── device-types.ts  # 10 device types catalog data
│   │   ├── points.ts        # Points calculation engine
│   │   ├── prisma.ts        # Prisma client singleton
│   │   ├── types.ts         # TypeScript interfaces
│   │   └── utils.ts         # cn() utility
│   └── generated/prisma/    # Generated Prisma client
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Device Types

| #  | ID               | Icon       | Materials                          |
| -- | ---------------- | ---------- | ---------------------------------- |
| 04 | Baterías         | Battery    | Litio, Cobalto, Níquel, Grafito    |
| 12 | Celulares        | Smartphone | Oro, Plata, Cobre, Paladio         |
| 08 | Monitores        | Monitor    | Vidrio, Estaño, Plomo, Plástico    |
| 16 | Computadoras     | Cpu        | Aluminio, Cobre, Acero, Oro        |
| 24 | Cables           | Cable      | Cobre, Aluminio, PVC, Conectores   |
| 06 | Electrodomésticos| Tv         | Acero, Cobre, Plásticos, Vidrio    |
| 07 | Impresoras       | Printer    | ABS, Aluminio, Acero, Circuitos    |
| 09 | Tablets          | TabletIcon | Aluminio, Vidrio, Oro, Metales     |
| 05 | Televisores      | TvIcon     | Vidrio, Plásticos, Aluminio, Cobre |
| 03 | Consolas         | Gamepad2   | ABS, Cobre, Aluminio, Metales      |

## API Endpoints

| Endpoint                | Method | Auth | Description                    |
| ----------------------- | ------ | ---- | ------------------------------ |
| `/api/auth/register`    | POST   | No   | Create new user account        |
| `/api/auth/login`       | POST   | No   | Authenticate & get JWT token   |
| `/api/drop-offs`        | POST   | Yes  | Register a new drop-off        |
| `/api/drop-offs`        | GET    | Yes  | List user's drop-offs          |
| `/api/points/balance`   | GET    | Yes  | Get points, level & progress   |
| `/api/points/history`   | GET    | Yes  | Paginated transaction history  |
| `/api/rewards`          | GET    | No   | List active rewards            |
| `/api/rewards/redeem`   | POST   | Yes  | Redeem points for a reward     |
| `/api/rewards/seed`     | POST   | No   | Seed default rewards           |
| `/api/certificates`     | GET    | Yes  | List user's certificates       |
| `/api/certificates/generate` | POST | Yes | Generate impact certificate    |
| `/api/user/stats`       | GET    | Yes  | Get aggregate user stats       |

## Roadmap

### Phase 1 — MVP
- [x] Landing page with Palantir-inspired design
- [x] Battery/recycling animation
- [x] Interactive map with UNPHU collection point
- [x] Login/Register with JWT authentication
- [x] Device type catalog with 10 categories
- [x] Dynamic detail pages for each device type
- [x] Points and level system
- [x] Rewards catalog with redemption
- [x] Digital impact certificates
- [x] User profile dashboard
- [x] Drop-off scheduling with points calculator
- [x] Database with SQLite + Prisma

### Phase 2 — Expansion
- [ ] Multiple collection points across RD
- [ ] Educational resources section
- [ ] Email notifications

## Fixes & Changes

### 2026-06-04
- **Fix: Device card navigation** — Replaced `motion.div` wrapping `<a>` with direct `motion.a` component in `QueReciclamos.tsx`. This eliminates the wrapper div that was intercepting click events, giving the browser a native `<a>` element for proper navigation. Cards now use Framer Motion's `motion.a` which renders as an `<a>` tag with full animation support and native link behavior.
- **Fix: Background overlapping clicks** — Added `pointer-events-none` to absolute-positioned background grid and glow divs in `QueReciclamos.tsx` so they don't intercept click events on underlying content.

### Phase 3 — Corporate
- [ ] Recycling traceability system
- [ ] Partnership portal for recyclers
- [ ] Corporate certificates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Link: [https://github.com/yourusername/e-waste-rd](https://github.com/yourusername/e-waste-rd)

---

<p align="center">Hecho con ♻️ para un futuro más limpio en República Dominicana</p>
