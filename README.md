# Dongjun Jang — Portfolio

Personal portfolio website, hosted on GitHub Pages.

**Live**: https://dj-kor.github.io/AAB-DJJ/

## Pages

| Page | Description |
|---|---|
| `index.html` | About — introduction, contact links, skills |
| `timeline.html` | Education & career timeline |
| `projects.html` | Project showcase with tech stack |
| `guestbook.html` | Guestbook powered by giscus (GitHub Discussions) |
| `game.html` | Dodge mini-game with Firestore leaderboard |

## Editing content

All content lives in **`js/data.js`** — edit that one file to update the whole site:

- `personal` — name, tagline, introduction, contact links
- `skills` — skill categories shown on the About page
- `timeline[]` — career/education entries (newest first)
- `projects[]` — project cards (`sample: true` shows a SAMPLE badge; remove it once replaced with real projects)

Anything marked `(수정 필요)` is a placeholder waiting for real content.

## Local preview

No build step. Serve the folder with any static server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Stack

- Plain HTML / CSS / JS — no framework, no build
- Firebase Firestore — game leaderboard (see Security Rules in the Firebase console)
- giscus — guestbook comments via GitHub Discussions
- GitHub Pages — hosting

Mobile gets an app-style bottom tab bar; desktop gets a top nav. There is also a hidden easter egg — happy hunting. 🕹️
