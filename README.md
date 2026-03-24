# Hassan Masood — Personal Portfolio Website

A futuristic, light-themed personal portfolio website for M. Hassan Masood — Sustainable Business Developer.

## Features

- 🎬 **Scroll-driven video** — Hero section with scrub-on-scroll video expansion
- 🌐 **Multi-page layout** — Home, About, Experience, Skills, Contact
- 💎 **Futuristic design** — Glass morphism, animated orbs, dot-grid backgrounds
- 📱 **Fully responsive** — Mobile-first design
- ✨ **Scroll reveal animations** — Elements animate into view as you scroll

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero with scroll-video, stats, snapshot |
| About | `about.html` | Profile photo, bio, education, reference |
| Experience | `experience.html` | Timeline of work history + achievements |
| Skills | `skills.html` | Skill categories, proficiency bars, tools |
| Contact | `contact.html` | Contact form + details |

## File Structure

```
hassan-portfolio/
├── index.html
├── about.html
├── experience.html
├── skills.html
├── contact.html
├── README.md
└── assets/
    ├── css/
    │   ├── style.css      # Shared styles
    │   └── index.css      # Hero/home styles
    ├── js/
    │   ├── main.js        # Shared scripts
    │   └── hero-scroll.js # Scroll video logic
    ├── img/
    │   └── profile.png
    └── video/
        └── hero.mp4
```

## Deploying on GitHub Pages

1. **Create a new repository** on GitHub (e.g. `hassan-portfolio`)

2. **Push all files:**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git remote add origin https://github.com/YOUR_USERNAME/hassan-portfolio.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repo → Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main` / `root`
   - Click **Save**

4. Your site will be live at:
   `https://YOUR_USERNAME.github.io/hassan-portfolio/`

## Customisation

- Update contact info in `contact.html` and `about.html`
- Replace `assets/video/hero.mp4` with your desired hero video
- Replace `assets/img/profile.png` with an updated photo
- Tweak colours in `assets/css/style.css` under `:root` CSS variables

## Tech Stack

- Pure HTML5, CSS3, JavaScript (no frameworks)
- Google Fonts: Orbitron + DM Sans
- Zero dependencies — works offline after first load
