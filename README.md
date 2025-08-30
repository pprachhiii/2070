# Carbon Time Machine

## Concept

Carbon Time Machine lets users **input their daily lifestyle choices** (diet, transport, hobbies, energy use, etc.) and see how those decisions ripple into the **future (2070 and beyond)**.

Instead of jumping between preset years, users simulate their own path and discover:

- **Environmental impacts** (CO₂ levels, temperature rise, biodiversity)
- **Human impacts** (health, migration, food security)
- **Animal impacts** (extinction risk, habitat loss, population trends)

It’s a **personalized simulation** that makes the future feel real, based on today’s habits.

---

## Features

- **Lifestyle Input Form** – Choose diet, transport, hobbies, and energy habits.
- **Impact Simulation** – See projected outcomes on environment, humans, and animals.
- **Dynamic Visuals** – Compare optimistic vs. harmful futures.
- **Result Cards & Charts** – CO₂ ppm, °C rise, extinction risk, etc.
- **Save & Compare Runs** – Users can label simulations (e.g. “Vegan life”, “Car commute”).
- **Backend API** – Stores choices + results in PostgreSQL with Prisma.

---

## Tech Stack

- **Next.js** – Fullstack React framework (frontend + API routes)
- **Tailwind CSS** – Styling system
- **shadcn/ui** – UI components
- **Recharts** – Data visualization
- **PostgreSQL** – Database
- **Prisma ORM** – Type-safe database access
- **Deployment** – Vercel / Netlify / Heroku

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd carbon-time-machine
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**

   Create a database and update your `.env` file:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```

4. **Run Prisma migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

---

## Folder Structure

```
/app         # Next.js app (pages, components, API routes)
/prisma      # Prisma schema and migrations
/public      # Static assets (images, animations)
/styles      # Tailwind config
```

---

---
