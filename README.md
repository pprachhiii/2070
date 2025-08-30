# Carbon Time Machine

## Concept

Travel through a virtual timeline (2025–2070) and explore how different environmental decisions shape the world. See the impact of policy choices on cityscapes, nature, and climate data.

## Features

- **Interactive Timeline:** Slider to move between years 2025–2070.
- **Dynamic Visuals:** Cityscape and nature visuals update based on selected policies.
- **Animated Effects:** Floods, smog, forest regrowth, and more.
- **Eco-Tech Innovations:** Click/hover to discover futuristic solutions (carbon capture towers, algae farms, air purifiers).
- **Data Visualization:** Charts for CO₂ levels, temperature changes, and other metrics.
- **Policy Simulator:** Choose policies and see their simulated impact over time.
- **User Profiles:** Save and compare different timelines and decisions.
- **Backend API:** Fast, scalable API for data and user management.
- **Database:** Store user profiles, policy choices, and simulation results.

## Tech Stack

- **Next.js:** Fullstack React framework for UI and API routes.
- **Tailwind CSS:** Utility-first CSS for rapid, responsive design.
- **shadcn/ui:** Prebuilt React components for modern interfaces.
- **Express.js (optional):** For custom backend logic if needed.
- **Chart.js or Recharts:** Data visualization.
- **Canvas API or Lottie:** Animations and effects.
- **PostgreSQL:** Relational database for persistent storage.
- **Prisma ORM:** Type-safe database access and migrations.
- **Deployment:** Vercel, Netlify, or Heroku.

## Getting Started

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up PostgreSQL database**
   - Create a database and update your `.env` file with the connection string.
4. **Run Prisma migrations**
   ```bash
   npx prisma migrate dev
   ```
5. **Start the development server**
   ```bash
   npm run dev
   ```

## Folder Structure

```
/app         # Next.js app directory (pages, components, API routes)
/prisma      # Prisma schema and migrations
/public      # Static assets (images, animations)
/styles      # Tailwind CSS config
```

## Environment Variables

Create a `.env` file:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

---
