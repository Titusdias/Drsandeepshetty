# TODO

- [x] Relax Zod schemas in admin editors so all fields are optional/allow empty strings and can be saved as partial data.

- [x] Update Hero editor schema (title/subtitle/tagline/ctaText/ctaLink/image URLs) to allow optional + empty.

- [x] Update Services editor schema (title/description/category) to allow optional + empty.

- [x] Update Testimonials editor schema (name/quote) to allow optional + empty.

- [x] Update About editor schema (title/subtitle/description/philosophy) to allow optional + empty.

- [x] Update SEO settings editor schema (all fields) to allow optional + empty.

- [x] Update Contact settings editor schema: make `name` and `phoneDisplay` optional + allow empty.

- [ ] Optionally update Gallery editor URL requiredness (only if requested; otherwise keep url required).
- [ ] After edits: run `npm run build` and fix any TS/Zod issues.

