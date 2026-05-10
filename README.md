# SignLingo

Web app for signing and learning: browse **Sign to Text** and **Text to Sign** flows, authentication, chatbot helper, and static assets under `public/` (ISL GIFs and letter imagery).

Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **React Router**, **Framer Motion**, **TensorFlow.js**, **React Webcam**, and **Firebase** (login).

## Requirements

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- npm

## Setup

Clone the repo, install dependencies, then start the dev server:

```bash
git clone https://github.com/snehit0320/SignLingo.git
cd SignLingo
npm install
npm run dev
```

Then open the URL Vite prints in the terminal (usually `http://localhost:5173`).

### Build

```bash
npm run build
npm run preview   # optional: preview production build locally
```

### Lint

```bash
npm run lint
```

## Firebase (login page)

`/login` uses Firebase Authentication. Replace the placeholders in [`src/pages/Login.tsx`](src/pages/Login.tsx) with your Firebase project config from the [Firebase console](https://console.firebase.google.com/), or refactor to environment variables (`VITE_*`) if you prefer not to edit source for each environment.

## Project layout

| Path | Role |
|------|------|
| `src/pages/` | `Home`, `SignToText`, `TextToSign`, `Login` |
| `src/components/` | `Navbar`, `Footer`, `Chatbot`, etc. |
| `public/ISL_Gifs/`, `public/letters/` | Sign language GIFs and letter images |

## Credits

Originally developed as a collaborator project (see upstream history); this fork is maintained at [github.com/snehit0320/SignLingo](https://github.com/snehit0320/SignLingo).
