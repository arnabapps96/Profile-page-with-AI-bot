# 🚀 Premium AI-Powered Portfolio Template

A professional, minimalist, and high-impact portfolio template built with **Next.js 15**, **Tailwind CSS**, and **Google Gemini AI**. This template is designed for strategy leads, consultants, and tech-driven professionals who want to showcase their impact with data and a digital twin.

## ✨ Features

- **Digital Twin AI Chatbot**: A custom-grounded AI assistant powered by Gemini Flash that knows your career history.
- **Quantified Impact Cards**: Beautifully animated counters for highlighting your key achievements.
- **Spotify Integration**: Live playback status showing what you're listening to (or your last 5 unique tracks).
- **Personal Log**: Curated sections for travel history and reading interests.
- **Responsive Design**: Optimized for everything from ultra-wide monitors to mobile devices.
- **Modern Tech Stack**: Next.js 15 (App Router), React 19, and TypeScript.

---

## 🛠️ Getting Started

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd portfolio
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory and add your API keys:
```env
# AI Chatbot
GEMINI_API_KEY=your_gemini_api_key

# Spotify Integration
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```
Get your key from the [Google AI Studio](https://aistudio.google.com/).

### 3. Generate Spotify Token (One-time)
To display your Spotify playback, run the following script and follow the instructions:
```bash
node scripts/get_spotify_token.mjs
```
Add the outputted `SPOTIFY_REFRESH_TOKEN` to your `.env.local`.

### 4. Run Locally
```bash
npm run dev
```

---

## 🎨 Customization Guide

### Personal Data
All content is managed directly in `src/app/page.tsx`. Search for the `const data` object to update:
- Profile details (Name, Title, Bio)
- Professional Experience
- Quantified Impact stats
- Testimonials

### AI Personalization
To customize how the AI assistant represents you, update the `SYSTEM_PROMPT` in `src/app/api/chat/route.ts`. Provide your career narrative, personality traits, and specific project details.

### Images & CV
Replace the following files in the `public/` directory:
- `profile.jpeg`: Your professional headshot.
- `cv.pdf`: Your latest resume.

---

## 🚀 Deployment

The easiest way to deploy is using **Vercel**:

1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Add the `GEMINI_API_KEY` in the Vercel project settings under **Environment Variables**.
4. Deploy!

---

## 📄 License
MIT License. Feel free to use and modify for your personal portfolio.
