# 🎂✨ Happy Birthday Navtej Koli! ✨🎂

A magical, interactive birthday website created with love for **Navtej Koli** by his brother. Features a cosmic universe theme with stars, floating hearts, glowing effects, and 15 beautifully designed sections.

![Birthday](https://img.shields.io/badge/Birthday-21%20October-ff69b4?style=for-the-badge)
![Made With](https://img.shields.io/badge/Made%20With-❤️%20Love-red?style=for-the-badge)

---

## 🌟 Features

| # | Section | Description |
|---|---------|-------------|
| 1 | Welcome Screen | Animated starfield with typewriter name reveal |
| 2 | Birthday Countdown | Live countdown to the birthday (auto-detects next occurrence) |
| 3 | Birthday Wish | Hero greeting with floating balloons and hearts |
| 4 | About Navtej | Personal info, photo placeholder, and nickname badges |
| 5 | Emotional Letter | Heartfelt Marathi-English letter on parchment-style card |
| 6 | Memory Timeline | Customizable timeline of shared memories |
| 7 | Photo Gallery | 8 photo placeholders with lightbox viewer |
| 8 | Nickname Showcase | Beautiful cards for all 7 legendary nicknames |
| 9 | Birthday Cake | Interactive CSS cake — blow out the candles! |
| 10 | Wish Upon a Star | Type wishes and send them to the stars |
| 11 | Memory Game | Fun emoji matching game with score tracking |
| 12 | Surprise Gift | Animated gift box reveal with confetti explosion |
| 13 | Brotherhood Quotes | Auto-rotating carousel of emotional quotes |
| 14 | Birthday Wall | Post wishes (saved in localStorage) |
| 15 | Footer | Final message, music controls, back-to-top |

### ✨ Special Effects
- 🌟 Canvas-based twinkling star particles
- 💖 Floating heart animations
- 🎊 Confetti explosions on interactions
- 🎵 Background music controls (no autoplay)
- 📱 Fully responsive (mobile, tablet, desktop)
- ♿ Accessible (keyboard nav, ARIA labels, reduced-motion support)

---

## 🚀 How to Run Locally

### Option 1: Just Open the File
Simply double-click `index.html` in your browser. Everything works without a server!

### Option 2: Local Server (recommended for full features)

**Using Python:**
```bash
# Python 3
cd Navtej-Birthday-Website
python -m http.server 8000
# Open http://localhost:8000
```

**Using Node.js:**
```bash
npx serve .
# Open the URL shown in the terminal
```

**Using VS Code:**
Install the "Live Server" extension, right-click `index.html`, and select "Open with Live Server".

---

## 📸 How to Add Your Photos

1. Put your photos in the `assets/photos/` folder (e.g., `photo1.jpg`, `photo2.jpg`, etc.)
2. Open `index.html`
3. Find each `<div class="gallery-item">` block (Section 7: Photo Gallery)
4. Replace the `<div class="gallery-placeholder">` with an `<img>` tag:

```html
<!-- BEFORE (placeholder) -->
<div class="gallery-item" data-caption="Best friends forever 💛">
    <div class="gallery-placeholder" style="--hue:260;">
        <i class="bi bi-camera"></i>
        <span>Photo 1</span>
    </div>
</div>

<!-- AFTER (real photo) -->
<div class="gallery-item" data-caption="Best friends forever 💛">
    <img src="assets/photos/photo1.jpg" alt="Best friends forever">
</div>
```

5. Update the `data-caption` attribute with your own captions.

---

## 🎵 How to Add Background Music

1. Place an MP3 file in `assets/music/` and name it `birthday.mp3`
2. The music button (🎵) in the bottom-right corner will play/pause it
3. Music does NOT autoplay — the user must click the button first

**Free birthday music sources:**
- [Pixabay Music](https://pixabay.com/music/search/birthday/) (royalty-free)
- [Free Music Archive](https://freemusicarchive.org/)

---

## ✏️ How to Customize

### Change the Birthday Message
- Open `index.html` and find `Section 5: EMOTIONAL LETTER`
- Edit the letter text inside `.letter-body`

### Update Memories
- Find `Section 6: MEMORY TIMELINE` in `index.html`
- Edit the `.timeline-text` content in each `.timeline-item`

### Change Nicknames
- Find `Section 8: NICKNAME SHOWCASE`
- Edit the `.nickname-desc` paragraphs

### Modify Birthday Date
- Open `js/script.js`
- Find `const birthYear = 2010;` and update the three birthday constants

---

## 🌐 How to Deploy on GitHub Pages (FREE!)

1. **Create a GitHub account** (if you don't have one): [github.com](https://github.com)

2. **Create a new repository:**
   - Go to [github.com/new](https://github.com/new)
   - Name it something like `navtej-birthday`
   - Make it **Public**
   - Click "Create repository"

3. **Upload your files:**
   ```bash
   git init
   git add .
   git commit -m "Happy Birthday Navtej! 🎂"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/navtej-birthday.git
   git push -u origin main
   ```
   Or use the GitHub website: click "uploading an existing file" and drag all files.

4. **Enable GitHub Pages:**
   - Go to your repository → **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Select `main` branch and `/ (root)` folder
   - Click **Save**

5. **Your website will be live at:**
   ```
   https://YOUR_USERNAME.github.io/navtej-birthday/
   ```

---

## 📁 Project Structure

```
Navtej-Birthday-Website/
├── index.html          # Main webpage (15 sections)
├── css/
│   └── style.css       # All styles, animations, responsive design
├── js/
│   └── script.js       # All interactivity and features
├── assets/
│   ├── photos/         # Put your photos here
│   └── music/          # Put birthday.mp3 here
└── README.md           # This file
```

---

## 💻 Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Grid, Flexbox, animations, backdrop-filter
- **Bootstrap 5.3** — Responsive utilities
- **JavaScript (Vanilla)** — No frameworks, no dependencies
- **Canvas API** — Star particles and confetti effects
- **Google Fonts** — Playfair Display, Poppins, Great Vibes

---

## ❤️ Credits

Made with all the love in the world by **Navtej's Brother**.

> "A brother is a friend given by nature."

Happy Birthday, Navtej! 🎂✨🎉
