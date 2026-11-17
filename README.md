# WorldInSights company website

A two-page site for investors and friends: a homepage and an About page. Everything (HTML, CSS, JavaScript and the hand-drawn art) lives in one file, `index.html`. There is no build step and no dependencies beyond Google Fonts.

| Homepage | About |
| --- | --- |
| ![Homepage](screenshots/home.png) | ![About page](screenshots/about.png) |

## View it

Open `index.html` in a browser. The About page is at `index.html#about`.

The six windows appear in a different order on every visit. Add `?order=fixed` to the address (`index.html?order=fixed`) to keep the order shown in the screenshots.

To serve it locally instead, for example to test on a phone on the same network:

```bash
cd company-website && python3 -m http.server 8000
```

Then open `http://localhost:8000` (or your computer's IP address and port 8000 from the phone).

## What's on the page

- **Homepage:** a row of six product windows (lamp, necklace, dress, headphones, armchair, groceries, shuffled on each visit), the WorldInSights name, and the tagline.
  - On load, the letters write themselves in and every window gives a small hop.
  - A hand-drawn cursor then demonstrates one window at a time, about 2.7 s each. It explodes (the headphones show their drivers, wiring, circuit board and battery), recolors, rotates or moves the product, and the window nearest the visitor's pointer goes next.
  - Hovering a window (or tapping it on a phone or tablet, or tabbing to it with the keyboard) lifts the product out into a faint sketch of where it lives, with a little settle physics. The other windows move aside, and the tagline is replaced by that product's shopper question.
- **About:** a one-line statement, the team's background, and pencil portraits of the three co-founders with their roles.
- **Settings** (the slider icon, top right): title font, two color themes, two drawing styles, title position, and text effects. Choices are saved in the visitor's browser.

## Common edits

All of these are in `index.html`.

| To change | Look for |
| --- | --- |
| The company name | The `WORDS` array (`World` / `In` / `Sights`, each with its own tone: ink, the theme's warm accent, and muted) and the `<title>`, `aria-label`, footer and font-preview text, all of which say `WorldInSights` |
| Hide the name while it's being decided | Set `SHOW_TITLE = false`. The tagline stays. |
| Tagline | `<p id="line">` |
| About text | `<p class="lead">` inside `<main id="about-view">` |
| Founder names, roles or portraits | The `FOUNDERS` array (`name`, `role`, `shapes`). Each portrait is a list of simple shapes in a 0–1 box. |
| Product questions shown on hover | The `q` field of each entry in `PRODUCTS` |
| Product drawings and their settings | The `shapes` and `env` lists in `PRODUCTS` |
| Cursor demos | `DEMOS`: each product has two or three short `moves` |
| Default font, theme or effects | `DEFAULTS` near the top of the script |
| Turn the shuffle off for everyone | Set `SHUFFLE` to `false` (next to `ORDER`, right after `DEMOS`) |

## Screen sizes and interaction

Checked in Chrome at nine sizes:
- phones: 375 × 667, 390 × 844, and 844 × 390 held sideways;
- iPads: 820 × 1180 and 1180 × 820;
- laptops: 1024 × 768 and 1440 × 900;
- monitors: 1920 × 1080 and a 2560 × 1080 ultrawide.

- **Layout**
  - No size scrolls sideways.
  - The windows, name and tagline fit in one screen.
  - Windows and the name scale with both the width and the height of the screen, and are larger on screens held upright.
  - The row of windows is centered when it fits and scrolls sideways when it doesn't.
  - The founders stay in a row of three, with each role on its own line.
- **Mouse**
  - Hover opens a window, and moving away closes it.
  - Moving from one open window straight to the next switches between them.
  - Clicking an open window keeps it open.
  - Dragging the row scrolls it without opening anything.
- **Touch**
  - Tapping a window opens it. Tapping it again, or tapping empty space, closes it.
  - Swiping scrolls the row.
- **Keyboard:** Tab moves through the windows and opens each one in turn.
- **Anywhere**
  - Resizing or scrolling with a window open closes it cleanly.
  - The menu links always open the page at the top.

## Title-slide GIF

`title-slide.gif` is a 6.6-second, 16:9 (1920 × 1080) loop for a presentation title slide. It's 4.2 MB.
- **What plays:** the headphones explode, the necklace swings, and a pointer glides onto the armchair, which lifts into its reading nook with the question underneath.
- **Framing:** it shows the windows in the fixed order, without the menu bar or footer.
- **Loop:** the first and last frames match, so it repeats without a jump.

## Accessibility

- Every window and portrait has an accessible name.
- The hover question is announced with `aria-live`.
- The settings panel works with the keyboard and closes with Esc.
- With "reduce motion" turned on in the operating system, the demos, drift and ink-in animation are switched off.
