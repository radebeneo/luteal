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

Create a `.env` file (or configure via EAS) with:

```bash
EXPO_PUBLIC_BLOOMY_API_URL=https://your-backend.example.com/api/bloomy/chat
```

Bloomy chat calls this endpoint and shows a friendly fallback message if it's
missing or unreachable — no Gemini key ever lives in the client.

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
