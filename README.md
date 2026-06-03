# e-waste RD

> **Reciclaje Electrónico Responsable en República Dominicana**

A web platform that promotes the responsible recycling of electronic waste (e-waste) such as batteries, cell phones, computers, and other devices. It connects citizens with collection points and proper disposal information across the Dominican Republic, starting with the Universidad Nacional Pedro Henríquez Ureña (UNPHU).

## Features

- **Collection Point Map** — Interactive map showing e-waste collection locations (powered by OpenStreetMap)
- **Educational** — Information on what e-waste is and why proper recycling matters
- **Impact Stats** — Visual data on the environmental and social impact of e-waste
- **Authentication** — Login and registration modal (UI only, ready for backend integration)
- **Dark Mode** — Palantir-inspired dark theme with smooth animations

## Tech Stack

| Layer          | Technology                                       |
| -------------- | ------------------------------------------------ |
| Framework      | [Next.js 16](https://nextjs.org/) (App Router)   |
| Language       | TypeScript                                       |
| Styling        | [Tailwind CSS v4](https://tailwindcss.com/)      |
| Animations     | [Framer Motion](https://www.framer.com/motion/)  |
| Map            | [Leaflet](https://leafletjs.com/) + OpenStreetMap |
| Icons          | [Lucide React](https://lucide.dev/)              |
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

## Project Structure

```
e-waste-rd/
├── public/                  # Static assets
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles + Tailwind config
│   │   ├── layout.tsx       # Root layout with ThemeProvider
│   │   └── page.tsx         # Landing page composition
│   ├── components/
│   │   ├── Navbar.tsx       # Navigation bar with theme toggle
│   │   ├── Hero.tsx         # Full-screen hero with battery animation
│   │   ├── QueReciclamos.tsx # What we recycle section
│   │   ├── MapaSection.tsx  # Interactive map with UNPHU marker
│   │   ├── ParaQueSirve.tsx # Benefits and stats
│   │   ├── AuthModal.tsx    # Login/Register modal
│   │   ├── Footer.tsx       # Site footer
│   │   └── ThemeProvider.tsx # Next-themes wrapper
│   └── lib/
│       └── utils.ts         # cn() utility
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Roadmap

### Phase 1 — MVP
- [x] Landing page with Palantir-inspired design
- [x] Battery/recycling animation
- [x] Interactive map with UNPHU collection point
- [x] Login/Register modal
- [ ] Backend API (Next.js API Routes)
- [ ] Database with PostgreSQL + Prisma

### Phase 2 — Expansion
- [ ] User registration and profiles
- [ ] Multiple collection points across RD
- [ ] Educational resources section

### Phase 3 — Corporate
- [ ] Recycling traceability system
- [ ] Digital certificates for organizations
- [ ] Partnership portal for recyclers

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
