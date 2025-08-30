# Carbon Time Machine (2025 ↔ 2070)

## Concept

Jump between **2025** and **2070** to see how different environmental choices shape the future. Visualize CO₂ levels, temperature rise, and eco-tech innovations that could change our world.

## Features

- **Year Switcher:** Toggle between 2025 and 2070.
- **Dynamic Visuals :** Show city/nature changes.
- **Eco-Tech Discoveries:** Highlight futuristic solutions (carbon towers, algae farms).
- **Data Visualization:** Charts for CO₂, temperature, and other metrics.
- **Policy Simulator :** Apply policies and view impact.
- **User Profiles :** Save and compare different outcomes.
- **Backend API:** Powered by Next.js and Prisma with PostgreSQL.

## Tech Stack

- **Next.js** – Fullstack React framework (frontend + API routes)
- **Tailwind CSS** – Rapid, responsive styling
- **shadcn/ui** – Prebuilt UI components
- **Chart.js / Recharts** – Data visualization
- **PostgreSQL** – Relational database
- **Prisma ORM** – Type-safe DB access
- **Deployment** – Vercel / Netlify / Heroku

## Getting Started

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```

````

3. **Set up PostgreSQL database**

   - Create a database and update your `.env` file:

     ```env
     DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
     ```

4. **Run Prisma migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Seed database with 2025 + 2070 data**

   ```bash
   npx prisma db seed
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

## Folder Structure

```
/app         # Next.js app (pages, components, API routes)
/prisma      # Prisma schema and migrations
/public      # Static assets (images, animations)
/styles      # Tailwind config
```

```
````
