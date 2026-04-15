# NBF Ajyal Landing Page — Design Spec

## Overview

Revamp the NBF Ajyal website (https://nbfajyal.ae/) from a basic Bootstrap site targeting UAE Nationals 18-25 into a modern, Revolut-inspired single-page landing targeting all low-income UAE residents (salary < 5,000 AED). Visuals only — no backend integrations.

**Design system:** Revolut-inspired via awesome-design-md, adapted with NBF brand green.

## Decisions Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Design style | Revolut-inspired | Sleek, modern, premium feel that competes with Mashreq/ADCB/Emirates NBD |
| Language | English only | Simpler implementation, wider reach in expat-heavy low-income segment |
| Page structure | Single-page landing | Strongest conversion focus, fastest to build |
| Tech stack | Plain HTML/CSS/JS | Zero dependencies, fast load, easy hosting |
| Target audience | All low-income UAE residents | Expand beyond current UAE Nationals-only restriction |
| Brand accent | NBF Green (#006633) | Maintains brand identity within Revolut framework |
| Implementation approach | Revolut DESIGN.md with green swap | Battle-tested system, fastest path to polished result |

## Architecture

Single-page landing with 9 sections:

1. **Sticky Navigation** — Logo left, nav links center, "Open Account" CTA right
2. **Hero Section** — Massive headline, subtext, dual CTA buttons, hero visual area
3. **Benefits Section** — 3x2 card grid (6 benefits)
4. **Products Section** — Horizontal feature cards (4 products)
5. **How It Works** — 3-step onboarding process
6. **Stats/Social Proof** — Key numbers
7. **FAQ Accordion** — Expandable questions
8. **CTA Section** — Final conversion push with green background
9. **Footer** — NBF branding, links, legal

**Layout rules:**
- Max content width: 1200px, centered
- Section spacing: 80px-120px vertical padding
- 8px base spacing unit
- Dark (#191c1f) and white sections alternate for visual rhythm

## Visual Identity

### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary Dark | Near-black | `#191c1f` | Dark section backgrounds, dark buttons, primary text |
| Primary Light | Pure White | `#ffffff` | Light section backgrounds, button text on dark |
| Light Surface | Off-white | `#f4f4f4` | Secondary button background, subtle surfaces |
| Brand Accent | NBF Green | `#006633` | Primary CTA, brand accent, active states |
| Brand Hover | Darker Green | `#004d26` | Hover state for green buttons |
| Success | Teal Green | `#00a87e` | Success states, positive indicators |
| Secondary Text | Cool Gray | `#8d969e` | Muted text, descriptions |
| Mid Text | Slate | `#505a63` | Secondary headings, labels |
| Danger | Red | `#e23b4a` | Error states |

### Typography

**Font family:** Inter (Google Fonts, free, geometric grotesque similar to Aeonik Pro)

| Role | Size | Weight | Line Height | Letter Spacing | Usage |
|------|------|--------|-------------|----------------|-------|
| Display Hero | 80px (5rem) | 600 | 1.00 | -1.6px | Hero headline |
| Display Section | 48px (3rem) | 600 | 1.21 | -0.96px | Section headings |
| Sub-heading | 32px (2rem) | 500 | 1.20 | -0.64px | Sub-sections |
| Card Title | 24px (1.5rem) | 500 | 1.33 | -0.48px | Card headings |
| Feature Title | 20px (1.25rem) | 400 | 1.40 | normal | Feature headings |
| Body Large | 18px (1.125rem) | 400 | 1.56 | -0.09px | Introductions, lead text |
| Body | 16px (1rem) | 400 | 1.50 | 0.16px | Standard reading |
| Body Semibold | 16px (1rem) | 600 | 1.50 | 0.16px | Emphasized body |
| Button | 16px (1rem) | 500 | 1.00 | normal | Button text |
| Caption | 14px (0.875rem) | 400 | 1.50 | normal | Small text, labels |

### Responsive Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile Small | <400px | Compact single column |
| Mobile | 400-720px | Standard mobile |
| Tablet | 720-1024px | 2-column grids |
| Desktop | 1024-1280px | Full layout |
| Large | >1280px | Centered content, generous margins |

**Responsive type scaling:**
- Hero: 80px -> 48px -> 36px on mobile
- Section headings: 48px -> 36px -> 28px on mobile
- Section spacing: 80-120px -> 48-64px on mobile

## Component System

### Buttons

All buttons use 9999px border-radius (full pill shape).

**Primary Green Pill:**
- Background: `#006633`
- Text: `#ffffff`
- Padding: 14px 32px
- Radius: 9999px
- Hover: background `#004d26`
- Focus: 0 0 0 0.125rem ring

**Primary Dark Pill:**
- Background: `#191c1f`
- Text: `#ffffff`
- Padding: 14px 32px
- Radius: 9999px
- Hover: opacity 0.85

**Secondary Light Pill:**
- Background: `#f4f4f4`
- Text: `#191c1f`
- Padding: 14px 34px
- Radius: 9999px
- Hover: opacity 0.85

**Outlined Pill:**
- Background: transparent
- Text: `#191c1f` (on white) or `#ffffff` (on dark)
- Border: 2px solid current text color
- Padding: 14px 32px
- Radius: 9999px

**Ghost on Dark:**
- Background: `rgba(255,255,255,0.1)`
- Text: `#ffffff`
- Border: 2px solid `rgba(255,255,255,0.3)`
- Padding: 14px 32px
- Radius: 9999px

### Cards

- Border radius: 12px (small cards), 20px (feature cards)
- No shadows — flat design
- Dark/light section alternation creates depth through contrast
- White background on dark sections, border `1px solid rgba(25,28,31,0.08)` on light sections
- Card padding: 24px-32px
- Cards use vertical layout with icon/illustration top, title, description bottom

### Navigation

- Sticky white header with `backdrop-filter: blur(12px)` and `background: rgba(255,255,255,0.9)`
- Logo left-aligned
- Nav links center: Benefits, Products, How It Works, FAQs
- Green pill CTA right-aligned: "Open Account"
- Mobile: hamburger toggle with slide-in panel from right
- Nav height: 72px desktop, 64px mobile
- On scroll: subtle bottom border appears

### FAQ Accordion

- Clean dividers between items, no enclosing boxes
- Plus icon that rotates to X when open
- Smooth max-height transition (300ms ease)
- Question text: 18px Inter weight 500
- Answer text: 16px Inter weight 400, color `#505a63`

### Icons

- Library: Lucide Icons (open-source, MIT, clean line style)
- Standard size: 24px, stroke-width: 2
- Available via CDN or inline SVG
- Color inherits from parent text color

## Page Sections — Detailed

### 1. Navigation

- **Background:** White with blur, sticky
- **Left:** NBF Ajyal logo (text-based: "NBF" in bold + "Ajyal" in green)
- **Center:** Benefits | Products | How It Works | FAQs (smooth scroll to anchors)
- **Right:** Green pill button "Open Account"
- **Mobile:** Hamburger icon, slide-in menu with full-width links

### 2. Hero Section

- **Background:** White
- **Layout:** Two-column (text left 60%, visual area right 40%) on desktop; stacked on mobile
- **Headline:** "Banking Made Simple" — 80px Inter weight 600, color `#191c1f`, tracking -1.6px
- **Subtext:** "No minimum salary. No minimum balance. Just open your account and start banking." — 18px Inter weight 400, color `#505a63`
- **CTAs:** Two pills side by side — Primary green "Open Your Account" + Outlined "Explore Products"
- **Visual area:** Placeholder for app mockup / abstract fintech illustration (CSS gradient or SVG pattern as fallback)

### 3. Benefits Section

- **Background:** `#f4f4f4` (off-white)
- **Layout:** 3x2 card grid on desktop, 2x3 on tablet, 1x6 on mobile
- **Section heading:** "Why NBF Ajyal?" — 48px, centered
- **Cards (6):**

  | Icon | Title | Description |
  |------|-------|-------------|
  | Landmark | 6,000+ Free ATMs | Withdraw cash anywhere in the UAE, completely fee-free |
  | Smartphone | Digital Banking | Full control from your phone, 24/7 banking at your fingertips |
  | Percent | 2% Cashback | Earn cashback on all your everyday spending |
  | Car | Auto Loans from 2.2% | Drive your dream car with competitive rates starting at 2.2% p.a. |
  | Film | 60% Off Movies | Enjoy the best entertainment for less with exclusive discounts |
  | PiggyBank | Savings Made Easy | Start saving with no minimum balance required |

- **Card design:** White background, 20px radius, 24px padding, icon (32px) top, title below, description below title
- **Gap:** 20px between cards

### 4. Products Section

- **Background:** White
- **Layout:** 4 horizontal cards in a row (desktop), 2x2 (tablet), stacked (mobile)
- **Section heading:** "Products Built for You" — 48px
- **Cards (4):**

  | Product | Key Detail | Description |
  |---------|-----------|-------------|
  | Current Account | No minimum salary or balance | A simple account that works for everyone. No barriers, no hidden fees. |
  | Auto Loan | From 2.2% p.a. | Finance your car with competitive rates and flexible repayment terms. |
  | Personal Loan | Up to AED 150,000 | Get the funds you need with transparent terms and fast approval. |
  | Credit Card | Cashback + movie discounts | Earn rewards on every purchase and enjoy exclusive entertainment offers. |

- **Card design:** Dark background (`#191c1f`), white text, 20px radius, 32px padding, product icon, title, key stat highlighted, description, "Learn More" ghost button

### 5. How It Works

- **Background:** White
- **Layout:** 3 steps in a horizontal row with connecting lines/dots between them
- **Section heading:** "Get Started in 3 Steps" — 48px
- **Steps:**

  | Step | Icon | Title | Description |
  |------|------|-------|-------------|
  | 1 | Download | Download the App | Get the NBF Instant App from your app store |
  | 2 | Scan | Scan Your Emirates ID | Take a selfie and scan your Emirates ID — that's it |
  | 3 | Rocket | Start Banking | Your welcome pack is delivered to your door |

- **Visual:** Numbered circles (1, 2, 3) with icons, connected by dashed lines or subtle arrows
- **Color:** Step numbers in green circles, rest in dark text

### 6. Stats/Social Proof

- **Background:** `#191c1f` (dark)
- **Layout:** 3-4 stat blocks in a row
- **Stats:**
  - 6,000+ ATMs across the UAE
  - 60% off movie tickets
  - 2% cashback on spending
  - 2.2% auto loan rates
- **Design:** Large number in white, label below in `#8d969e`, centered

### 7. FAQ Section

- **Background:** White
- **Layout:** Centered accordion, max-width 800px
- **Section heading:** "Frequently Asked Questions" — 48px
- **Questions (8-10):**
  1. Who can open an NBF Ajyal account?
  2. What is the minimum salary requirement?
  3. What documents do I need?
  4. How do I open an account?
  5. Is there a minimum balance?
  6. What is the NBF Instant App?
  7. How does the cashback work?
  8. Can I apply for a loan with NBF Ajyal?
  9. Are there any hidden fees?
  10. How do I contact customer support?

### 8. CTA Section

- **Background:** `#006633` (NBF Green) or gradient from `#006633` to `#004d26`
- **Layout:** Centered text + button
- **Headline:** "Ready to Start Banking?" — 48px, white
- **Subtext:** "Open your account in minutes. No minimum salary required." — 18px, white with slight transparency
- **CTA:** White pill button "Open Your Account" — white background, green text, hover: slight scale

### 9. Footer

- **Background:** `#191c1f`
- **Layout:** 4 columns on desktop, stacked on mobile
- **Content:**
  - Column 1: NBF Ajyal logo + brief tagline
  - Column 2: Quick Links (Benefits, Products, FAQs)
  - Column 3: Legal (Terms, Privacy, Disclosures)
  - Column 4: Social media icons
- **Bottom bar:** Copyright + "A product of National Bank of Fujairah"
- **Text color:** White for headings, `#8d969e` for body/links

## File Structure

```
nbfajyal.ae/
  index.html          — Single page with all sections
  css/
    style.css         — Main stylesheet (design tokens + all component styles)
  js/
    main.js           — Navigation, accordion, smooth scroll, mobile menu
  assets/
    icons/            — Lucide icon SVGs (inline or referenced)
    images/           — Any hero images/illustrations
  DESIGN.md           — Revolut-inspired design system document (from awesome-design-md)
```

## Technical Notes

- No build tools, no npm, no framework dependencies
- Inter font loaded via Google Fonts CDN
- Lucide Icons loaded via CDN (unpkg)
- CSS custom properties for all design tokens (colors, spacing, typography)
- Semantic HTML5 sections with proper heading hierarchy
- All interactions via vanilla JavaScript
- Smooth scroll for anchor navigation
- Mobile-first responsive approach
- Lighthouse performance target: 95+ on all metrics
- Accessibility: WCAG 2.1 AA compliance (contrast ratios, keyboard navigation, ARIA labels)

## Out of Scope

- Arabic language support
- UAEKYC integration
- UAE Pass integration
- Backend / API
- User authentication
- Account opening form (visual placeholder only)
- CMS integration
