# Nathan: Browse page (listings.html) - listing grid + search/filter

## Your assignment
**Assigned to:** Nathan

**Your files:** `sandbox/listings.html`, `sandbox/css/nathan.css`, `sandbox/js/nathan.js`

**Page layout:** Filter bar on top, then a CSS Grid of listing cards (like the Marketplace home feed).

The starter pages already exist with working navigation, a shared look, and `TODO` comments. Open them in a browser first (double-click `sandbox/index.html`), then build on them.

## Required checklist (tick these off - this is the grade!)

### CSS & JS types
- [ ] **External CSS** is linked in `<head>` with `<link>` and has my styles
- [ ] **Internal CSS** is in a `<style>` block in `<head>`
- [ ] **Inline CSS** is used in at least one `style=""` attribute
- [ ] **External JS** is linked with `<script src="js/nathan.js">` and has my code

Specific tasks:
- [ ] **External** (`css/nathan.css`): style the cards - hover effect (`:hover`), rounded corners, spacing, price color.
- [ ] **Internal** (`<style>` in `listings.html`): tweak the grid, e.g. change the `minmax(220px, ...)` size or add a sale-badge style.
- [ ] **Inline** (`style="..."`): use on at least one element, e.g. make one price red for a "sale".

### JavaScript
- [ ] In `js/nathan.js`, make the **search box** hide cards whose title doesn't contain the typed text (`input` event + `.includes()`).
- [ ] Make the **category dropdown** show only cards with the matching `data-category` (`change` event). "all" shows everything.
- [ ] Show a **"No items found"** message when nothing matches.

### Page content
- [ ] Add at least **6 listing cards** total (starter has 3; extra placeholder images are in `images/`: `hoodie.svg`, `mini-fridge.svg`, `desk-chair.svg`). Each needs an image, title, price, and a link to `item.html`.
- [ ] Give every card a `data-category` that matches the dropdown (`books`, `furniture`, `clothing`, `other`).

### Class-requirement items
- [ ] Page works with the **navigation** (every link in the header/footer goes to a real page)
- [ ] **Comments** added to my HTML, CSS and JS explaining what the code does
- [ ] At least one piece of code is a **modified example from class** (e.g. from `sayHello.js`, `DragAndDrop`, the sandbox `main.css`). Mention which in a comment.
- [ ] I can **explain** every line of HTML, CSS and JavaScript I wrote (5% of the grade)
- [ ] I have **2-3 screenshots** of my page/code for the PowerPoint (team deck)

## Rules so we don't break each other's work
- Only edit **your own files** (listed above). Do **not** edit `css/main.css` or `js/main.js` - ask the team first.
- Make a branch: `git checkout -b nathan-work`, commit often, and open a **Pull Request** into `main` when done. Link it with `Closes #<this issue number>`.
- Keep the nav links identical on every page.
- Folder layout must stay: `sandbox/` containing `css/`, `js/`, `images/` and the `.html` files.

## Stretch goals (optional, not required)
- Sort by price (low to high) button; show a result count ("3 items").

**Due:** _(put team deadline here)_
