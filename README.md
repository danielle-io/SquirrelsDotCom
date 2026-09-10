# SquirrelsDotCom

A fake squirrel store that exists to redirect people who ask to buy wild squirrels during live streams.

Visitors browse the "shop," add a squirrel to the cart, hit checkout, and instead of a payment form they land on a page explaining why squirrels don't belong in houses, what to do if they find a baby one, and how to support licensed rehabbers.

Support KL: https://linktr.ee/cookieKL

## Editing

- The "why squirrels make lousy pets" list is in `checkout.html`. Each point is an `<li class="reason">` with an emoji, an `<h3>` and a `<p>`.
- Photos go in `assets/`, then copy a `<figure class="shot">` block in the gallery section of `checkout.html`.
- Products are the `PRODUCTS` array at the top of `script.js`.
- Colors are the CSS variables at the top of `styles.css`.

## Publishing

Settings → Pages → Deploy from a branch → `main` / root.

Live at https://danielle-io.github.io/SquirrelsDotCom/

Photos used with permission. Nothing here is for sale.
