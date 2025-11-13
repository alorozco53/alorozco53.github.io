---
layout: page
title: Presentation Standardization Prototype Log
subtitle: Tracking the initial Reveal.js layout consolidation work
permalink: /debug/2025-11-13T054059Z-standardizing-presentation-prototype/
---

## Summary

- Set up a dedicated `presentations` collection in Jekyll so decks can inherit shared behaviour.
- Added a reusable `reveal` layout, plus supporting includes for head tags, navigation chrome, and script initialization.
- Introduced `css/presentations.css` for the fixed presentation chrome and typography tweaks.
- Shipped a prototype deck (`standardization-prototype`) to validate the layout before migrating existing presentations.
- Highlighted the prototype from the homepage for quick feedback loops.

## Notes

- Default plugin stack: menu, notes, highlight, zoom. Toggle via front matter (`reveal.highlight: false`, etc.).
- Navigation chrome currently includes a home link, optional quick links, and optional logo branding.
- Future tasks: evaluate print/PDF styles, add home button iconography, and migrate legacy decks iteratively.
