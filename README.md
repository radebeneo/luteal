# Luteal Shield 🌙

**Luteal Shield** is a companion app for people navigating PMDD (premenstrual
dysphoric disorder). It helps you understand your cycle, plan for the hard
days before they arrive, and reach for support — including **Bloomy**, an AI
chat companion — the moment you need it.

## ✨ Features

- **Onboarding**: a short first-run flow that learns your name, birthday,
  weight/height, average period length, cycle length, and last period start
  date so your calendar is personalized from day one.
- **Cycle Dashboard (Home)**: a phase ring showing where you are in your
  cycle, plus a daily check-in banner with symptom/mood insights.
- **Support Plan**: a saveable plan of coping actions and a tether contact
  for the days you need backup.
- **Affirmations Pocket**: a small collection of affirmations you can save,
  reorder, and revisit.
- **Bloomy — AI Chat Companion**: a floating chat launcher that opens a
  conversation with Bloomy, backed by a server endpoint that forwards to
  Gemini.
- **Support Resources**: a searchable, filterable library of articles about
  PMDD symptoms and coping strategies.
- **Settings**: review your onboarding answers, manage your tether contact,
  notification preferences, and reset your data.

## 🚀 Tech Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) + `zustand/middleware` `persist`
- **Persistence**: [`@react-native-async-storage/async-storage`](https://react-native-async-storage.github.io/async-storage/)
- **Chat backend**: a server endpoint (URL supplied via env var) that forwards to Gemini — no key is stored in the app
- **Error Tracking**: [Sentry](https://sentry.io/)

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [npm](https://www.npmjs.com/)
- [Expo Go](https://expo.dev/go) app on your mobile device (or an emulator/simulator)

### Installation

```bash
git clone https://github.com/your-username/luteal-shield.git
cd luteal-shield
npm install
```

### Environment variables

Add the app URL to the root `.env` file. Use `localhost` for web/iOS Simulator,
`10.0.2.2` for the Android emulator, or your computer's LAN IP for a physical
phone on the same Wi-Fi network:

```bash
EXPO_PUBLIC_BLOOMY_API_URL=http://localhost:3001/api/bloomy/chat
```

Set up the local Gemini backend in `server/.env`:

```powershell
Copy-Item server/.env.example server/.env
```

Replace the placeholder key in `server/.env` with a key from
[Google AI Studio](https://aistudio.google.com/app/apikey).
Keep it in `server/.env`; never put it in the app's root `.env` or an
`EXPO_PUBLIC_` variable. Start the backend in one terminal:

```bash
npm run server
```

Then start Expo in another terminal. Restart Expo after changing the root
`.env`. The backend listens on port `3001` and accepts chat requests at
`/api/bloomy/chat`.

Bloomy chat shows a friendly fallback message if the URL is missing or the
backend is unreachable.

Each request includes `message` (the new user message) and `history` (earlier
turns as `{ "role": "user" | "assistant", "text": "..." }`). The endpoint
should use that history to keep replies aware of the conversation and return a
JSON object with a string `reply` field.

### Running the App

```bash
npx expo start
```

- Open **Expo Go** and scan the QR code.
- Press `a` for Android emulator, `i` for iOS simulator, `w` for web.

## 📁 Project Structure

```text
├── app/
│   ├── onboarding/     # First-run onboarding wizard
│   ├── (tabs)/         # Home, Resources, Pocket, Settings
│   ├── bloomy.tsx      # Bloomy chat modal
│   └── _layout.tsx     # Root layout + onboarding gate
├── components/         # Reusable UI components
├── constants/          # App constants (images, phase/nav data)
├── lib/                # PMDD content: symptoms, resources, affirmations
├── store/              # Zustand stores (persisted with AsyncStorage)
├── assets/             # Static assets (images, fonts)
└── tailwind.config.js  # Tailwind CSS configuration
```

## 📝 License

This project is [MIT](./LICENSE) licensed.

---

Built with care, for anyone who needs a shield during the luteal phase.
