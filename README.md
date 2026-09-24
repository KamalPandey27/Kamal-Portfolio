# Kamal — MERN Portfolio

React + Tailwind portfolio based on the supplied design.

## Frontend
- React 19 + Vite
- Tailwind CSS v4
- AOS animations
- Axios
- Lucide React

## Backend
- Express.js
- MongoDB + Mongoose
- Brevo HTTP API

## Backend scope

**Only the Contact form uses the backend.**

Projects, skills, experience and other portfolio data remain frontend-only in:

`client/src/data/portfolio.js`

There is no Project model, project route, project API or seed script.

## Dark mode

Tailwind v4 is configured as class-controlled:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

React controls `<html class="dark">` and saves the choice in localStorage.

Therefore the browser/OS dark preference will not automatically activate `dark:` classes.

## AOS animations

AOS is initialized with:
- duration: 800ms
- once: true
- offset: 70px
- easing: ease-out-cubic

Main sections use fade-up/fade-right and project/skill cards use entrance animations.

## Run frontend

```bash
cd client
npm install
npm run dev
```

`client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Run backend

```bash
cd server
npm install
npm run dev
```

`server/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_verified_sender@example.com
CONTACT_TO=your_email@gmail.com
```

Contact flow:

```text
React Contact Form
        ↓
Axios POST /api/contact
        ↓
Express
        ↓
MongoDB → save message
        ↓
Brevo → email notification
```

Replace `client/public/Kamal-Resume.pdf` with your actual resume.
