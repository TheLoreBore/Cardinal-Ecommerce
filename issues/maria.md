# Maria: Item detail page (item.html) - gallery, details, seller contact

## Your assignment
**Assigned to:** Maria

**Your files:** `sandbox/item.html`, `sandbox/css/maria.css`, `sandbox/js/maria.js`

**Page layout:** Two columns: big image on the left, details on the right (stacks on phones - already set up).

The starter pages already exist with working navigation, a shared look, and `TODO` comments. Open them in a browser first (double-click `sandbox/index.html`), then build on them.

## Required checklist (tick these off - this is the grade!)

### CSS & JS types
- [ ] **External CSS** is linked in `<head>` with `<link>` and has my styles
- [ ] **Internal CSS** is in a `<style>` block in `<head>`
- [ ] **Inline CSS** is used in at least one `style=""` attribute
- [ ] **External JS** is linked with `<script src="js/maria.js">` and has my code

Specific tasks:
- [ ] **External** (`css/maria.css`): style thumbnails (size, border, `:hover` highlight) and the details panel.
- [ ] **Internal** (`<style>` in `item.html`): adjust the two-column ratio or spacing.
- [ ] **Inline**: the starter already has one inline `style` on the main image - add at least one more of your own.

### JavaScript
- [ ] In `js/maria.js`, clicking a **thumbnail swaps the main image** (`getElementById('mainImg').src = ...`).
- [ ] Clicking **Message seller** shows text in `#contactMsg` (e.g. "Message sent!") - the element is already there.
- [ ] **Save item** button toggles between "Save item" and "Saved" (change text + color).

### Page content
- [ ] Under the main image add a row of **3 thumbnail images** (use any images in `images/`).
- [ ] Add a details list (`<ul>`/`<dl>`): condition, category, pickup spot, date posted.
- [ ] Add a **"Save item"** button and (optional) a `<figure>` + `<figcaption>` around the main image.

### Class-requirement items
- [ ] Page works with the **navigation** (every link in the header/footer goes to a real page)
- [ ] **Comments** added to my HTML, CSS and JS explaining what the code does
- [ ] At least one piece of code is a **modified example from class** (e.g. from `sayHello.js`, `DragAndDrop`, the sandbox `main.css`). Mention which in a comment.
- [ ] I can **explain** every line of HTML, CSS and JavaScript I wrote (5% of the grade)
- [ ] I have **2-3 screenshots** of my page/code for the PowerPoint (team deck)

## Rules so we don't break each other's work
- Only edit **your own files** (listed above). Do **not** edit `css/main.css` or `js/main.js` - ask the team first.
- Make a branch: `git checkout -b maria-work`, commit often, and open a **Pull Request** into `main` when done. Link it with `Closes #<this issue number>`.
- Keep the nav links identical on every page.
- Folder layout must stay: `sandbox/` containing `css/`, `js/`, `images/` and the `.html` files.

## Stretch goals (optional, not required)
- Quantity/offer input that shows "Offer: $X sent"; image zoom on click.

**Due:** _(put team deadline here)_
