# BASE — Website + IDEX 2027 Concept Proposal

One deliverable, two tabs:

| Tab | What it is |
|---|---|
| **01 BASE** | The BASE corporate site, rebuilt from basestudio.com.tr with the full content set and added interactivity. |
| **02 IDEX 2027 PROPOSAL** | The **BASE EXPERIENCE AREA** concept for stand 12-E13, including a working UI prototype, LED-wall simulation and management dashboard. |

---

## Run it

```bash
node base-web/server.js
```

Then open <http://localhost:8899>. (A `.claude/launch.json` entry named `base-web` starts the
same server.) A server is required — the page loads CSS/JS as separate files and streams the
film with HTTP range requests, so `file://` will not work correctly.

---

## Structure

```
base-web/
  index.html            built file — do not edit directly
  build.sh              concatenates src/*.html → index.html
  server.js             static server with range support (for video scrubbing)
  src/
    00-head.html        <head> + fixed shell / tab bar
    10-site.html        Tab 01 — corporate site
    20-fair.html        Tab 02 — IDEX proposal narrative
    99-tail.html        script tags + closing tags
  css/
    tokens.css          palette, type scale, motion, reset
    site.css            shell + corporate site
    proposal.css        proposal narrative sections + SVG diagram styles
    prototype.css       LED rig, touchscreen, dashboard, sales view
  js/
    data.js             all product copy + technical specification tables
    viz.js              procedural vehicle/axle SVG + LED environment scenes
    app.js              tab routing, scroll reveal, counters
    site.js             corporate site interactions (all scroll-driven sections)
    product-art.js      technical elevation drawings for the four products
    experience.js       the working prototype (touchscreen ⇄ LED walls)
    proposal.js         floor plan, data-flow / architecture diagrams, lists
    dashboard.js        BASE Experience Dashboard + Sales View (demo data)
  assets/
    img/                images pulled from basestudio.com.tr + the two concept renders
    video/base-film.mp4 the BASE introduction film
```

**Edit `src/*.html`, then run `./build.sh`.** Editing `index.html` directly will be overwritten.

---

## Tab 01 — the BASE website

A cinematic, scroll-driven site built on **your own high-resolution assets** (`yeni_imagery/`),
not on the small scraped WordPress thumbnails.

**Section flow**

| | Section | What it does |
|---|---|---|
| 00 | Hero | Full-bleed 1080p cinematic clips cross-fading every 5s (desert drive → convoy → arctic), staged line-by-line headline reveal, live stat bar. |
| 01 | Statement | The core positioning statement illuminates word by word as you scroll; product terms light in BASE blue. The three pillars are image cards. |
| 02 | **Platform range** | The real 4×4 / 6×6 / 8×8 / 8×8-IFV lineup render. Click a platform (or its hotspot) and the frame pans and zooms to it with a spec card. Toggle **DESERT / ARCTIC** to see the same platforms in both climates. |
| 03 | **The drivetrain** | Four component tabs — independent suspension drive axle, rigid drive axle, two-speed transfer case, 4×4 rolling chassis — each shown as the **real BASE product render** on a warm studio lightbox set into the dark section, with specs beneath and a link through to the full product band. A transformation clip drifts behind at low opacity. |
| — | Interstitial | Full-bleed cinematic beat on the mechanical-transformation clip: *Engineered in-house. Validated in the field.* A second one before Contact carries *14 countries. One drivetrain family.* |
| 04 | **Drivetrain configurator** | One instrument in three columns: controls, a live platform stage, and the result rail. The platform redraws as you change configuration, the suspension sags as GVW rises, and load arrows appear once the axles work near their rating. The rail names the axles, transfer case and delivery with product chips and links. |
| 05 | Products | Four editorial bands, each with a purpose-drawn **technical elevation drawing** (`js/product-art.js`) and the full specification table. A **DRAWING / PRODUCT** switch flips between the drawing and the real product photography. Click any table row to load that model into the comparison tool. |
| — | Portfolio coverage | A light band — the one inverted beat in the site — carrying the coverage chart: six platform classes from 8 t 4×4 to 32 t 8×8, each with its matching BASE axle assembly. |
| 06 | **Validation & R&D** | Promoted to a full section. Four tiles of real test-centre footage cut from the film — test centre, suspension fatigue rig, dynamometer, metrology — previewing on hover. |
| 07 | **How we build** | The eleven-stage flow, as its own section rather than an appendix to the film. Each stage is a clip from the film; hover previews, click opens the theatre (←/→/Esc). |
| 08 | Field experience | Pinned scroll sequence: the background moves desert → arctic → mixed terrain while the 2,500+ counter runs and the region list changes. |
| — | From the field | Six-tile photo mosaic of real BASE hardware, with a keyboard-navigable lightbox (←/→/Esc). |
| 09 | Dakar | Full-bleed cinematic pull-quote. |
| 10 | Film | The introduction film with a custom player — scrub bar with **chapter markers**, time, fullscreen — and an eleven-chapter list that seeks the film. |
| 11 | Operating model | Localization and lean assembly cells. |
| 12 | Company | Opens on a full-bleed photograph of BASE rolling chassis being loaded onto an IL-76, with a founded/fleet/regions/certifications stat bar. Then vision, mission, Who We Are (with studio chassis photography), strategic content, way of working, ISO certifications and policies. |
| 13 | Partners | Continuous marquee, pauses on hover. |
| 14 | Contact | Full-bleed with the globe clip behind, contact details and form. |

A section index rail tracks scroll on the left at ≥1400px.

**Content** is transcribed from basestudio.com.tr: home messaging and the three pillars, Company
(vision, mission, Who We Are, strategic content, way of working, ISO certifications and policies),
Products (all four products with their full technical specification tables and the in-house
validation centre), Field Experience (2,500+ vehicles, the Dakar Rally story, the partner logo
wall) and Contact.

**Not included:** the Turkish (`/tr/`) version and the PDF brochure download. The ISO certificate
links point at the live PDFs on basestudio.com.tr.

**One deviation from BASE's own copy.** Everything else on the site is transcribed verbatim, but
the *Supplier of Strategic Content* paragraph is rewritten. BASE's original read:

> BASE content is strategic and its importance is growing even more as the automotive industry
> shifts to electric and other alternative fuels.

That argued the weaker case — it implied BASE rides the EV transition, when the stronger and truer
claim is that BASE's content *survives* it: the powertrain changes, the drivetrain does not. The
replacement says so. It deliberately limits itself to **axles, hub reduction and suspension**
carrying across, because the transfer case is architecture-dependent — it persists with a
centralised motor and disappears in a wheel-motor layout. Do not widen that claim without BASE
confirming their e-drive position. Revert in `src/10-site.html` if BASE prefers their wording.

**One claim to confirm:** the *14 countries* figure comes from the film's own title card (and the
`10_GLOBE_CLOSE_14countries_100M` filename). It is BASE's own number, but it is not on the current
website — check it is still current before this goes public. The interstitial carries a visible
note saying so.

### Supplied artwork (`web_source/`)

Ten images dropped in on 1 Sep are now the primary art:

| Source | Used as | Where |
|---|---|---|
| `4x4.png` `6x6.png` `8x8.png` | `cfg-2/3/4.png` | Configurator stage |
| `independent_suspension.png` | `prod-ids.png` | Drivetrain tab 01 · configurator rail |
| `ridgid_axle.png` | `prod-rda.png` | Drivetrain tab 02 · configurator rail |
| `transfer_case.png` | `prod-tc.png` | Drivetrain tab 03 · configurator rail |
| `Rolling_chasis.png` | `prod-rc.png` | Drivetrain tab 04 · configurator rail |
| `advanced engineering.png` `fastresponse.png` `robust_product.png` | `pil-*.png` | Statement pillars |

**The configuration illustrations are cropped in CSS, not on disk.** Each one carries a bottom
legend naming a fixed `BTA-105` / `TK-420`, which would contradict whatever the configurator
actually selects. `--ar` on the stage image (set per configuration in `configurator()`) trims that
band off with `object-fit:cover; object-position:top`, so the artwork keeps its own title and
description while the live models appear only in the result rail. Change `--ar` if you re-export
the artwork at a different height. The files themselves are untouched originals.

*(`sips --cropOffset` silently centres instead of honouring the offset on this machine, which is
why the crop is done in CSS rather than baked into the files.)*

### How the configurator selects

`selector` in `js/data.js` holds the tables. Axle ratings are the **published figures** from the
product specification tables; the transfer-case and rolling-chassis banding is indicative.

- Indicative axle load = GVW ÷ number of axles (an even distribution).
- It picks the **lightest** axle in the family whose published rating covers that load, so the
  utilisation bar usually reads high — that bar is the headroom, and it turns amber above 78 %
  and red above 92 %.
- On AUTO it uses independent suspension up to 12.0 t per axle and rigid above that.
- The stage drawing is `vehicleSVG` from `js/viz.js` in engineering view — the same generator the
  IDEX LED walls use — driven by axle count, load and utilisation.

**The procedural platform silhouette** in `js/viz.js` (`bodyPath()` / `turret()`) is a faceted
armoured hull — sloped glacis, angled windscreen, low roof, chamfered rear, angular wheel arches,
roof weapon station. The configurator no longer uses it (BASE artwork does), but the **IDEX LED
walls still do**, so keep it if you edit that file.
- If you force a family the load exceeds, it refuses and says so rather than inventing a model.
- Rolling chassis is offered only for 4×4 up to 20 t, matching BS360-14C and BS400-20C.

The section carries a visible statement that this is orientation only and that real load
distribution, duty cycle, gradeability and engine torque determine the final specification, which
BASE engineering confirms. **Change the banding in `selector` if BASE's own selection rules differ.**

### Assets

Copied from `yeni_imagery/` into `assets/`:

- `img/lineup-desert.png`, `img/lineup-arctic.png`, `img/lineup-arctic-wide.png` — the platform lineup
- `img/plat-6x6-desert.png`, `img/plat-8x8-forest.png` — individual platforms

Plus real BASE photography that was already in the project and is now used properly:
`Rolling-Chassis-Cover-Photo.png` (studio chassis render), `14t-1.webp` / `20t-3.webp` (studio
chassis photography), `BASE-platform-ready-to-delivery-*.jpg` (IL-76 loading), `field-photo.jpg`,
`BMC-Kirpi-II-3.jpg`, `dakar-rally-base-8.jpg`, `independent-portfolio-coverage-4.webp` (coverage
chart), and the `IDS/RDA/TC-square.webp` product cutouts behind the DRAWING/PRODUCT switch.

`prod-ids.png`, `prod-rda.png`, `prod-tc.png`, `prod-rc.png` are single products cropped out of
`BASE.Products.webp` and `rigid-portfolio.webp` — they drive the drivetrain section's light stage.
`transmission.webp` and `rigid-portfolio.webp` (the transfer-case and rigid-axle range charts, with
the 66–210 kg aluminium weight savings) are still unused and would suit a second coverage band.
- `clip/drive.mp4`, `clip/convoy.mp4`, `clip/arctic.mp4`, `clip/globe.mp4`, `clip/transform.mp4`,
  `clip/transform2.mp4`, `clip/zoomout.mp4` — 1920×1080, ~5s each

`img/plat-alt.png` (the original `image2.png`) is **deliberately unused**: it carries visible BMC
and ALTUĞ branding, so showing it as a BASE platform would misrepresent who builds the vehicle.
It is kept in the folder in case you want it in a customer/partner context instead.

**Vehicle visualisations carry a disclaimer** in the range section: BASE supplies drivetrain and
rolling chassis, not complete vehicles.

### Film chapters

The film's chapter structure was **read off the film itself** by stepping through it frame by
frame — the titles below are its own on-screen cards, not invented:

`BEHIND EVERY MISSION` · `TÜRKİYE · KOCAELİ` · `ENGINEERED IN-HOUSE` · `TESTED TO THE LIMITS` ·
`COMPLETE CONFIDENTIALITY` · `STRATEGIC KNOW-HOW` · `PRECISION CLEANING` · `LEAN ASSEMBLY` ·
`PROTECTIVE FINISH` · `COMPLETE ROLLING CHASSIS` · `14 COUNTRIES`

`assets/chap/ch01–ch11.mp4` are five-second cuts taken from `BASE_NEW_EDIT.mov` at those points;
`v1–v4.mp4` are the validation clips, cut from the testing sequence at 26–58 s.
Timestamps live in `chapters` in `js/data.js` — adjust `t` to move a marker, `f`/`p` to change
which clip and frame a tile shows.

**A note on `Revizyon2/`:** those ten named `.mov` files look like the chapter segments but are
the **graphics/overlay layers** — they transcode to near-black because most of each frame is
transparent. The finished footage only exists in the full film, which is why the chapter clips are
cut from it. If you have the graded masters as separate files, drop them in and update `f`.

### Video encoding

All video is encoded with macOS `avconvert` (no ffmpeg on this machine), sized to how each clip is
actually displayed rather than to a single blanket setting:

| Asset | Resolution | Why |
|---|---|---|
| `clip/drive · convoy · arctic` | 1280×720 | Hero background — the first thing anyone sees |
| `clip/transform · transform2 · zoomout · globe` | 960×540 | Sit behind heavy scrims, blur or type |
| `chap/ch01–ch11 · v1–v4` | 960×540 | Tiles render ~300 px; theatre tops out ~1500 px |
| `video/base-film` | 960×540 | Offline fallback only |

Everything is re-encoded **from the original masters** (`yeni_imagery/`, `BASE_NEW_EDIT.mov`), not
from the earlier derivatives, so there is no generation loss. Regenerate any of it from those
sources — `avconvert --source <master> --preset Preset960x540 --output <out> --replace`, adding
`--start` / `--duration` for the cuts (timestamps are in the chapter table above).

Avoid `PresetMediumQuality` / `PresetLowQuality` here: they look attractive on file size but
collapse the frame to 568×320 and 224×128 respectively, which is visibly soft full-bleed.

### The film — sourced from YouTube

The film section plays **[BASE Studio Introduction Movie](https://www.youtube.com/watch?v=gT2on5fzOis)**
(`gT2on5fzOis`) through the YouTube IFrame API, served from `youtube-nocookie.com`.

- YouTube's own controls are off (`controls:0`) so the site's chrome stays — play/pause, the scrub
  bar **with chapter markers**, elapsed/total, mute and full screen.
- The eleven chapter chips call `seekTo()`, so they still jump the film.
- The API script is only requested once the section approaches, not on page load.
- The YouTube cut is the same edit as the local file (138 s), so every chapter timestamp in
  `js/data.js` carries over unchanged.

**`assets/video/base-film.mp4` is now the offline fallback, not the primary source.** If the API
script is blocked or errors, the player switches to the local file and keeps every control working.
That matters here — defence networks routinely block youtube.com. The fallback is reversible: if
the API turns up late on a slow link, the YouTube player takes back over. Delete the local file only
if you are willing to lose that.

To change the video, edit `YT_ID` at the top of `film()` in `js/site.js`.

### The film file
`assets/video/base-film.mp4` is `BASE_NEW_EDIT.mov` transcoded to 720p H.264 (2:18, 124 MB).
To swap in a different cut:

```bash
avconvert --source "BASE_16:9_final.mov" --preset Preset1280x720 --output base-web/assets/video/base-film.mp4 --replace
```

124 MB is fine for a local presentation but heavy for hosting — re-encode at a lower bitrate
before putting this on a public server. The player has no chapter markers: the film's real
section timings are not documented anywhere I could verify, and inventing them would send a
viewer to the wrong place. Give me the timestamps and they take about a minute to add.

## Tab 02 — the proposal

Sections 01–22 follow the brief: The Challenge, The Idea, The Space (interactive 7 × 9.5 m
floor plan), The Experience, **The Interface (live prototype)**, Engineering View, Challenge
Mode, 100M+ KM, End of Experience, Lead Generation, Visitor Output, Passive Data Collection,
Identified Lead Data, Lead Intent, Live Dashboard, Sales View, Post-Event Output, Data Flow,
Experience Principle, Technical Architecture, Design Requirements, Final Message.

### The prototype (section 05)

The two LED walls are **one panorama split across two surfaces** — a single 2400 × 750
environment, with the left wall showing its left half and the right wall its right half, hinged
at a curved corner seam. Change anything on the touchscreen and both walls respond together.

Working interactions:

- **2 / 3 / 4 axle** → the platform on the wall becomes 4×4, 6×6 or 8×8
- **5 environments** → desert, arctic, forest, rock, mud, cross-fading across both walls
- **Mission requirements** → multi-select, drives the product recommendation
- **Engineering controls** → payload, gradient, terrain severity, temperature, traction
- **Engineering View** → body dissolves to wireframe; chassis, suspension, drive line, BASE
  axles and transfer case revealed with callouts
- **Challenge Mode** → severity drives wheel articulation, gradient tilts the platform,
  temperature colour-grades both walls, force/traction/articulation/load gauges respond
- **100M+ KM** → counter accelerates while the environment cycles through five terrains
- **COMPLETE** → 8-second cinematic takeover of both walls, then the next-action screen
- **Lead capture** → only after *Send my configuration* or *Talk to an engineer*
- **Mobility Profile** → personalised card with vehicle, spec, BASE recommendation and QR
- **Session panel** (right) → live anonymous event log and intent stage, so you can show
  exactly what data the experience produces while you use it

### Honest limits — stated in the UI, not hidden

- Force, traction, articulation and load readouts are **exhibition visualisations of
  engineering capability, not validated simulation output.** Labelled as such on screen.
- The **QR code is a visual placeholder**, not a scannable code. Swapping in a real encoder is
  a one-function change in `qrGraphic()` (`js/experience.js`) and `qrSample()` (`js/proposal.js`).
- **All dashboard and sales figures are demo data**, marked with a DEMO DATA badge.
- Product recommendations use a simple illustrative rule set in `recommend()`
  (`js/experience.js`) — to be replaced with BASE's validated selection rules.
- Badge scanning, CRM, email and analytics are presented as **candidate integrations**,
  subject to IDEX exhibitor technology / API availability and BASE IT confirmation.
- The consent statement is a **placeholder** to be adapted to BASE privacy requirements.
- Vehicles are deliberately **generic and anonymous** — BASE supplies drivetrain, not complete
  vehicles. The axle is the hero throughout.

### Editing the proposal copy

All wall headlines, the +100,000,000 km claim and the closing lines are marked `EDITABLE COPY`
in the presentation and live in plain text in `src/20-fair.html` and `js/experience.js`
(`paintHUD()`). Demo data for the dashboard and sales view is at the top of `js/dashboard.js`.

---

## Design system

Graphite / black / warm white, BASE blue `#046BD2` (taken from the live site) with a lighter
technical blue `#5BAEE0` for interface elements, and desert-brown / metallic bronze
`#C08B44` → `#E5B76E` reserved for the physical axles. Inter + IBM Plex Mono. Tokens are all in
`css/tokens.css`.

Responsive down to 375 px, but built landscape-first for a large touchscreen — on narrow
screens the LED walls drop their overlay copy and keep the environment and platform.
