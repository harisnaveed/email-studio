# 📧 Email Studio

> A powerful, drag-and-drop email template builder that exports clean, cross-client compatible HTML — no Bootstrap, no Tailwind, just pure semantic HTML and inline CSS.

![Email Studio](https://img.shields.io/badge/Email%20Studio-v1.0.0-6C63FF?style=for-the-badge&logo=gmail&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)

---

## ✨ Overview

**Email Studio** is a browser-based email template builder that lets you visually compose beautiful, professional email templates using a drag-and-drop interface. When you're done, export a single, self-contained `.html` file that works across all major email clients — Gmail, Outlook, Apple Mail, Yahoo, and more.

The exported HTML uses **table-based layouts with fully inlined CSS** — the industry standard for email compatibility — meaning no external stylesheets, no frameworks, and no broken rendering across clients.

---

## 🎯 Key Features

### 🧱 Drag & Drop Block System
- Drag elements from the **Block Palette** onto the **canvas**
- Reorder blocks by dragging them up or down
- Duplicate or delete any block with one click
- Every block is independently customizable

### 🎨 Rich Design Customization
- **Glass UI** mode for the builder dashboard (glassmorphism aesthetic)
- **Neumorphism** style toggle for cards and UI elements
- Full color picker for backgrounds, text, borders, and buttons
- Font family, size, weight, and line-height controls
- Custom padding and spacing per block

### 📦 Available Email Blocks

| Block | Description |
|---|---|
| **Heading** | H1–H6 headings with full typography control |
| **Text / Paragraph** | Rich body text with alignment and spacing |
| **Image** | Responsive images with alt text, width, and link wrapping |
| **Button** | CTA buttons with custom colors, border radius, and URL |
| **Divider** | Horizontal rule / separator with style options |
| **Spacer** | Blank vertical spacing block |
| **Two Columns** | Side-by-side layout (text + image, or text + text) |
| **Hero Section** | Full-width banner with background, heading, and CTA button |
| **Quote / Testimonial** | Styled blockquote with border accent |
| **Card** | Boxed content with shadow, border, and background |
| **List** | Ordered or unordered list with spacing control |
| **Social Bar** | Row of social media icon links (Facebook, Twitter, Instagram, LinkedIn, YouTube) |
| **Video Block** | Thumbnail image linked to a video URL (email-safe) |
| **Sender Signature** | Name, title, company, and email signature block |
| **Table** | Data table with header row, borders, and alternating row colors |
| **Notification / Alert** | Popup-style inline alert cards (info, success, warning, error) |
| **Raw HTML** | Paste in any custom HTML snippet |

### 🔍 Preview Modes
- **Desktop preview** — 600px width (standard email width)
- **Mobile preview** — 375px width (responsive check)
- **HTML Code view** — see the raw generated HTML output

### 💾 Export
- Downloads a complete, standalone `.html` file
- Table-based layout for maximum email client compatibility
- Fully inlined CSS — no `<style>` blocks, no class dependencies
- Compatible with: Gmail, Outlook 2007–2021, Apple Mail, Yahoo Mail, Thunderbird

### 📋 Preset Templates
- **Welcome Email** — Onboarding template with hero, features, CTA, and footer
- **Newsletter** — Multi-section layout with articles, images, and social bar
- **Blank** — Start from scratch

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vite.dev/) |
| **Styling (Builder UI)** | Vanilla CSS (App.css) with CSS variables, glassmorphism, and neumorphism |
| **Exported Email HTML** | Pure semantic HTML + fully inlined CSS (zero dependencies) |
| **Icons** | [Lucide React](https://lucide.dev/) for builder UI icons |
| **Drag & Drop** | Native HTML5 Drag & Drop API |
| **State Management** | React `useState` / `useRef` (no external library) |

---

## 📁 Project Structure

```
email-studio/
├── public/
├── src/
│   ├── components/
│   │   ├── BlockPalette.jsx     # Left sidebar — draggable block items
│   │   ├── BlockWrapper.jsx     # Canvas renderer for each block type
│   │   ├── DevicePreview.jsx    # Desktop / Mobile / HTML preview modal
│   │   └── Inspector.jsx        # Right sidebar — block property editor
│   ├── utils/
│   │   ├── emailGenerator.js    # Compiles block JSON → export-ready HTML
│   │   └── presets.js           # Built-in template presets (Welcome, Newsletter)
│   ├── App.jsx                  # Main app: state, drag logic, layout
│   ├── App.css                  # Builder UI styles (glassmorphism, neumorphism)
│   ├── index.css                # Global CSS reset and font import
│   └── main.jsx                 # React entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ installed
- npm v9+ (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/harisnaveed/email-studio.git

# 2. Navigate to the project folder
cd email-studio

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
```

The production files will be output to the `dist/` folder.

---

## 📖 How to Use

1. **Choose a preset** from the top toolbar (Welcome Email, Newsletter, or Blank)
2. **Drag blocks** from the left palette onto the canvas in the center
3. **Click any block** on the canvas to select it and edit its properties in the right **Inspector** panel
4. **Reorder blocks** by dragging them within the canvas
5. **Preview** your template using the Desktop / Mobile / HTML buttons in the toolbar
6. **Download** your finished template as a `.html` file

---

## 🎨 UI Modes

Email Studio's builder interface supports two premium visual styles:

| Mode | Description |
|---|---|
| **Glass UI** | Frosted-glass panels with blur, transparency, and subtle borders |
| **Neumorphism** | Soft, extruded shadows giving a physical button-press feel |

Toggle these from the **Settings** icon in the top toolbar. These affect only the **builder UI** — the exported email HTML is always clean and client-safe.

---

## 📧 Why Table-Based HTML for Emails?

Email clients have notoriously poor CSS support. Unlike browsers, clients like Outlook use the Microsoft Word rendering engine, which strips `<style>` blocks, ignores flexbox/grid, and breaks `<div>`-based layouts.

Email Studio exports emails using:
- **`<table>` layouts** for reliable column and row structure
- **Inline `style=""` attributes** on every element so nothing gets stripped
- **Absolute pixel widths** (600px max) for consistent rendering
- **MSO conditional comments** where needed for Outlook

This ensures your email looks the same whether it's opened in Gmail on Android or Outlook 2013 on Windows.

---

## 🤝 Contributing

Pull requests are welcome! If you find a bug or want to add a new block type, please open an issue first to discuss the proposed change.

```bash
# Lint check
npm run lint

# Preview production build locally
npm run preview
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ using React + Vite &nbsp;|&nbsp; <strong>Email Studio</strong>
</p>
