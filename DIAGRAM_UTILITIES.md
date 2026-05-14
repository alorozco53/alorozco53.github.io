# Diagram Generation Utilities for Reveal.js Presentations

## Executive Summary

Your current reveal.js setup **does not have native diagram generation support**, but the infrastructure is already in place to integrate multiple diagram libraries. The reveal.js layout system supports `additional_js`, `additional_css`, and `additional_dependencies` in YAML front matter, making integration straightforward.

## Available Integration Options

### 1. Mermaid.js ⭐ **RECOMMENDED**

**What it is:** JavaScript-based diagramming tool with text-based syntax for creating flowcharts, sequence diagrams, Gantt charts, class diagrams, state diagrams, and more.

**Pros:**
- Text-based syntax (works great with Markdown)
- Wide variety of diagram types
- Active community and good documentation
- Can be integrated via CDN (no local files needed)
- Works well with Jekyll/Markdown workflows

**Cons:**
- Requires adding a plugin or manual integration
- Some complex diagrams may need tweaking

**Integration Method:**
- **Option A:** Use [reveal.js-mermaid-plugin](https://github.com/ludwick/reveal.js-mermaid-plugin)
- **Option B:** Manual integration via CDN + custom initialization

**Example Usage:**
```yaml
---
reveal:
  additional_js:
    - 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js'
  additional_dependencies:
    - "{ src: 'https://cdn.jsdelivr.net/npm/reveal.js-mermaid-plugin@latest/dist/reveal.js-mermaid-plugin.js', async: true }"
---
```

```html
<section>
  <div class="mermaid">
    graph TD
      A[Start] --> B{Decision}
      B -->|Yes| C[Action 1]
      B -->|No| D[Action 2]
  </div>
</section>
```

**Resources:**
- [Mermaid.js Documentation](https://mermaid.js.org/)
- [reveal.js-mermaid-plugin](https://github.com/ludwick/reveal.js-mermaid-plugin)
- [Mermaid Live Editor](https://mermaid.live/)

---

### 2. Manim Slides 🎬 **FOR ANIMATIONS**

**What it is:** Python package that creates presentations using Manim (Mathematical Animation Engine) animations within reveal.js. Manim is the tool used by 3Blue1Brown for their educational videos.

**Pros:**
- **High-quality mathematical animations** - Perfect for complex visualizations
- **Python-based workflow** - Good for data science/research presentations
- **Can export to reveal.js HTML** - Compatible with your setup
- **Supports both Manim Community Edition and ManimGL**
- **Live presentation mode** - Interactive during talks

**Cons:**
- **Requires Python environment** - Additional dependency
- **Learning curve** - Manim has its own syntax
- **Rendering time** - Animations need to be pre-rendered
- **File size** - Video files can be large
- **Not for static diagrams** - Better for animated content

**Workflow:**
1. Write Python code with Manim to create animations
2. Use `manim-slides` to organize animations into slides
3. Export to reveal.js HTML format
4. Embed in your Jekyll site

**Installation:**
```bash
pip install manim-slides
# or
pip install manim  # Community Edition
pip install manimgl  # ManimGL
```

**Example Workflow:**
```python
# my_presentation.py
from manim import *
from manim_slides import Slide

class MySlide(Slide):
    def construct(self):
        # Create Manim animation
        circle = Circle()
        self.play(Create(circle))
        self.next_slide()  # Move to next slide
```

**Export to reveal.js:**
```bash
manim-slides convert my_presentation.py MyPresentation
# Generates HTML files compatible with reveal.js
```

**Integration with Your Site:**
- Export Manim Slides to HTML
- Copy generated files to `_presentations/` or appropriate directory
- Or embed Manim-rendered videos in existing reveal.js slides

**Resources:**
- [Manim Slides Documentation](https://manim-slides.eertmans.be/latest/)
- [Manim Community Edition](https://www.manim.community/)
- [ManimGL](https://github.com/3b1b/manim)
- [Example Gallery](https://manim-slides.eertmans.be/latest/examples.html)

**Best Use Cases:**
- Mathematical proofs and visualizations
- Complex algorithm explanations
- Data science presentations with animated plots
- Educational content requiring step-by-step visualizations

---

### 3. D3.js 📊 **ALREADY AVAILABLE**

**What it is:** Powerful JavaScript library for data-driven visualizations. You already have `d3.min.js` in your `js/` directory.

**Pros:**
- **Already in your repository** (`js/d3.min.js`)
- **Extremely flexible** - Can create any visualization
- **Interactive capabilities** - Great for dynamic charts
- **Large ecosystem** - Many examples and plugins

**Cons:**
- **Steep learning curve** - Requires JavaScript knowledge
- **Time-consuming** - Not declarative like Mermaid
- **Not integrated** - Currently only used in one standalone demo

**Integration Options:**
- **Option A:** Use [reveal.js-d3 plugin](https://gcalmettes.github.io/reveal.js-d3/) for easier integration
- **Option B:** Manual integration with custom JavaScript

**Current Usage:**
- Used in `talks/material/conv-demo.html` for interactive convolution visualization
- Not integrated into the reveal.js layout system

**Example Integration:**
```yaml
---
reveal:
  additional_js:
    - '/js/d3.min.js'
---
```

```html
<section>
  <div id="d3-visualization"></div>
  <script>
    // D3.js code here
    var svg = d3.select("#d3-visualization")
      .append("svg")
      .attr("width", 500)
      .attr("height", 300);
    // ... more D3 code
  </script>
</section>
```

**Resources:**
- [D3.js Documentation](https://d3js.org/)
- [reveal.js-d3 Plugin](https://gcalmettes.github.io/reveal.js-d3/)
- [D3.js Gallery](https://observablehq.com/@d3/gallery)

---

### 4. Chart.js 📈 **FOR CHARTS**

**What it is:** Simple yet flexible JavaScript charting library for line charts, bar charts, pie charts, etc.

**Pros:**
- **Easy to use** - Simple API
- **Good for standard charts** - Bar, line, pie, etc.
- **Interactive** - Hover effects, animations
- **Lightweight** - Smaller than D3.js

**Cons:**
- **Limited to charts** - Not for flowcharts or complex diagrams
- **Less flexible** than D3.js

**Integration:**
- Can use [reveal.js-plugins Chart plugin](https://rajgoel.github.io/reveal.js-plugins/)

**Example:**
```yaml
---
reveal:
  additional_js:
    - 'https://cdn.jsdelivr.net/npm/chart.js@latest'
---
```

```html
<section>
  <canvas id="myChart"></canvas>
  <script>
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: { /* ... */ }
    });
  </script>
</section>
```

---

### 5. PlantUML 🔷 **FOR UML DIAGRAMS**

**What it is:** Text-based UML diagram generator, good for software architecture diagrams.

**Pros:**
- **Text-based syntax** - Similar to Mermaid
- **Great for UML** - Class diagrams, sequence diagrams, etc.
- **Widely used** - Good documentation

**Cons:**
- **Requires server or client-side renderer** - More setup
- **Primarily for UML** - Less versatile than Mermaid
- **Less common** - Smaller community than Mermaid

**Integration:**
- Use [reveal-plantuml plugin](https://reveal-plantuml.github.io/)

**Resources:**
- [PlantUML Documentation](http://plantuml.com/)
- [reveal-plantuml Plugin](https://reveal-plantuml.github.io/)

---

### 6. Graphviz (via Viz.js) 🔗 **FOR GRAPH DIAGRAMS**

**What it is:** Graph visualization tool using DOT language. Can be used via Viz.js (JavaScript port).

**Pros:**
- **Powerful for graphs** - Excellent for network diagrams
- **DOT language** - Text-based graph description
- **Mature tool** - Well-established

**Cons:**
- **Less common** - Smaller community
- **Requires Viz.js** - Additional dependency
- **Primarily for graphs** - Less versatile

**Integration:**
- Use Viz.js (JavaScript port of Graphviz)

**Resources:**
- [Graphviz Documentation](https://graphviz.org/)
- [Viz.js](https://github.com/mdaines/viz.js)

---

## Comparison Matrix

| Utility | Best For | Learning Curve | Integration Effort | File Size | Interactivity |
|---------|----------|----------------|-------------------|-----------|---------------|
| **Mermaid.js** | Flowcharts, sequence diagrams, general diagrams | Low | Low | Small | Medium |
| **Manim Slides** | Mathematical animations, complex visualizations | High | Medium | Large (videos) | High |
| **D3.js** | Custom interactive visualizations | High | Medium | Medium | Very High |
| **Chart.js** | Standard charts (bar, line, pie) | Low | Low | Small | Medium |
| **PlantUML** | UML diagrams, software architecture | Medium | Medium | Small | Low |
| **Graphviz** | Network graphs, tree structures | Medium | Medium | Medium | Low |

---

## Recommendations

### For Your Use Case (Academic/Research Presentations)

**Primary Recommendation: Mermaid.js**
- Addresses most of your diagram placeholder needs
- Works well with Markdown/Jekyll workflow
- Easy to learn and integrate
- Good for flowcharts, architecture diagrams, and sequence diagrams

**Secondary Recommendation: Manim Slides**
- Perfect for mathematical/algorithmic content
- High-quality animations for complex concepts
- Good fit for research presentations
- Can complement Mermaid for animated content

**Tertiary: D3.js Integration**
- Already available in your repo
- Good for custom interactive visualizations
- Use when Mermaid/Manim aren't sufficient

### Integration Priority

1. **Start with Mermaid.js** - Quickest win, addresses most needs
2. **Evaluate Manim Slides** - If you need mathematical animations
3. **Integrate D3.js properly** - For custom visualizations

---

## Next Steps

### Option 1: Quick Start with Mermaid.js

1. Add Mermaid.js via CDN to your presentation layout
2. Create example presentation with diagrams
3. Update PRESENTATIONS.md with usage examples

### Option 2: Full Integration

1. Add Mermaid.js support to reveal.js layout
2. Add Manim Slides workflow documentation
3. Integrate D3.js into layout system
4. Create example presentations for each

### Option 3: Hybrid Approach

1. Use Mermaid.js for static diagrams
2. Use Manim Slides for animated content (exported separately)
3. Keep D3.js for custom interactive demos

---

## Current Infrastructure

Your reveal.js setup already supports integration via:

```yaml
reveal:
  additional_js:          # For external JavaScript libraries
    - '/path/to/library.js'
  additional_css:        # For external CSS
    - '/path/to/styles.css'
  additional_dependencies: # For reveal.js plugins
    - "{ src: '/plugin/plugin.js', async: true }"
```

This means you can add diagram libraries **without modifying core layout files**.

---

## References

- [Mermaid.js](https://mermaid.js.org/)
- [Manim Slides Documentation](https://manim-slides.eertmans.be/latest/)
- [reveal.js-mermaid-plugin](https://github.com/ludwick/reveal.js-mermaid-plugin)
- [reveal.js-d3 Plugin](https://gcalmettes.github.io/reveal.js-d3/)
- [Manim Community Edition](https://www.manim.community/)
- [Chart.js](https://www.chartjs.org/)
- [PlantUML](http://plantuml.com/)

---

**Last Updated:** 2025-01-XX
**Status:** Investigation Complete - Ready for Implementation

