#  Getview Project

**Webová aplikácia na objavovanie výhľadov** — mapa plná krásnych miest (výhlady, rozhľadne, prírodné body), s možnosťou pridať nové piny, kategorizovať a filtrovať.

---

## 🆕 Funkcie (MVP)
- 🗺 Interaktívna mapa zobrazujúca piny z DB
- 📍 Zobrazenie aktuálnej polohy používateľa
- 🆕 Pridávanie výhľadov cez API (GET a POST)
-  Kategorie s farbami (napr. hory = zelená)
-  Responzívny dizajn s TailwindCSS + čistý vizuál

---

##  Tech Stack
- **Next.js (App Router)** – React, SSR, file-based routing
- **Drizzle ORM** + `pg` – pripojenie k Websupport Postgres bez SSL problémov
- **TypeScript**
- **Leaflet** (react-leaflet) – mapa OSM
- **Tailwind CSS** – utility-first styling
- **Projektová štruktúra:**
  ```
  ├── src/
  │   ├── app/
  │   ├── components/
  │   ├── hooks/
  │   ├── services/
  │   ├── types/
  │   └── db/
  ├── drizzle.config.ts
  ├── next.config.ts
  ├── package.json
  └── README.md
  ```

---

## 🚀 Rýchly štart

1. Klon repo:
   ```bash
   git clone https://github.com/MatuxTV/getview_project.git
   cd getview_project
   ```

2. Vytvor `.env`:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@YOUR_DB_HOST:5432/getviewproject?sslmode=require"
   ```

3. Nainštaluj závislosti:
   ```bash
   npm install
   ```

4. Spusti vývojový server:
   ```bash
   npm run dev
   ```
   → Otvor [http://localhost:3000](http://localhost:3000)

---

##  API Endpoints
- **GET `/api/places`**  
  Vráti JSON pole výhľadov z DB:
  ```json
  [
    {
      "id": 1,
      "title": "Výhľad Devín",
      "description": "Hrad a rieka Morava",
      "latitude": 48.173,
      "longitude": 16.978
    },
    ...
  ]
  ```

- **POST `/api/places`**  
  Pridá nový výhľad (request JSON telo):
  ```json
  { "title":"Výhľad Vysoké Tatry", "latitude":49.2, "longitude":20.1 }
  ```
  → Odpoveď: nový záznam so stavom 201.

---

##  Štruktúra priečinkov
```
src/
├── app/
│   ├── map/            ← stránka s mapou
│   └── api/places/
│       └── route.ts     ← GET / POST handleri
├── components/          ← UI komponenty (napr. MapView, LocateButton)
├── hooks/               ← custom React hooky (napr. useGeolocation)
├── services/            ← business logic (DB volania cez Drizzle)
├── types/               ← TypeScript typy (Place, Category)
└── db/
    ├── schema.ts        ← Drizzle schémy tabuliek
    └── client.ts        ← Drizzle + pg inicializácia
```

---

##  Pripravujeme neskôr (roadmap)
-  Clusterovanie pinov (pre lepší výkon pri stovkách miest)
-  Filtre podľa kategórií / vzdialenosti
-  AR navigácia (Expo + dev client)
-  Offline režim
-  Autentifikácia, hodnotenia, fotky výhľadov

---

##  Pridaj sa!
Ak máš radu, návrh alebo chceš prispieť do open-source - buduť vítaný. Ved moju emailovou z GitHub (MatuxTV) alebo cez Issues.

---

**Ďakujem za záujem o Getview!**
