# ~/charao.dev

Personal site of **Thiago Charão** — Director of Architecture, building platforms that let engineers ship.

**Live:** [charao.dev](https://charao.dev)

---

## Stack

- **Framework:** [Astro](https://astro.build) (static site generation)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions

## Features

- ⚡ Fast, minimal, zero-JS by default
- 🌙 Dark/Light mode toggle
- 📱 Mobile-first responsive design
- 🖥️ Terminal-inspired navbar aesthetic
- 📄 Visual CV with timeline
- 🔗 Links to DOIS.one, LinkedIn, GitHub

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

Pushes to `main` trigger automatic deployment to GitHub Pages via GitHub Actions.

---

## Structure

```
src/
├── components/     # Reusable UI components
├── layouts/        # Page layouts
├── pages/          # Routes (/, /cv)
└── styles/         # Global CSS
public/
├── images/         # Static images
└── cv/             # Downloadable CV
```

---

*Receipts over rhetoric. Show me what ships.*