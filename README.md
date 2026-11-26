# That's My Paw — Beginner Customization Guide

Welcome! This project is built with **100% plain HTML, CSS, and vanilla JavaScript** (no React, Vue, Tailwind, Node, or build tools required).

---

## 1. How to Open the Website
1. Unzip `that-s-my-paw.zip`.
2. Open the `that-s-my-paw` folder.
3. **Double-click `index.html`** — it will open directly in Chrome, Safari, Edge, or Firefox with zero setup.

---

## 2. How to Change the Banner, Logo & Thumbnails
Replace any image file in `images/` while keeping the **exact same file name**:
- **Top Hero Banner:** `images/banner/hero-banner.jpg` (or update `--hero-banner` at the top of `css/style.css`).
- **Brand Logo:** `images/logo.svg`
- **Pet Care Thumbnails:** `images/thumbnails/guide-cat-fountain.jpg`, `guide-dog-nutrition.jpg`, `guide-pet-grooming.jpg`
- **Product Images:** Put new photos inside `images/products/` and reference them in `js/products.js`.

---

## 3. How to Add a New Product (and Paste Your Affiliate Links)
1. Open `js/products.js` in any text editor (VS Code, Notepad++, or TextEdit).
2. Copy one product `{ ... }` block.
3. Paste it into the `window.PRODUCTS = [ ... ]` list (make sure there is a comma `,` between blocks).
4. Change:
   - `title`: Product name
   - `image`: Path like `"images/products/your-photo.jpg"`
   - `rating`: Number like `4.8`
   - `reviews`: Review count like `1240`
   - `badge`: `"Top Pick"` (or `""` for no badge)
   - `category`: `"dogs"` or `"cats"`
   - `subcategory`: Matches dropdown filters (e.g. `"toys"`, `"grooming"`, `"beds-furniture"`, `"food-treats"`, `"fountains-bowls"`, `"collars-leashes"`, `"cat-trees"`, `"travel-carriers"`)
   - `link`: **Paste your full Amazon affiliate URL here** instead of `"#"`!

> **Important Amazon Rule:** Never add product prices, discounts, or crossed-out old prices to cards.

---

## How to add product details (dropdown)
Every product in `js/products.js` can include an optional `details` object to show the **"View Details ▾"** dropdown below the Amazon button:

```js
details: {
  about: "Short description of what the product is.",
  bestFor: "Who or which pet it suits best.",
  howToUse: ["Step 1", "Step 2", "Step 3"],
  pros: ["Strength 1", "Strength 2"],
  cons: ["Limitation 1", "Limitation 2"]
}
```

If you leave out `details` on a product, the **"View Details ▾"** button stays hidden automatically.

---

## 4. How to Change Colors, Fonts & Rounded Corners
1. Open `css/style.css`.
2. Look at the `:root { ... }` section at the very top (lines 11–39):
   - Change `--color-primary: #1F4FE0;` for the main blue.
   - Change `--color-yellow: #FFD21F;` for the yellow CTA buttons.
   - Change `--color-bg: #F2F5FC;` for the page background.
   - Change `--radius-md` / `--radius-lg` for card roundness.

---

## 5. How to Change Menu Items
1. Each `.html` page has a `<nav id="main-nav">` block near the top marked `<!-- CHANGE MENU ITEMS HERE -->`.
2. Update the link text or `href="..."` across all `.html` files so every page shares the exact same menu.

---

## 6. How to Connect Subscribe & Contact Forms (Optional)
- **Newsletter (`index.html`):** Sign up for free at [Formspree](https://formspree.io) or Mailchimp, then update `#subscribe-form` in `index.html` and `js/script.js` (look for the `CONNECT MAILCHIMP OR FORMSPREE HERE LATER` comment).
- **Contact Page (`contact.html`):** Add `action="https://formspree.io/f/YOUR_FORM_ID" method="POST"` to `#contact-form` and update `initContactForm()` in `js/script.js`.

---

## 7. How to Add Multiple Images (Slider) to a Product
Add an optional `media` array inside any product in `js/products.js`. When there are 2 or more items, left/right arrows (`‹ ›`), bottom dots, and touch swipe appear automatically.

```js
media: [
  { type: "image", src: "images/products/dog-bed.jpg" },
  { type: "image", src: "images/products/dog-harness.jpg" }
]
```

If you only have 1 image (or omit `media`), no arrows or dots are shown.

---

## 8. How to Add a Video Using a Link
Inside the same `media` array, you can add a **YouTube link** (recommended because it keeps your page fast) or an **MP4 video** (if using a local MP4 inside `videos/`, keep file sizes small—under 3 MB):

```js
media: [
  { type: "image", src: "images/products/cat-fountain.jpg" },
  { type: "youtube", url: "https://www.youtube.com/watch?v=VIDEO_ID" },
  { type: "video", src: "videos/demo.mp4", poster: "images/products/cat-fountain.jpg" }
]
```

YouTube slides also accept `youtu.be/VIDEO_ID`, `/shorts/VIDEO_ID`, or `{ type: "youtube", id: "VIDEO_ID" }`. Videos only load when the visitor clicks the play (`▶`) button.

---

## 9. How to Add a Product (Full Copy-Paste Template)
Copy this complete template and paste it inside `window.PRODUCTS = [ ... ]` in `js/products.js`:

```js
{
  id: "unique-product-id",
  title: "Product Title Here",
  image: "images/products/your-photo.jpg",
  media: [
    { type: "image", src: "images/products/your-photo.jpg" },
    { type: "image", src: "images/products/your-second-photo.jpg" },
    { type: "youtube", url: "https://www.youtube.com/watch?v=VIDEO_ID" }
  ],
  rating: 4.8,
  reviews: 450,
  badge: "Top Pick", // Or "" for no badge
  category: "dogs",  // "dogs" or "cats"
  subcategory: "toys",
  keywords: "dog toy interactive puzzle",
  link: "#", // Paste your Amazon affiliate URL here
  details: {
    about: "Short description of what the product is.",
    bestFor: "Who or which pet it suits best.",
    howToUse: ["Step 1", "Step 2", "Step 3"],
    pros: ["Strength 1", "Strength 2"],
    cons: ["Limitation 1", "Limitation 2"]
  }
}
```

---

## 10. Using an API Later
At the top of `js/products.js`, you will find:

```js
window.PRODUCTS_API_URL = "";
```

- Leave it `""` to keep using your local `window.PRODUCTS` array.
- When you are ready to load products from your own backend, paste your endpoint URL there. The site expects either a JSON array `[ ... ]` or `{ "products": [ ... ] }` where each object uses the same fields (`id`, `title`, `image`, `media`, `rating`, `reviews`, `badge`, `category`, `subcategory`, `keywords`, `link`, `details`).
- **Amazon Rule:** Never return or display any price or discount fields from an API.
- **Security Rule:** Always keep your secret API keys on a backend or serverless function—**never** paste a secret API key into `js/products.js` or `js/script.js`.

---

## 11. Quick Troubleshooting
- **Arrows or dots not showing on a card:** Make sure `media` is an array (`[ ... ]`) with at least **2** items.
- **Video not playing:** Check that the YouTube URL is public and embeddable, or verify your MP4 path (`videos/filename.mp4`) and spelling. Remember, `file://` local testing may block some YouTube embeds in certain browsers due to YouTube's domain policy—testing on localhost or live hosting fixes this.
- **Image not found:** Check that the file name and extension (`.jpg` vs `.png`) in `js/products.js` match the exact spelling inside `images/products/`.
- **Cards disappeared after editing `js/products.js`:** Check for a missing comma `,` between `{ ... }` product blocks or an unclosed quote `"` / bracket `]`.

---

## 12. Click-to-Enlarge Product Images
- **Open the viewer:** Clicking or tapping any product image (single photo or inside a slider) opens a full-screen lightbox viewer automatically—no setup needed.
- **Move between images:** Use the left/right arrows (or **Left/Right arrow keys** on desktop, or **swipe left/right** on phones) when a product has multiple images.
- **Zoom on phones:** Use two fingers to **pinch to zoom** in and out.
- **Close the viewer:** Tap the **`×`** button, tap/click the dark background, press **`Esc`** on desktop, **swipe down** on phones, or press your phone/browser **Back** button.
- **Videos:** Video slides and the `▶` play button still play directly in the card and are not affected by the image viewer.

---

## 13. Auto-Sliding Photos and Video Posters
- **Automatic slideshow:** On products with 2 or more images/videos, photos and video posters slide automatically every **5 seconds** and loop back to the first slide.
- **Dots & swipe:** The small dots at the bottom show how many items a product has—tapping any dot jumps directly to that slide, and swiping on phones still works.
- **Videos stay click-to-play:** A video slide only shows its poster and play button (`▶`) during the slideshow; it never plays automatically until a visitor clicks/taps `▶`.
- **Smart pausing:** Auto-sliding pauses while a video is playing, while the large image viewer (lightbox) is open, for **8 seconds** after a visitor touches/swipes/taps a card, and while the mouse hovers over a card on desktop.
- **Changing the speed:** Open `js/script.js`, find `initMediaAutoSlide()`, and change `var SLIDE_MS = 5000;` (`5000` = 5 seconds, `3000` = 3 seconds).
- **Reduce Motion:** If a visitor has "reduce motion" enabled on their device, auto-sliding turns off automatically while dot taps and swipe still work.

---

## 14. Share Button on Every Product
- **Where it appears:** Every product card has a small round share button in the top-right corner of the photo area (while the `"Top Pick"` badge stays in the top-left).
- **How sharing works:** On mobile phones, tapping it opens your device's native share menu (WhatsApp, Messenger, Facebook, Telegram, SMS, etc.). On computers without native sharing, it copies the link to the clipboard and shows a confirmation message.
- **Where the link goes:** The shared link opens `reviews.html` on your website, scrolls straight to that exact product card, and highlights it with a yellow ring—it shares a link to your own site (never the Amazon affiliate link) and never includes any price.
- **Important about `id` in `js/products.js`:** The shared link uses each product's `id` field. Always give every new product a unique `id`, and **never change a product's `id` once your website is live**, or older shared links will stop finding that product.
- **During video playback:** While a video is playing inside a card, the share button automatically hides so it never covers video controls, and returns as soon as the video stops.

---

## 15. Where to Edit What (Quick Reference)
| What you want to change | Exact file | Where inside the file |
|---|---|---|
| Social media links (Facebook, Instagram, etc.) | `js/script.js` | Very top — look for `SOCIAL_LINKS` |
| Founder photo | `images/` folder | Save your photo as `images/founder.jpg` |
| Founder name, intro, bullets and promise | `about.html` | Search for `MEET THE FOUNDER` (every editable line is marked `EDIT`) |
| Founder card colors | `css/style.css` | Search for `Meet the Founder (Design B)` and change the `--fb-*` color values |

---

## 16. How to Add Your Social Media Links
1. Open **`js/script.js`** in Notepad, VS Code, or any plain text editor.
2. Right at the top of the file, look for **`var SOCIAL_LINKS = [`**.
3. Paste your full page URL inside the quotes `""` for each platform you use (for example: `{ name: "Facebook", url: "https://www.facebook.com/yourpage" }`).
4. **Hiding or removing a platform:**
   - Leave `url: ""` empty if you don't use that platform yet—its icon stays hidden automatically.
   - Delete the whole line if you want to remove a platform completely.
   - As long as all 6 links are `""`, nothing at all appears inside the three-dot (`⋮`) panel.
5. **Where the icons appear:** Once at least one `https://` link is filled in, a **"Follow Us"** row of round social buttons appears inside the three-dot (`⋮`) panel on **every page** (right above the Privacy Policy / Disclosure / Terms / Contact links).
6. **Supported platform names:** `Facebook`, `Instagram`, `Pinterest`, `YouTube`, `TikTok`, `X` (keep the exact `name:` spelling so the matching icon loads).
7. **Common mistakes &amp; troubleshooting:**
   - Always include `https://` at the start of every link.
   - Keep the quotes `"..."` around the URL and keep the comma `,` at the end of each line (except the last item inside `]`).
   - Need a different platform icon later (such as Threads, Reddit, or WhatsApp)? Ask and I can add its SVG icon to `ICONS` in `js/script.js`.

---

## 17. How to Add Your Founder Photo and Text
1. **PHOTO:**
   - Save a clear square photo of yourself as **`images/founder.jpg`** (a real JPG file, about **600×600 px**, under **120 KB**, with your face in the middle).
   - Your photo automatically displays inside the round frame in the header. Until `images/founder.jpg` exists in the `images/` folder, a clean demo placeholder image (`images/founder-placeholder.svg`) shows automatically.
   - Open **`about.html`**, find the `<img ...>` inside `MEET THE FOUNDER`, and change the `alt="..."` text to your own name.
2. **TEXT:**
   - Open **`about.html`** and search for **`MEET THE FOUNDER`**. Every line you can change has a comment right above it that says **`EDIT`**:
     - The badge word under the photo (`Founder`)
     - The small heading (`Meet the Founder`)
     - The greeting (change the name inside `<span class="fb-name">...</span>` and the words around it)
     - The intro paragraphs (copy a whole `<p>...</p>` line to add another paragraph)
     - The list title (`What you'll find here`) and each bullet (one `<li>...</li>` line per bullet)
     - The promise title (`My Promise`) and each promise point (one `<li>...</li>` line per point)
   - To add a bullet or promise point, copy a whole `<li>...</li>` line; to remove one, delete the line. Always keep every `<` and `>` and the closing tags (`</li>`, `</p>`) intact.
3. **COLORS:**
   - Open **`css/style.css`** and search for **`Meet the Founder (Design B)`**.
   - Change the `--fb-dark`, `--fb-blue`, and `--fb-accent` color values to adjust the header gradient, name highlight, and badge colors (plus `--fb-tile-bg` and `--fb-tile-border` for the bullet tiles).
4. **DIRECT LINK &amp; HONESTY:**
   - Linking to `about.html#founder` jumps visitors straight to this card.
   - Only write things that are true—never claim vet approval, certifications, or product testing you did not actually do.

---

## 18. Before Making the Website Public
- Replace **every** placeholder in the `MEET THE FOUNDER` section of `about.html`—for example `[Add 1-2 lines about you and your pets here.]`—as well as the demo bullet tiles and `"My Promise"` points with your own true words.
- Save your real square photo as `images/founder.jpg` (and update the photo's `alt="..."` text in `about.html`).
- Add your real `https://` URLs inside `SOCIAL_LINKS` at the top of `js/script.js` for the social channels you actively use, then preview `about.html` on both a phone screen and a desktop screen.
