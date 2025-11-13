# Reveal.js Presentations Guide

## Overview

This repository hosts multiple presentations built with **reveal.js**, a powerful HTML presentation framework. These presentations are integrated into the Jekyll site and can be accessed directly via their URLs. This document explains how the presentations work, their structure, and how to create new ones.

## Table of Contents

1. [What is Reveal.js](#what-is-revealjs)
2. [Presentation Locations](#presentation-locations)
3. [Architecture & Structure](#architecture--structure)
4. [Creating a New Presentation](#creating-a-new-presentation)
5. [Jekyll-Based Presentations (NEW)](#jekyll-based-presentations-new)
6. [Features & Plugins](#features--plugins)
7. [Customization](#customization)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

## What is Reveal.js

**Reveal.js** (v3.5.0) is a framework for creating beautiful presentations using HTML, CSS, and JavaScript. Key features include:

- **Horizontal and vertical slides** for hierarchical navigation
- **Markdown support** for easy content creation
- **PDF export** via print-to-PDF
- **Speaker notes** and presenter mode
- **Code syntax highlighting**
- **Mathematical equations** via MathJax
- **Themes and transitions**
- **Plugins** (chalkboard, menu, notes, etc.)

## Presentation Locations

Presentations are organized in four main directories:

```
/workspace/
├── _presentations/             # NEW: Jekyll-based standardized presentations
│   └── standardization-prototype.html  # Template for new presentations
├── talks/                      # Main presentations/talks (legacy HTML)
│   ├── lessons.html           # Meme generation lessons (Spanish)
│   ├── thesis.html            # Thesis presentation (Spanish)
│   ├── eyes_on_bot.html       # Eyes on bot presentation
│   ├── onto_memes.html        # Onto memes presentation
│   └── material/
│       └── conv-demo.html     # Interactive convolution demo
├── stack/                      # Research project presentations (legacy HTML)
│   ├── hanabi/
│   │   └── hanabichallenge.html
│   ├── jumping_networks.html
│   ├── lin-sp-bp.html
│   ├── adversarial_opinion_dynamics.html
│   └── ...
└── course_slides/              # Course-related slides (legacy HTML)
    └── ml_centraal/
        └── demoday.html
```

**Note:** New presentations should use the Jekyll-based approach in `_presentations/`. Legacy presentations in `talks/`, `stack/`, and `course_slides/` remain as standalone HTML files.

## Architecture & Structure

### Basic HTML Structure

All reveal.js presentations follow a similar structure:

```html
<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Presentation Title</title>
    
    <!-- Meta tags -->
    <meta name="description" content="...">
    <meta name="author" content="AlOrozco53">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Reveal.js core CSS -->
    <link rel="stylesheet" href="../css/reveal.css">
    <link rel="stylesheet" href="../css/theme/white.css" id="theme">
    
    <!-- Code highlighting -->
    <link rel="stylesheet" href="../lib/css/zenburn.css">
    
    <!-- Print and PDF exports -->
    <script>
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = window.location.search.match(/print-pdf/gi) ? 
                    '../css/print/pdf.css' : '../css/print/paper.css';
        document.getElementsByTagName('head')[0].appendChild(link);
    </script>
</head>

<body>
    <div class="reveal">
        <div class="slides">
            <!-- Slides go here -->
            <section>
                <h1>Slide 1</h1>
            </section>
            <section>
                <h2>Slide 2</h2>
            </section>
        </div>
    </div>
    
    <!-- Reveal.js core JS -->
    <script src="../lib/js/head.min.js"></script>
    <script src="../js/reveal.js"></script>
    
    <!-- Configuration -->
    <script>
        Reveal.initialize({
            // Configuration options
        });
    </script>
</body>
</html>
```

### Path References

**CRITICAL:** Paths are relative to the HTML file's location. For example:

**File:** `/talks/lessons.html`
- CSS: `../css/reveal.css` (goes up one level to `/css/`)
- JS: `../js/reveal.js`
- Plugins: `../plugin/markdown/markdown.js`

**File:** `/stack/hanabi/hanabichallenge.html`
- CSS: `../../../css/reveal.css` (goes up three levels)
- JS: `../../../js/reveal.js`
- Plugins: `../../../plugin/markdown/markdown.js`

### Slide Organization

Slides use nested `<section>` tags:

```html
<!-- Horizontal slide -->
<section>
    <h2>Main Topic</h2>
</section>

<!-- Vertical slide group -->
<section>
    <section>
        <h2>Topic with sub-slides</h2>
    </section>
    <section>
        <h3>Sub-slide 1</h3>
    </section>
    <section>
        <h3>Sub-slide 2</h3>
    </section>
</section>
```

Navigation:
- **Left/Right arrows:** Navigate horizontal slides
- **Up/Down arrows:** Navigate vertical slides within a group

## Creating a New Presentation

### Step 1: Choose a Location

Decide where your presentation belongs:
- `/talks/` - General presentations/talks
- `/stack/` - Research projects
- `/course_slides/` - Course materials

### Step 2: Create HTML File

Create a new HTML file (e.g., `new-presentation.html`):

```bash
touch talks/new-presentation.html
```

### Step 3: Basic Template

Use this template as a starting point:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Your Presentation Title</title>
    <meta name="description" content="Presentation description">
    <meta name="author" content="AlOrozco53">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Adjust paths based on file location -->
    <link rel="stylesheet" href="../css/reveal.css">
    <link rel="stylesheet" href="../css/theme/white.css" id="theme">
    <link rel="stylesheet" href="../lib/css/zenburn.css">
    
    <script>
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = window.location.search.match(/print-pdf/gi) ? 
                    '../css/print/pdf.css' : '../css/print/paper.css';
        document.getElementsByTagName('head')[0].appendChild(link);
    </script>
</head>

<body>
    <div class="reveal">
        <div class="slides">
            <section>
                <h1>Your Title</h1>
                <p>Your Name</p>
            </section>
            
            <section>
                <h2>Slide 2</h2>
                <p>Content here</p>
            </section>
            
            <!-- Add more slides -->
        </div>
    </div>
    
    <script src="../lib/js/head.min.js"></script>
    <script src="../js/reveal.js"></script>
    
    <script>
        Reveal.initialize({
            controls: true,
            progress: true,
            history: true,
            center: true,
            transition: 'slide',
            
            dependencies: [
                { src: '../plugin/markdown/marked.js' },
                { src: '../plugin/markdown/markdown.js' },
                { src: '../plugin/highlight/highlight.js', async: true, 
                  callback: function() { hljs.initHighlightingOnLoad(); } },
                { src: '../plugin/zoom-js/zoom.js', async: true },
                { src: '../plugin/notes/notes.js', async: true }
            ]
        });
    </script>
</body>
</html>
```

### Step 4: Add Content

Add your slides within the `<div class="slides">` container:

```html
<!-- Title slide -->
<section>
    <h1>Presentation Title</h1>
    <h3>Subtitle</h3>
    <p>
        <small>Author Name | Date</small>
    </p>
</section>

<!-- Content slide -->
<section>
    <h2>Key Points</h2>
    <ul>
        <li>Point 1</li>
        <li>Point 2</li>
        <li>Point 3</li>
    </ul>
</section>

<!-- Image slide -->
<section>
    <h2>Visual Content</h2>
    <img src="../img/your-image.png" alt="Description" 
         style="border:none;" width="60%">
</section>

<!-- Code slide -->
<section>
    <h2>Code Example</h2>
    <pre><code class="python">
def hello_world():
    print("Hello, World!")
    </code></pre>
</section>
```

### Step 5: Test Locally

1. Start the Jekyll server:
   ```bash
   make run
   ```

2. Navigate to your presentation:
   ```
   http://localhost:4000/talks/new-presentation.html
   ```

3. Test navigation, features, and responsiveness

## Jekyll-Based Presentations (NEW)

### Overview

The new standardized approach uses Jekyll's layout system to create presentations. This method provides:

- **YAML-driven configuration** - Control all features from front matter
- **Consistent structure** - Reusable `reveal` layout with includes
- **Automatic plugin management** - Plugins loaded based on YAML settings
- **Menu integration** - Drawing tools, themes, and transitions in one place
- **Easier maintenance** - Update all presentations by changing layout files

### Creating a Jekyll Presentation

#### Step 1: Create Presentation File

Create a new file in `_presentations/` directory:

```bash
touch _presentations/my-presentation.html
```

#### Step 2: Add Front Matter and Content

Use this template:

```yaml
---
title: My Presentation Title
subtitle: Optional subtitle
reveal:
  # Core settings
  theme: night                    # Available: black, white, league, night, etc.
  transition: slide               # none, fade, slide, convex, concave, zoom
  backgroundTransition: fade
  controls: true
  progress: true
  history: true
  center: true
  
  # Menu plugin (provides navigation panel)
  menu: true
  menu_config:
    side: left                    # Menu position: left or right
    transitions: true             # Show transitions in menu
    openButton: true              # Show menu button
    
  # Drawing and whiteboard tools (chalkboard plugin)
  chalkboard: true
  chalkboard_config:
    theme: chalkboard             # chalkboard or whiteboard
    toggleChalkboardButton: true  # Show whiteboard toggle button
    toggleNotesButton: true       # Show drawing toggle button
  
  # Navigation bar
  home_link: true
  home_url: '/'
  home_label: 'Back to Home'
  links:
    - label: 'Project Page'
      url: '/projects/my-project/'
  logo: '/img/logo.png'           # Optional logo in navbar
  logo_alt: 'Logo'
  
  # Other plugins (all true by default)
  markdown: true                  # Markdown support
  highlight: true                 # Code syntax highlighting
  zoom: true                      # Alt+click to zoom
  notes: true                     # Speaker notes (press 'S')
  math: false                     # MathJax for equations (optional)
  
  # Math configuration (if math: true)
  math_config:
    mathjax: 'https://cdn.mathjax.org/mathjax/latest/MathJax.js'
    config: 'TeX-AMS_HTML-full'
---

<section data-background="#03040f">
  <h1>{{ page.title }}</h1>
  <p>{{ page.subtitle }}</p>
</section>

<section>
  <h2>Content Slide</h2>
  <ul>
    <li class="fragment">Point 1</li>
    <li class="fragment">Point 2</li>
  </ul>
</section>

<!-- Add more slides -->
```

### Drawing and Whiteboard Features

The chalkboard plugin provides two powerful annotation tools that can be configured via YAML:

#### Configuration Options

```yaml
reveal:
  chalkboard: true              # Enable/disable chalkboard features
  chalkboard_config:
    theme: chalkboard           # 'chalkboard' (chalk on black) or 'whiteboard' (marker on white)
    toggleChalkboardButton: true # Show whiteboard button (pencil-square icon)
    toggleNotesButton: true     # Show drawing button (pencil icon)
    src: "drawings.json"        # Optional: Load pre-recorded drawings
    readOnly: false             # Set to true to prevent changes to drawings
    transition: 800             # Transition duration in milliseconds
```

#### Using Drawing Tools

When `chalkboard: true`, you get two annotation modes:

**1. Drawing on Slides (Notes Canvas)**
- Click the pencil icon (<i class="fa fa-pencil"></i>) in the bottom-left corner
- Or press the **`c`** key
- Draw directly on the current slide to annotate content
- Drawings are slide-specific and persist when navigating back

**2. Full Whiteboard Mode (Chalkboard)**
- Click the pencil-square icon (<i class="fa fa-pencil-square-o"></i>) in the bottom-left corner
- Or press the **`b`** key
- Opens a blank canvas over your slides
- Perfect for working through problems or brainstorming

#### Keyboard Shortcuts

When chalkboard is enabled, these keyboard shortcuts are automatically configured:

| Key | Action |
|-----|--------|
| **`c`** | Toggle drawing on slides (notes canvas) |
| **`b`** | Toggle full whiteboard |
| **`DEL`** | Clear all drawings on current canvas |
| **`BACKSPACE`** | Reset drawings on current slide |
| **`d`** | Download drawings as JSON |

#### Menu Integration

With both `menu: true` and `chalkboard: true`, the drawing tools appear in the reveal menu under "Drawing Tools":

- Toggle drawing on slides
- Toggle whiteboard
- Clear drawings
- Reset slide drawings
- Download drawings

This provides an alternative to keyboard shortcuts and buttons.

#### Example: Presentation with Drawing Tools

```yaml
---
title: Interactive Lecture
reveal:
  theme: night
  menu: true
  menu_config:
    side: left
  chalkboard: true
  chalkboard_config:
    theme: chalkboard
    toggleChalkboardButton: true
    toggleNotesButton: true
---

<section>
  <h2>Work Through Example</h2>
  <p>Press <strong>b</strong> to open whiteboard and solve together</p>
</section>

<section>
  <h2>Diagram Explanation</h2>
  <img src="/img/diagram.png" alt="Diagram">
  <p><small>Press <strong>c</strong> to annotate this diagram</small></p>
</section>
```

### Available YAML Options Reference

#### Core Reveal.js Settings

```yaml
reveal:
  # Display
  theme: night                   # Theme name (see Customization section)
  transition: slide              # Transition style between slides
  backgroundTransition: fade     # Background transition style
  controls: true                 # Show navigation controls
  progress: true                 # Show progress bar
  history: true                  # Push to browser history
  center: true                   # Vertical centering
```

#### Plugin Settings

```yaml
  # Menu plugin
  menu: true                     # Enable menu (default: true)
  menu_config:
    side: left
    titleSelector: 'h1, h2, h3, h4, h5, h6'
    hideMissingTitles: false
    markers: false
    transitions: true
    openButton: true
    openSlideNumber: false
    keyboard: true
  
  # Chalkboard plugin (drawing tools)
  chalkboard: true               # Enable chalkboard (default: false)
  chalkboard_config:
    theme: chalkboard            # chalkboard or whiteboard
    toggleChalkboardButton: true
    toggleNotesButton: true
    src: null                    # Path to pre-recorded drawings
    readOnly: false
    transition: 800
  
  # Markdown support
  markdown: true                 # Enable markdown (default: true)
  
  # Code highlighting
  highlight: true                # Enable syntax highlighting (default: true)
  
  # Zoom plugin
  zoom: true                     # Alt+click to zoom (default: true)
  
  # Speaker notes
  notes: true                    # Enable notes (default: true)
  
  # Math equations
  math: false                    # Enable MathJax (default: false)
  math_config:
    mathjax: 'https://cdn.mathjax.org/mathjax/latest/MathJax.js'
    config: 'TeX-AMS_HTML-full'
```

#### Navigation Bar Settings

```yaml
  # Home link
  home_link: true
  home_url: '/'
  home_label: 'Back to Home'
  
  # Additional links
  links:
    - label: 'Link 1'
      url: '/path/to/page/'
    - label: 'Link 2'
      url: 'https://external-site.com'
  
  # Logo
  logo: '/img/logo.png'
  logo_alt: 'Logo text'
```

#### Advanced Settings

```yaml
  # Custom CSS files
  additional_css:
    - '/css/custom-presentation.css'
  
  # Custom JavaScript files
  additional_js:
    - '/js/custom-animations.js'
  
  # Custom plugin dependencies
  additional_dependencies:
    - "{ src: '/plugin/custom/plugin.js', async: true }"
  
  # Title footer
  title_footer: false
  
  # Extend reveal config with custom options
  extend:
    slideNumber: true
    showSlideNumber: 'all'
    autoSlide: 5000
```

### Jekyll vs. Legacy HTML Comparison

| Feature | Jekyll Approach | Legacy HTML |
|---------|----------------|-------------|
| Configuration | YAML front matter | JavaScript object |
| Plugin loading | Automatic based on YAML | Manual dependency array |
| Navigation | Standardized navbar include | Custom per-file |
| Menu integration | Auto-integrated drawing tools | Manual configuration |
| Maintenance | Update layout affects all | Update each file |
| Reusability | High (shared layout) | Low (copy-paste) |
| Learning curve | YAML + minimal HTML | Full reveal.js config |

### Migrating Legacy Presentations

To migrate a presentation from legacy HTML to Jekyll:

1. **Extract content slides**
   - Copy everything inside `<div class="slides">...</div>`

2. **Convert configuration to YAML**
   - Map JavaScript config to YAML front matter
   - Use available options reference above

3. **Update paths**
   - Images: Keep absolute paths from site root (`/img/...`)
   - No need to update CSS/JS plugin paths (handled by layout)

4. **Test locally**
   - Save as `_presentations/my-presentation.html`
   - Visit `http://localhost:4000/presentations/my-presentation.html`

**Example migration:**

**Before (legacy HTML):**
```html
<script>
Reveal.initialize({
  theme: 'night',
  transition: 'slide',
  menu: {
    side: 'left',
    transitions: true
  },
  dependencies: [
    { src: '../plugin/menu/menu.js' },
    { src: '../plugin/chalkboard/chalkboard.js' }
  ]
});
</script>
```

**After (Jekyll YAML):**
```yaml
---
reveal:
  theme: night
  transition: slide
  menu: true
  menu_config:
    side: left
    transitions: true
  chalkboard: true
---
```

## Features & Plugins

### Active Plugins in This Repository

Most presentations use these plugins:

#### 1. **Markdown Support**
```javascript
dependencies: [
    { src: '../plugin/markdown/marked.js' },
    { src: '../plugin/markdown/markdown.js' }
]
```

Use markdown in slides:
```html
<section data-markdown>
    <textarea data-template>
        ## Slide Title
        - Point 1
        - Point 2
    </textarea>
</section>
```

#### 2. **Code Highlighting**
```javascript
{ src: '../plugin/highlight/highlight.js', async: true,
  callback: function() { hljs.initHighlightingOnLoad(); } }
```

Syntax highlighting for code blocks (supports many languages).

#### 3. **MathJax (Mathematical Equations)**
```javascript
math: {
    mathjax: 'https://cdn.mathjax.org/mathjax/latest/MathJax.js',
    config: 'TeX-AMS_HTML-full'
},
dependencies: [
    { src: '../plugin/math/math.js', async: true }
]
```

Use LaTeX in slides:
```html
<section>
    <p>Inline: $E = mc^2$</p>
    <p>Display: $$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$</p>
</section>
```

#### 4. **Speaker Notes**
```javascript
{ src: '../plugin/notes/notes.js', async: true }
```

Add notes (press 'S' to open speaker view):
```html
<section>
    <h2>Slide Content</h2>
    <aside class="notes">
        These are speaker notes, only visible in presenter mode.
    </aside>
</section>
```

#### 5. **Chalkboard Plugin**
```javascript
{ src: '../plugin/chalkboard/chalkboard.js' }
```

Draw on slides during presentation:
- Press **'B'** to toggle chalkboard
- Press **'C'** to toggle notes canvas
- Press **'DEL'** to clear
- Press **'D'** to download drawing

Configuration:
```javascript
chalkboard: {
    src: "chalkboard.json",  // Load pre-recorded drawing
},
keyboard: {
    67: function() { RevealChalkboard.toggleNotesCanvas() },
    66: function() { RevealChalkboard.toggleChalkboard() },
    46: function() { RevealChalkboard.clear() },
    8: function() { RevealChalkboard.reset() },
    68: function() { RevealChalkboard.download() }
}
```

#### 6. **Menu Plugin**
```javascript
{ src: '../plugin/menu/menu.js' }
```

Adds a menu for navigation and theme switching:
```javascript
menu: {
    side: 'left',
    numbers: false,
    titleSelector: 'h1, h2, h3, h4, h5, h6',
    themes: [
        { name: 'Black', theme: '../css/theme/black.css' },
        { name: 'White', theme: '../css/theme/white.css' },
        { name: 'League', theme: '../css/theme/league.css' },
        // ... more themes
    ],
    transitions: true,
    openButton: true,
    keyboard: true
}
```

#### 7. **Zoom Plugin**
```javascript
{ src: '../plugin/zoom-js/zoom.js', async: true }
```

Hold **Alt** (or **Ctrl/Cmd** on Mac) and click to zoom into any element.

### Special Slide Attributes

#### Background Images
```html
<section data-background-image="../img/background.jpg">
    <h2>Text over image</h2>
</section>
```

#### Background Colors
```html
<section data-background-color="rgb(255,255,0)">
    <h2>Yellow background</h2>
</section>
```

#### Menu Titles
```html
<section data-menu-title="Custom Menu Title">
    <h2>Slide Title</h2>
</section>
```

#### Transitions
```html
<section data-transition="zoom">
    <h2>This slide zooms in</h2>
</section>
```

Available transitions: `none`, `fade`, `slide`, `convex`, `concave`, `zoom`

#### Fragments (Progressive Reveal)
```html
<section>
    <p class="fragment">Appears first</p>
    <p class="fragment">Appears second</p>
    <p class="fragment">Appears third</p>
</section>
```

Fragment styles: `fade-in`, `fade-out`, `fade-up`, `current-visible`, `highlight-red`

## Customization

### Themes

Available themes (in `/css/theme/`):
- black
- white
- league
- sky
- beige
- simple
- serif
- blood
- night
- moon
- solarized

Change theme in HTML:
```html
<link rel="stylesheet" href="../css/theme/night.css" id="theme">
```

### Configuration Options

Common `Reveal.initialize()` options:

```javascript
Reveal.initialize({
    // Display controls in bottom-right corner
    controls: true,
    
    // Display a presentation progress bar
    progress: true,
    
    // Push each slide change to browser history
    history: true,
    
    // Enable keyboard shortcuts
    keyboard: true,
    
    // Enable overview mode
    overview: true,
    
    // Vertical centering of slides
    center: true,
    
    // Enable touch navigation on mobile
    touch: true,
    
    // Loop the presentation
    loop: false,
    
    // Change presentation direction (rtl/ltr)
    rtl: false,
    
    // Enable slide navigation via mouse wheel
    mouseWheel: false,
    
    // Transition style
    transition: 'slide', // none/fade/slide/convex/concave/zoom
    
    // Transition speed
    transitionSpeed: 'default', // default/fast/slow
    
    // Slide width/height
    width: 960,
    height: 700,
    
    // Factor of display size for scaling
    margin: 0.1,
    minScale: 0.2,
    maxScale: 1.5
});
```

### Custom CSS

Add custom styles in the `<head>`:

```html
<style>
    .reveal h1 {
        color: #ff0000;
    }
    .reveal .slides section .fragment.highlight-red {
        color: #ff0000;
    }
    .custom-class {
        font-size: 2em;
        font-weight: bold;
    }
</style>
```

## Best Practices

### 1. File Organization
- Keep related presentations in appropriate directories
- Use subdirectories for supporting materials (like `talks/material/`)
- Store images in `/img/` with descriptive names

### 2. Path Management
- **Always use relative paths** from the HTML file location
- Test paths by loading the presentation locally
- Use consistent path patterns across presentations

### 3. Content Design
- **One idea per slide** - don't overcrowd
- Use **large fonts** (minimum 24pt for body text)
- Include **visual elements** (images, diagrams, code)
- Keep **bullet points concise** (3-5 words max)
- Use **speaker notes** for detailed talking points

### 4. Performance
- **Optimize images** before adding (compress, resize)
- **Lazy load** plugins with `async: true`
- Avoid embedding **large videos** directly (use links)
- Test presentation on **different devices/browsers**

### 5. Accessibility
- Use **semantic HTML** (`<h1>`, `<h2>`, etc.)
- Add **alt text** to all images
- Ensure **sufficient color contrast**
- Test **keyboard navigation**

### 6. Version Control
- Commit presentations as **complete units** (HTML + assets)
- Use **descriptive commit messages**
- Tag **important versions** (e.g., "conference-2024")

### 7. Export to PDF
Add `?print-pdf` to the URL and print:
```
http://localhost:4000/talks/presentation.html?print-pdf
```

Then use browser's Print → Save as PDF (Chrome recommended).

## Troubleshooting

### Issue 1: Presentation Not Loading

**Symptoms:** Blank page or "reveal.js not found" error

**Solutions:**
1. Check file paths in HTML (especially `../css/reveal.css` and `../js/reveal.js`)
2. Verify files exist at the referenced paths
3. Check browser console for 404 errors
4. Ensure Jekyll server is running

### Issue 2: Plugins Not Working

**Symptoms:** No syntax highlighting, math not rendering, menu missing

**Solutions:**
1. Verify plugin paths in `dependencies` array
2. Check browser console for plugin loading errors
3. Ensure plugins are loaded **before** `Reveal.initialize()`
4. Some plugins require specific initialization options

### Issue 3: Images Not Displaying

**Symptoms:** Broken image icons or missing visuals

**Solutions:**
1. Check image path relative to HTML file
2. Verify image file exists in `/img/` directory
3. Check file name case sensitivity (Linux/Mac are case-sensitive)
4. Ensure image format is web-compatible (PNG, JPG, GIF, SVG)

### Issue 4: Math Equations Not Rendering

**Symptoms:** Raw LaTeX code visible instead of formatted equations

**Solutions:**
1. Ensure MathJax CDN is accessible (check network tab)
2. Verify math plugin is loaded in dependencies
3. Check MathJax configuration in `Reveal.initialize()`
4. Use correct delimiters: `$...$` (inline) or `$$...$$` (display)

### Issue 5: Slides Cut Off or Misaligned

**Symptoms:** Content extends beyond slide boundaries

**Solutions:**
1. Adjust width/height in `Reveal.initialize()`
2. Use responsive units (%, em) instead of fixed pixels
3. Test on target display size/resolution
4. Use `style="width: 80%"` on large images
5. Check CSS conflicting with reveal.js styles

### Issue 6: PDF Export Issues

**Symptoms:** PDF looks different from browser view

**Solutions:**
1. Use Chrome for best PDF export results
2. Add `?print-pdf` to URL before printing
3. Wait for all content to load before printing
4. Use "Save as PDF" in print dialog (not print to physical printer)
5. Adjust print settings: landscape, no headers/footers

### Issue 7: Embedded iframes Not Working

**Symptoms:** Embedded demos or videos don't display

**Solutions:**
1. Check iframe `src` path (relative to HTML file)
2. Ensure iframe has explicit width/height
3. Some sites block iframe embedding (check console for X-Frame-Options errors)
4. Test iframe content separately

Example from `lessons.html`:
```html
<section data-background-color="rgb(255,255,255)">
    <div class="fig figcenter fighighlight">
        <iframe src="material/conv-demo.html" 
                width="100%" height="700px" style="border:none;">
        </iframe>
    </div>
</section>
```

## Advanced Topics

### Custom Keyboard Shortcuts

```javascript
keyboard: {
    // Key code: function
    67: function() { /* Custom action for 'C' key */ },
    13: 'next', // Enter goes to next slide
    32: 'next'  // Space goes to next slide
}
```

### Custom Events

```javascript
Reveal.addEventListener('slidechanged', function(event) {
    console.log('Slide changed to:', event.indexh, event.indexv);
});

Reveal.addEventListener('ready', function(event) {
    console.log('Presentation ready');
});
```

### Programmatic Navigation

```javascript
Reveal.slide(2);           // Go to slide 2
Reveal.slide(2, 1);        // Go to horizontal 2, vertical 1
Reveal.next();             // Next slide
Reveal.prev();             // Previous slide
Reveal.navigateRight();    // Right (horizontal)
Reveal.navigateDown();     // Down (vertical)
```

## Resources

- **Reveal.js Documentation:** https://revealjs.com/
- **Reveal.js GitHub:** https://github.com/hakimel/reveal.js
- **MathJax Documentation:** https://docs.mathjax.org/
- **Highlight.js Languages:** https://highlightjs.org/static/demo/

## Examples in This Repository

Study these presentations as references:

1. **`talks/lessons.html`**
   - Full-featured presentation
   - Chalkboard and menu plugins
   - Embedded iframe demo
   - Custom themes configuration

2. **`talks/thesis.html`**
   - Academic presentation structure
   - Mathematical equations (MathJax)
   - Vertical slide navigation
   - Image-heavy content

3. **`stack/hanabi/hanabichallenge.html`**
   - Notebook-style presentation
   - Bootstrap integration
   - Custom styling
   - Deep nested paths

---

**Last Updated:** 2025-11-11
**Reveal.js Version:** 3.5.0
**Maintainer:** AlOrozco53
