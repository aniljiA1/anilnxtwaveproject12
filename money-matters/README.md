# 💰 Money Matters

A personal finance management app built with **React + Vite**. Track income and expenses, view charts, and manage your transactions.

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 16
- npm or yarn

### Installation

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd money-matters

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env and set your API base URL:
# VITE_API_BASE_URL=https://your-api-url.com

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── assets/               # Images, icons, illustrations
├── components/
│   ├── common/           # Button, Loader, Modal, EmptyView
│   ├── layout/           # Sidebar, Navbar, AppLayout
│   ├── dashboard/        # BalanceCards, TransactionList, OverviewChart
│   ├── transactions/     # TransactionTable, Row, Add/Edit/Delete Modals
│   └── profile/          # UserProfile, ProfileCard
├── context/              # AppContext (auth, sidebar state)
├── hooks/                # useFetch, useModal
├── pages/                # Dashboard, Transactions, Profile, Login, NotFound
├── routes/               # AppRoutes, ProtectedRoute
├── services/             # api.js, transactionApi.js, profileApi.js
├── styles/               # global.css, variables.css, responsive.css
└── utils/                # constants.js, helpers.js, formatCurrency.js, chartData.js
```

---

## ✨ Features

- 🔐 **Authentication** — Login with JWT, persisted via cookies
- 🛡️ **Protected Routes** — Redirect to login if unauthenticated
- 📊 **Dashboard** — Balance cards, last transactions, bar & pie charts
- 💳 **Transactions** — Full CRUD with search, filter by type, pagination
- 👤 **Profile** — User info and financial summary
- 📱 **Responsive** — Mobile-friendly with hamburger sidebar
- 🔔 **Toast Notifications** — Success/error feedback on all actions
- ⏳ **API State Handling** — Loading, Success, Failure states throughout

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| React Router v6 | Client-side routing |
| Recharts | Charts & data visualization |
| js-cookie | Cookie management |
| react-toastify | Toast notifications |
| react-loader-spinner | Loading indicators |
| react-icons | Icon library |

---

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Base URL for the backend API |

---

## 🏗 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

---

## 📋 API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/login/` | Authenticate user |
| GET | `/transactions/?user_id=` | Fetch all transactions |
| POST | `/transactions/` | Add a transaction |
| PUT | `/transactions/:id/` | Update a transaction |
| DELETE | `/transactions/:id/` | Delete a transaction |
| GET | `/user/?user_id=` | Fetch user profile |
