# SADARAM RAHUL Portfolio

A JSON-driven React/Vite portfolio designed for a college student focused on becoming a BACKEND DEVELOPER.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Update content
Edit files in `src/data/`.

### Add a project
Edit `src/data/projects.json`:
```json
{
  "title": "Project title",
  "image": "/projects/project.png",
  "intro": "Short introduction",
  "description": "Full project description",
  "technologies": ["Java", "Spring Boot", "MySQL"],
  "github": "https://github.com/...",
  "live": "https://your-domain..."
}
```
Put the matching image in `public/projects/`. GitHub and live are optional; empty/null values hide their buttons.

### Update skills
Edit `src/data/skills.json`. Each item needs `name`, `category`, and optionally `level`.

### Update profile/socials
Edit `profile.json` and `socials.json`.

### Other sections
Add objects to `experience.json`, `education.json`, `certifications.json`, and `achievements.json`. Empty arrays automatically hide the Journey section.

## Deploy on Vercel
Push this folder to GitHub, import the repository in Vercel, and deploy. Vercel will rebuild whenever you push changes.

## Vercel note
This version pins Vite and React to stable versions and includes the Vite React plugin to avoid the Vite 8/Rolldown build issue encountered on Vercel.
