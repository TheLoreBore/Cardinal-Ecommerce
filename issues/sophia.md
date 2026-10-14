# Sophia: Sell page (sell.html) - post-an-item form + live preview

## Your assignment
**Assigned to:** Sophia

**Your files:** `sandbox/sell.html`, `sandbox/css/sophia.css`, `sandbox/js/sophia.js`

**Page layout:** One centered form card with a preview card underneath.

The starter pages already exist with working navigation, a shared look, and `TODO` comments. Open them in a browser first (double-click `sandbox/index.html`), then build on them.

## Required checklist (tick these off - this is the grade!)

### CSS & JS types
- [ ] **External CSS** is linked in `<head>` with `<link>` and has my styles
- [ ] **Internal CSS** is in a `<style>` block in `<head>`
- [ ] **Inline CSS** is used in at least one `style=""` attribute
- [ ] **External JS** is linked with `<script src="js/sophia.js">` and has my code

Specific tasks:
- [ ] **External** (`css/sophia.css`): style the form - input borders, focus color (`:focus`), button hover, spacing.
- [ ] **Internal** (`<style>` in `sell.html`): adjust the form width/layout.
- [ ] **Inline** (`style="..."`): use on at least one element, e.g. color a hint/help text under a field.

### JavaScript
- [ ] In `js/sophia.js`, listen for the form's `submit` event and call `event.preventDefault()`.
- [ ] **Validate**: title not empty, price is a number > 0. If invalid, show a red error message under the form (no `alert()`).
- [ ] If valid, **fill the Preview card** with the title, price, category, condition and description the user typed.
- [ ] Clear the form after posting.

### Page content
- [ ] Add form fields: **condition** (radio buttons: New / Like new / Used), **contact method** (dropdown), and a **"I agree to meet on campus"** checkbox.
- [ ] Use proper `<label>`s and `required` on important fields.

### Class-requirement items
- [ ] Page works with the **navigation** (every link in the header/footer goes to a real page)
- [ ] **Comments** added to my HTML, CSS and JS explaining what the code does
- [ ] At least one piece of code is a **modified example from class** (e.g. from `sayHello.js`, `DragAndDrop`, the sandbox `main.css`). Mention which in a comment.
- [ ] I can **explain** every line of HTML, CSS and JavaScript I wrote (5% of the grade)
- [ ] I have **2-3 screenshots** of my page/code for the PowerPoint (team deck)

## Rules so we don't break each other's work
- Only edit **your own files** (listed above). Do **not** edit `css/main.css` or `js/main.js` - ask the team first.
- Make a branch: `git checkout -b sophia-work`, commit often, and open a **Pull Request** into `main` when done. Link it with `Closes #<this issue number>`.
- Keep the nav links identical on every page.
- Folder layout must stay: `sandbox/` containing `css/`, `js/`, `images/` and the `.html` files.

## Stretch goals (optional, not required)
- Update the preview *while typing* (`input` event); character counter on the description.

**Due:** _(put team deadline here)_
