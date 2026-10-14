# Isabella: Home (index.html) + Account (account.html)

## Your assignment
**Assigned to:** Isabella

**Your files:** `sandbox/index.html`, `sandbox/account.html`, `sandbox/css/isabella.css`, `sandbox/js/isabella.js`

**Page layout:** Home = hero banner + category tiles. Account = left sidebar profile + right-hand listings panel.

The starter pages already exist with working navigation, a shared look, and `TODO` comments. Open them in a browser first (double-click `sandbox/index.html`), then build on them.

## Required checklist (tick these off - this is the grade!)

### CSS & JS types
- [ ] **External CSS** is linked in `<head>` with `<link>` and has my styles
- [ ] **Internal CSS** is in a `<style>` block in `<head>`
- [ ] **Inline CSS** is used in at least one `style=""` attribute
- [ ] **External JS** is linked with `<script src="js/isabella.js">` and has my code

Specific tasks:
- [ ] **External** (`css/isabella.css`): style hero (background color/gradient, big text) and category tiles (hover effect).
- [ ] **Internal** (`<style>` in each of `index.html` and `account.html`): adjust the page layouts.
- [ ] **Inline** (`style="..."`): use on at least one element on each page.

### JavaScript
- [ ] In `js/isabella.js`, show a **time-based greeting** on the Home hero ("Good morning/afternoon/evening, Cardinal!") using `new Date().getHours()`.
- [ ] On Account, add an input + button to **add a new listing to `#myListings`** (`createElement` + `appendChild`).
- [ ] Add a **"Remove"** button on each saved/my listing item that deletes it from the list.

### Page content
- [ ] **Home:** add a **"Featured items"** row of 3 mini cards (images in `images/`) that link to `item.html`, and make each category tile a link to `listings.html`.
- [ ] **Account:** add a **"Saved items"** section (list) and a "Messages" section with 2-3 fake messages.

### Class-requirement items
- [ ] Page works with the **navigation** (every link in the header/footer goes to a real page)
- [ ] **Comments** added to my HTML, CSS and JS explaining what the code does
- [ ] At least one piece of code is a **modified example from class** (e.g. from `sayHello.js`, `DragAndDrop`, the sandbox `main.css`). Mention which in a comment.
- [ ] I can **explain** every line of HTML, CSS and JavaScript I wrote (5% of the grade)
- [ ] I have **2-3 screenshots** of my page/code for the PowerPoint (team deck)

## Rules so we don't break each other's work
- Only edit **your own files** (listed above). Do **not** edit `css/main.css` or `js/main.js` - ask the team first.
- Make a branch: `git checkout -b isabella-work`, commit often, and open a **Pull Request** into `main` when done. Link it with `Closes #<this issue number>`.
- Keep the nav links identical on every page.
- Folder layout must stay: `sandbox/` containing `css/`, `js/`, `images/` and the `.html` files.

## Stretch goals (optional, not required)
- Light/dark mode toggle button; count of items in My listings.

**Due:** _(put team deadline here)_
