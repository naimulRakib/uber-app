📂 Project Structure
scholar-grid/
├── app/                          # ⚡ Core Application Logic (Next.js App Router)
│   ├── admin/                    # Admin Control Center
│   │   └── safety/               # 🚨 Safety HQ (Live Panic Feed & Map)
│   │       ├── page.tsx
│   │       └── SafetyMap.tsx     # Dynamic Leaflet Map
│   │
│   ├── auth/                     # 🔐 Authentication Routes
│   │   ├── callback/             # Supabase Auth Handlers
│   │   └── login/                # Login Page
│   │
│   ├── component/                # 🧩 Reusable UI Components
│   │   ├── chat/                 # Real-time Communication
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── Inbox.tsx
│   │   │   └── AppointmentScheduler.tsx
│   │   │
│   │   ├── dashboard/            # Dashboard Widgets
│   │   │   ├── ConnectionManager.tsx
│   │   │   └── StatsCard.tsx
│   │   │
│   │   ├── safety/               # Safety Tools
│   │   │   └── PanicButton.tsx
│   │   │
│   │   └── VarsityVerifications.tsx # Email / Varsity Verification Logic
│   │
│   ├── dashboard/                # 🎓 Main User Dashboard (Student & Tutor)
│   │   └── page.tsx              # Master Controller Page
│   │
│   ├── gps/                      # 📍 Hyper-Local Radar
│   │   └── page.tsx              # PostGIS Map Interface
│   │
│   ├── studentprofile/           # 👤 Student Profiles (Restricted Access)
│   │   └── [id]/page.tsx         # Ghost ID & Privacy Logic
│   │
│   ├── tutorprofile/             # 👨‍🏫 Tutor Profiles (Public)
│   │   └── [id]/page.tsx
│   │
│   ├── layout.tsx                # Root Layout (Global Fonts & CSS)
│   └── page.tsx                  # Landing Page
│
├── public/                       # 🖼️ Static Assets
│   ├── images/                   # Banners & Screenshots
│   └── leaflet/                  # Map Markers & Icons
│
├── utils/                        # 🛠️ Utility Functions
│   └── supabase/
│       ├── client.ts             # Client-side Supabase Instance
│       └── server.ts             # Server-side Supabase Instance
│
├── .env.local                    # 🔑 Environment Variables
├── next.config.js                # Next.js Configuration
├── package.json                  # Dependencies & Scripts
└── README.md                     # Project Documentation
