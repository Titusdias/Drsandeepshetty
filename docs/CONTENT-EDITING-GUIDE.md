# Content Editing Guide
## Dr. Sandeep Shetty Dental Clinic — drsandeepshetty.in

This guide explains how to update website content using **Sanity Studio** (the CMS). No coding is required for day-to-day edits.

---

## 1. Getting started

### Open the CMS

| Environment | URL |
|-------------|-----|
| **Live site** | `https://drsandeepshetty.in/studio` |
| **Local (developers)** | `http://localhost:3000/studio` |

Sign in with the Sanity account your developer created for you.

### Basic workflow

Every edit follows the same steps:

1. Open the relevant section in the left sidebar
2. Change the fields you need
3. Click **Publish** (top right)
4. Wait a few seconds, then refresh the public website to see changes

> **Important:** Saving a draft is not enough — you must click **Publish** for changes to appear on the live site.

### After publishing

The website updates automatically within a few seconds after you publish. If you don’t see a change:

- Hard-refresh the page: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Clear your browser cache or try an incognito window
- Wait up to 1 minute for the cache to clear

---

## 2. Studio layout

The sidebar is organised into two groups:

### Page & global settings (singletons)

These are **one document each** — edit them directly from the sidebar:

| Sidebar item | What it controls |
|--------------|------------------|
| **Site Settings** | Clinic name, phone, hours, social links, logo, stats |
| **Home Page** | Homepage sections (hero, intro, reviews, etc.) |
| **About Page** | About page hero and philosophy |
| **Services Page** | Services hero, categories, Invisalign section, service list |
| **Team Page** | Team page intro and “Join Our Team” section |
| **Gallery Page** | Gallery page heading and intro text |
| **Contact Page** | Contact page headings, form text, map embed |
| **Navigation Menu** | Top menu links and “Book appointment” button |
| **SEO Defaults** | Default titles and descriptions for search engines |

### Repeatable content (lists)

These can have **multiple entries**:

| Sidebar item | What it controls |
|--------------|------------------|
| **Branch** | Clinic locations (Mangaluru branches, etc.) |
| **Team Member** | Individual staff profiles on `/team` |
| **Gallery Item** | Individual photos in the gallery |

---

## 3. Site Settings

**Path:** Sidebar → **Site Settings**

Global information used across the whole website (header, footer, contact details, trust stats).

| Field | Example | Notes |
|-------|---------|-------|
| **Clinic Name** | Dr. Sandeep Shetty's Dental Clinic and Orthodontic Centre | Required |
| **Tagline** | Dental & Orthodontic · Mangaluru | Short line under the logo |
| **Logo** | — | Upload clinic logo; use hotspot to crop |
| **Phone** | 0824 411 3388 | Main clinic number |
| **WhatsApp Number** | +917411133575 | Used for WhatsApp links |
| **Booking URL** | https://… | External booking link (if used) |
| **Instagram / Facebook / Google Review URL** | Full URLs | Social and review links |
| **Privacy Notice** | Footer legal text | |
| **Copyright Text** | © 2026 … | Footer line |
| **Hours** | Mon–Sat · 10:00 AM – 8:00 PM | Shown in multiple places |
| **Google Rating** | 4.9 | Trust statistic |
| **Review Count** | 115 | Trust statistic |
| **Years of Experience** | 25 | Trust statistic |
| **Patient Count** | — | Optional trust statistic |
| **Oman Branch** | Name, address, phone | Muscat/Oman location (embedded section) |

**Affects:** Footer, contact details, trust badges, and parts of the homepage.

---

## 4. Home Page

**Path:** Sidebar → **Home Page**

Organised into collapsible **fieldsets** (sections). Expand each section to edit.

### Hero Section

| Field | Purpose |
|-------|---------|
| Hero Badge | e.g. `4.9★ Google · 115 reviews` |
| Hero Cert Badge | e.g. `Certified Invisalign focus` |
| Hero Heading | Main headline (required) |
| Hero Subheading | Secondary line below headline |
| Hero Description | Paragraph under the subheading |
| Primary / Secondary CTA | Button label + link for each |
| Hours Note | Small hours line under buttons |
| Hero Background Image | Full-width background |
| Hero Inline Image | Image in the hero card on the right |

### Intro Section

“Where advanced care feels personal” — label, heading, body, bullet list, CTA, two images, trust note.

### Why Us Section

Section label, heading, CTA, and **Cards** (repeatable: title + description each).

### Reviews Section

“Wall of love” — heading, subheading, and **Review Items** (quote, reviewer label, platform).

### Locations Section

Heading and subheading for the “Visit us” block. **Branch cards** come from **Branch** documents (see §10).

### CTA Section

Bottom dark section — heading, hours, booking button, WhatsApp label.

### SEO Settings

Optional overrides for this page only (see §13).

---

## 5. About Page

**Path:** Sidebar → **About Page**

| Fieldset | Contents |
|----------|----------|
| **Hero** | Section label, heading, body, two CTA buttons, hero video (MP4 file upload) |
| **Philosophy** | Heading, body, **Pillars** (repeatable: title + description) |
| **SEO** | Page-specific SEO |

The hero video should be an **MP4** file. If none is uploaded, the site falls back to a default video.

---

## 6. Services Page

**Path:** Sidebar → **Services Page**

| Fieldset | Contents |
|----------|----------|
| **Hero** | Label, heading, subheading, CTA button |
| **Categories** | Service groups with title, description, and icon image |
| **Invisalign** | Heading, subheading, body, Invisalign logo image |
| **Service Directory** | Directory heading, note, and **list of all services** (one string per line — shown as checkmarks on the site) |
| **SEO** | Page-specific SEO |

**Tip:** To add or remove a service from the checklist, edit **Directory Items** — add a new line for each service name.

---

## 7. Team

### Team Page (shell)

**Path:** Sidebar → **Team Page**

| Field | Purpose |
|-------|---------|
| Hero label, heading, subheading | Top of `/team` |
| Join Section | “Join Our Team” heading, body, two CTA buttons |

### Team Members (individual profiles)

**Path:** Sidebar → **Team Member** → open or create a member

| Field | Purpose |
|-------|---------|
| **Name** | Required |
| **Slug** | URL path, e.g. `dr-sandeep-shetty` → `/team/dr-sandeep-shetty`. Click **Generate** from name. |
| **Role** | Job title / specialty line |
| **Bio** | Profile text |
| **Photo** | Headshot (use hotspot to crop) |
| **Order** | Sort order (lower = appears first) |
| **Is Active** | Uncheck to hide from the website |
| **Specializations** | List of expertise areas |
| **Qualifications** | Degrees and certifications |

**To add a new team member:** Team Member → **+** (or Create) → fill fields → **Publish**.

**To remove someone from the site:** Uncheck **Is Active** and publish (don’t delete unless you’re sure).

---

## 8. Gallery

### Gallery Page (shell)

**Path:** Sidebar → **Gallery Page**

Hero label, heading, and subheading at the top of `/gallery`.

### Gallery Items (photos)

**Path:** Sidebar → **Gallery Item**

| Field | Purpose |
|-------|---------|
| **Title** | Optional internal label |
| **Image** | The photo |
| **Alt Text** | Required — describe the image for accessibility |
| **Category** | `before-after`, `clinic`, `team`, or `procedures` — controls which section it appears in |
| **Order** | Sort order within the gallery |
| **Is Active** | Uncheck to hide |

**To add a photo:** Gallery Item → Create → upload image, fill alt text, pick category → **Publish**.

Photos are grouped on the site by **Category**:

| Category | Section title on site |
|----------|----------------------|
| before-after | Before & After |
| clinic | Our Clinic |
| team | Our Team |
| procedures | Procedures |

---

## 9. Contact Page

**Path:** Sidebar → **Contact Page**

| Field | Purpose |
|-------|---------|
| Hero label, heading, subheading | Top of `/contact` |
| Form Heading / Subheading | Text above the contact area |
| Map Embed URL | Google Maps embed URL for the iframe |
| Success Message | Shown after form submission (if used) |
| SEO | Page-specific SEO |

**Clinic address and phone** on the contact page also pull from **Site Settings** and **Branch** documents.

---

## 10. Branches (locations)

**Path:** Sidebar → **Branch**

Each document = one clinic location (e.g. Mangaluru Flagship, Pandeshwar).

| Field | Purpose |
|-------|---------|
| **Name** | Required — e.g. Mangaluru Flagship |
| **Label** | Display tag — e.g. Flagship clinic |
| **City** | Required |
| **Address** | Required — full address |
| **Phone** | Branch-specific phone (optional) |
| **Google Maps URL** | Directions link |
| **Is Active** | Hide from site when unchecked |
| **Order** | Sort order on homepage / contact |

**To add a new branch:** Branch → Create → fill fields → **Publish**.

---

## 11. Navigation Menu

**Path:** Sidebar → **Navigation Menu**

| Field | Purpose |
|-------|---------|
| **Nav Items** | Menu links: label, href (e.g. `/services`), external flag, order |
| **CTA Label** | Header button text — e.g. Book appointment |
| **CTA URL** | Header button link |

**To reorder menu items:** Change the **Order** number on each item (lower = further left), or drag items if your Studio supports it.

**External links:** Check **Is External** for links that open outside the site (opens in new tab).

---

## 12. SEO

### SEO Defaults (global)

**Path:** Sidebar → **SEO Defaults**

Fallback metadata when a page doesn’t set its own SEO:

| Field | Purpose |
|-------|---------|
| Default Title | Base page title |
| Title Suffix | Appended to titles — e.g. `\| Dr. Sandeep Shetty's Dental Clinic` |
| Default Description | Meta description for search results |
| Default Keywords | Comma-separated keywords |
| Default OG Image | Image when links are shared on social media |
| Twitter Card | `summary` or `summary_large_image` |

### Per-page SEO

On **Home**, **About**, **Services**, **Team**, **Gallery**, and **Contact** pages, expand the **SEO Settings** fieldset:

| Field | Purpose |
|-------|---------|
| SEO Title | Override browser tab / Google title |
| SEO Description | Override meta description |
| SEO Keywords | Page-specific keywords |
| OG Image | Override social share image for this page |

Leave fields empty to use **SEO Defaults**.

---

## 13. Images — best practices

- **Format:** JPG or PNG for photos; PNG for logos with transparency
- **Size:** Aim for under 500 KB per image; hero images can be up to ~1 MB
- **Hotspot:** After uploading, click the image and drag the hotspot circle so faces or logos stay centred when cropped
- **Alt text:** Always fill in on gallery images — required for accessibility

---

## 14. What updates when you publish

| You publish… | Website updates… |
|--------------|------------------|
| Site Settings | Global details, footer, parts of contact/home |
| Home Page | Homepage (`/`) |
| About Page | `/about` |
| Services Page | `/services` |
| Team Page or Team Member | `/team` and individual profile pages |
| Gallery Page or Gallery Item | `/gallery` |
| Contact Page | `/contact` |
| Branch | Homepage locations + contact page |
| Navigation Menu | Top navigation *(see note below)* |
| SEO Defaults | Search/social previews *(see note below)* |

### What is live on the website today

Most page content is connected. A few CMS sections are **ready in Studio** but not yet shown on the live site — your developer can enable these next:

| CMS section | Status on live site |
|-------------|---------------------|
| Home → Hero, Reviews | **Live** |
| Home → Intro, Why Us, Locations, bottom CTA | Editable in CMS; site still shows default text until frontend is updated |
| About, Services, Team, Gallery, Contact pages | **Live** |
| Team Members, Gallery Items, Branches | **Live** |
| Site Settings (phone, hours on Contact) | **Partially live** |
| Navigation Menu | Editable in CMS; header still uses default links |
| SEO Defaults / per-page SEO | Editable in CMS; search previews still use default metadata |

---

## 15. Common tasks (quick reference)

### Change the homepage headline

1. **Home Page** → **Hero Section** → **Hero Heading**
2. **Publish** → refresh `/`

### Update clinic phone number

1. **Site Settings** → **Phone**
2. **Publish** → refresh any page

### Add a team member

1. **Team Member** → Create new
2. Fill name, slug, role, bio, photo
3. Set **Order** and ensure **Is Active** is checked
4. **Publish** → refresh `/team`

### Add a gallery photo

1. **Gallery Item** → Create new
2. Upload image, add **Alt Text**, pick **Category**
3. **Publish** → refresh `/gallery`

### Change opening hours

1. **Site Settings** → **Hours**
2. Also update **Home Page** → Hero / CTA **Hours Note** if those lines should match
3. **Publish**

### Hide content without deleting

Uncheck **Is Active** on Team Members, Gallery Items, or Branches, then **Publish**.

---

## 16. Troubleshooting

| Problem | What to try |
|---------|-------------|
| Changes not visible | Did you click **Publish**? Hard-refresh the site. |
| Studio shows schema errors | Contact your developer — the CMS configuration may need an update. |
| Image looks cropped wrong | Re-open the image in Studio and adjust the **hotspot**. |
| New team member page 404 | Ensure **Slug** is set and matches the link (e.g. `dr-sandeep-shetty`). |
| Can’t log in | Ask your developer to invite your email in the Sanity project dashboard. |

---

## 17. Need help?

For technical issues (login, broken Studio, webhook/cache problems), contact whoever manages the website deployment.

For content questions (what to write, brand tone), use your clinic’s internal content guidelines.

---

*Last updated: June 2026 — matches Sanity schemas in `src/sanity/schemaTypes/`.*
