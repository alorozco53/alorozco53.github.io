# Repository Usage Guide

## Overview

This repository contains the source code for a personal academic website hosted at [https://alorozco53.github.io](https://alorozco53.github.io). The site is built using **Jekyll**, a static site generator, with the **Beautiful Jekyll** theme. It includes academic content, publications, blog posts, presentations (using reveal.js), and various research projects.

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Repository Structure](#repository-structure)
3. [Getting Started](#getting-started)
4. [Development Workflows](#development-workflows)
5. [Configuration](#configuration)
6. [Content Management](#content-management)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

## Technology Stack

- **Jekyll** (v3.8+): Static site generator
- **Beautiful Jekyll**: Base theme
- **Ruby** & **Bundler**: Dependency management
- **reveal.js** (v3.5.0): Presentation framework
- **Docker**: Containerized development environment
- **GitHub Pages**: Hosting platform

## Repository Structure

```
/workspace/
├── _config.yml              # Main Jekyll configuration
├── _config.dev.yml          # Development-specific config overrides
├── _data/                   # Data files (YAML)
│   ├── SocialNetworks.yml   # Social media links configuration
│   └── ui-text.yml          # UI text strings
├── _includes/               # Reusable HTML components
│   ├── head.html            # HTML head section
│   ├── nav.html             # Navigation bar
│   ├── footer.html          # Footer
│   └── ...                  # Other includes
├── _layouts/                # Page templates
│   ├── default.html         # Default layout
│   ├── page.html            # Page layout
│   ├── post.html            # Blog post layout
│   └── course.html          # Course-specific layout
├── _posts/                  # Blog posts (Markdown)
│   └── YYYY-MM-DD-title.md
├── css/                     # Stylesheets
│   ├── main.css             # Main stylesheet
│   ├── reveal.css           # Reveal.js styles
│   └── theme/               # Reveal.js themes
├── js/                      # JavaScript files
├── lib/                     # Third-party libraries
├── plugin/                  # Reveal.js plugins
├── img/                     # Images and media
├── talks/                   # Reveal.js presentations
├── stack/                   # Research projects presentations
├── course_slides/           # Course presentations
├── paper_reviews/           # Paper review content
├── publications.md          # Publications page
├── aboutme.md              # About page
├── index.html              # Homepage
├── Gemfile                 # Ruby dependencies
├── Makefile                # Build automation
├── Dockerfile              # Docker build configuration
└── docker-compose.yml      # Docker Compose configuration
```

## Getting Started

### Prerequisites

Choose one of the following setups:

**Option A: Docker (Recommended)**
- Docker installed on your machine
- Docker Compose (optional, but convenient)

**Option B: Local Ruby Environment**
- Ruby (2.5 or higher)
- Bundler gem
- Node.js (for reveal.js dependencies)

### Installation

#### Using Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AlOrozco53/alorozco53.github.io.git
   cd alorozco53.github.io
   ```

2. **Build and run with Docker:**
   ```bash
   docker build -t beautiful-jekyll .
   docker run -d -p 4000:4000 --name beautiful-jekyll -v "$PWD":/srv/jekyll beautiful-jekyll
   ```

3. **Access the site:**
   Open your browser and navigate to [http://localhost:4000/](http://localhost:4000/)

4. **Using Docker Compose (Alternative):**
   ```bash
   docker-compose up
   ```
   This will also run any auto-generation scripts for profiles before starting Jekyll.

#### Using Local Ruby

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AlOrozco53/alorozco53.github.io.git
   cd alorozco53.github.io
   ```

2. **Install dependencies:**
   ```bash
   bundle install
   # or use the Makefile
   make install
   ```

3. **Run the development server:**
   ```bash
   bundle exec jekyll serve --host=0.0.0.0
   # or use the Makefile
   make run
   ```

4. **Access the site:**
   Open [http://localhost:4000/](http://localhost:4000/) in your browser

## Development Workflows

### Using the Makefile

The repository includes a `Makefile` with common commands:

```bash
# Install dependencies
make install

# Run development server
make run

# Update dependencies
make update

# Clean build artifacts
make clean
```

### Hot Reloading

Jekyll's development server watches for file changes and automatically rebuilds the site. However, changes to `_config.yml` require a server restart:

```bash
# Stop the server (Ctrl+C)
# Restart with:
make run
# or
bundle exec jekyll serve
```

### Docker Management

**Start the container:**
```bash
docker start beautiful-jekyll
```

**Stop the container:**
```bash
docker stop beautiful-jekyll
```

**View logs:**
```bash
docker logs -f beautiful-jekyll
```

**Rebuild after dependency changes:**
```bash
docker stop beautiful-jekyll
docker rm beautiful-jekyll
docker build -t beautiful-jekyll .
docker run -d -p 4000:4000 --name beautiful-jekyll -v "$PWD":/srv/jekyll beautiful-jekyll
```

## Configuration

### Main Configuration (`_config.yml`)

Key configuration sections:

**Site Information:**
```yaml
title: AlOrozco53                    # Site title
description: My personal website     # Site description
url: "https://alorozco53.github.io" # Production URL
baseurl: ""                          # Subpath (usually empty for user pages)
```

**Navigation:**
```yaml
navbar-links:
  - name: "About Me"
    url: "aboutme"
  - name: "Publications"
    url: "publications"
  - name: "Resume"
    children:
      - name: "CV"
        url: "https://drive.google.com/..."
        newtab: true
```

**Theme Customization:**
```yaml
# Colors
navbar-col: "#010101"
body-text-col: "#0AC9D7"
link-col: "#008AFF"
# Light mode theme available
light-theme:
  navbar-col: "#FFFFFF"
  body-text-col: "#000000"
  ...
```

**Social Media:**
```yaml
author:
  name: AlOrozco53

social-network-links:
  email: "alorozco53@mila.quebec"
  github: AlOrozco53
  twitter: tropdeep___
  linkedin: AlOrozco53
```

### Development Configuration (`_config.dev.yml`)

Currently empty, but can be used to override production settings during development. Use with:
```bash
jekyll serve --config _config.yml,_config.dev.yml
```

## Content Management

### Adding Blog Posts

1. Create a new file in `_posts/` with the format: `YYYY-MM-DD-title.md`

2. Add front matter:
   ```markdown
   ---
   layout: post
   title: "Your Post Title"
   subtitle: "Optional subtitle"
   date: YYYY-MM-DD
   tags: [tag1, tag2]
   comments: true
   ---
   
   Your content here...
   ```

3. Write your content using Markdown

4. Commit and push to deploy

### Adding Pages

1. Create a Markdown file in the root directory (e.g., `newpage.md`)

2. Add front matter:
   ```markdown
   ---
   layout: page
   title: Page Title
   subtitle: Optional Subtitle
   ---
   
   Your content here...
   ```

3. Link to it in `_config.yml` navigation:
   ```yaml
   navbar-links:
     - name: "New Page"
       url: "newpage"
   ```

### Managing Images

- Store images in `/img/` directory
- Reference in Markdown: `![Alt text](/img/image.png)`
- Reference in HTML: `<img src="/img/image.png" alt="Alt text">`
- Keep images organized in subdirectories if needed

### Adding Presentations

See [PRESENTATIONS.md](PRESENTATIONS.md) for detailed documentation on creating and managing reveal.js presentations.

## Deployment

### GitHub Pages (Automatic)

This site uses GitHub Pages for hosting:

1. **Push to the main branch:**
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```

2. **GitHub Pages automatically builds and deploys** the site
   - Usually takes 1-3 minutes
   - Check status at: `https://github.com/[username]/[repo]/actions`

3. **View the live site** at `https://alorozco53.github.io`

### Manual Build

To build the site locally without serving:

```bash
bundle exec jekyll build
```

Output will be in `_site/` directory (excluded from git).

## Troubleshooting

### Common Issues

**1. Port 4000 already in use:**
```bash
# Find and kill the process
lsof -ti:4000 | xargs kill -9
# Or use a different port
bundle exec jekyll serve --port 4001
```

**2. Gem dependency conflicts:**
```bash
make clean
rm -rf Gemfile.lock
make update
```

**3. Docker container won't start:**
```bash
# Remove existing container
docker rm -f beautiful-jekyll
# Rebuild
docker build -t beautiful-jekyll .
docker run -d -p 4000:4000 --name beautiful-jekyll -v "$PWD":/srv/jekyll beautiful-jekyll
```

**4. Changes not appearing:**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- If `_config.yml` was changed, restart the server
- Check for syntax errors in YAML front matter
- Check Jekyll build output for errors

**5. GitHub Pages build fails:**
- Check the Actions tab on GitHub for error details
- Ensure all plugins are GitHub Pages compatible (listed in `_config.yml`)
- Validate YAML syntax in `_config.yml`

**6. Reveal.js presentations not working:**
- Check that CSS/JS files are correctly referenced
- Verify paths are relative to the HTML file location
- See [PRESENTATIONS.md](PRESENTATIONS.md) for more details

### Getting Help

- **Jekyll Documentation:** https://jekyllrb.com/docs/
- **Beautiful Jekyll:** https://github.com/daattali/beautiful-jekyll
- **GitHub Pages:** https://docs.github.com/en/pages
- **reveal.js:** https://revealjs.com/

### Development Tips

1. **Keep dependencies updated** but test thoroughly:
   ```bash
   make update
   ```

2. **Use branches** for major changes:
   ```bash
   git checkout -b feature/new-section
   ```

3. **Test locally** before pushing to production

4. **Validate Markdown** with a linter or preview tool

5. **Optimize images** before committing (compress, resize)

6. **Check console** for JavaScript errors in presentations

## Additional Resources

- [PRESENTATIONS.md](PRESENTATIONS.md) - Detailed guide for reveal.js presentations
- [ISSUES.md](ISSUES.md) - Known issues and bug analysis
- [LICENSE](LICENSE) - License information
- [README.md](README.md) - Quick start guide

---

**Last Updated:** 2025-11-11
**Maintainer:** AlOrozco53
