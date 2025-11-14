# Theme Switching Fix for Jekyll-Based Presentations

**Date**: 2025-11-14  
**Issue**: Theme switching via the menu plugin works in `thesis.html` but not in Jekyll-based presentations (`standardization-prototype.html` and `hanabi-challenge.html`)

## Root Cause

The menu plugin requires two things to enable theme switching:

1. A `themes` array in the menu configuration that lists all available themes with their paths
2. A theme `<link>` element with `id="theme"` so the plugin can dynamically swap themes

The `thesis.html` presentation had both of these, while the Jekyll-based presentations were missing the `themes` array configuration.

## Solution

### 1. Added Theme Configuration to Menu Plugin

Modified `_includes/presentation/scripts.html` to include a `themes` array in the menu configuration:

```javascript
themes: [
  { name: 'Black', theme: '{{ "/css/theme/black.css" | relative_url }}' },
  { name: 'White', theme: '{{ "/css/theme/white.css" | relative_url }}' },
  { name: 'League', theme: '{{ "/css/theme/league.css" | relative_url }}' },
  { name: 'Sky', theme: '{{ "/css/theme/sky.css" | relative_url }}' },
  { name: 'Beige', theme: '{{ "/css/theme/beige.css" | relative_url }}' },
  { name: 'Simple', theme: '{{ "/css/theme/simple.css" | relative_url }}' },
  { name: 'Serif', theme: '{{ "/css/theme/serif.css" | relative_url }}' },
  { name: 'Blood', theme: '{{ "/css/theme/blood.css" | relative_url }}' },
  { name: 'Night', theme: '{{ "/css/theme/night.css" | relative_url }}' },
  { name: 'Moon', theme: '{{ "/css/theme/moon.css" | relative_url }}' },
  { name: 'Solarized', theme: '{{ "/css/theme/solarized.css" | relative_url }}' }
]
```

### 2. Fixed Theme Link ID Attribute

Changed the theme `<link>` element ID from `reveal-theme` to `theme` in `_includes/presentation/head.html`:

```html
<link rel="stylesheet" href="..." id="theme">
```

This matches the ID that the Reveal.js menu plugin expects.

### 3. Ensured Custom Background Colors Work Across Themes

Added CSS rules to `css/presentations.css` to ensure that `data-background-color` attributes:
- Are properly applied across all themes using `!important` to override theme defaults
- Maintain proper text contrast (white text on dark backgrounds, black text on light backgrounds)

Moved the custom color CSS from `hanabi-challenge.html` to the global `presentations.css` file so all presentations benefit from proper color handling.

## Result

Theme switching should now work correctly in:
- `_presentations/standardization-prototype.html`
- `_presentations/hanabi-challenge.html`

And the custom background colors (blue, cyan, purple, green, yellow, red, black) will:
- Display correctly regardless of which theme is selected
- Maintain proper text readability with appropriate contrast

## Testing

To verify the fix:
1. Navigate to either presentation
2. Open the menu (click the menu icon in the bottom-left corner)
3. Select "Themes" from the menu
4. Try switching between different themes (White, Sky, League, etc.)
5. Verify that:
   - The theme changes correctly
   - Custom background colors on slides remain visible
   - Text remains readable on custom colored backgrounds

## Files Modified

- `_includes/presentation/scripts.html` - Added themes array to menu config
- `_includes/presentation/head.html` - Changed theme link ID from `reveal-theme` to `theme`
- `css/presentations.css` - Added global CSS rules for custom background colors
- `_presentations/hanabi-challenge.html` - Removed duplicate custom CSS styles
