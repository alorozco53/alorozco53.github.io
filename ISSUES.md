# Repository Issues & Bug Analysis

## Overview

This document provides a comprehensive analysis of potential bugs, issues, deprecated dependencies, and areas for improvement in the repository. Issues are categorized by severity and type to help prioritize fixes.

## Table of Contents

1. [Critical Issues](#critical-issues)
2. [High Priority Issues](#high-priority-issues)
3. [Medium Priority Issues](#medium-priority-issues)
4. [Low Priority Issues](#low-priority-issues)
5. [Recommendations](#recommendations)
6. [Future Maintenance](#future-maintenance)

---

## Critical Issues

### 1. Deprecated MathJax CDN

**Severity:** 🔴 Critical  
**Impact:** Math equations may stop rendering  
**Affected Files:** 8 presentation files

**Description:**
Multiple presentations use the deprecated MathJax CDN endpoint `https://cdn.mathjax.org/mathjax/latest/MathJax.js`, which has been shut down since April 2017.

**Affected Files:**
- `talks/lessons.html`
- `talks/thesis.html`
- `talks/eyes_on_bot.html`
- `talks/onto_memes.html`
- `stack/lin-sp-bp.html`
- `stack/jumping_networks.html`
- `stack/adversarial_opinion_dynamics.html`
- `course_slides/ml_centraal/demoday.html`

**Current Code:**
```javascript
math: {
    mathjax: 'https://cdn.mathjax.org/mathjax/latest/MathJax.js',
    config: 'TeX-AMS_HTML-full'
}
```

**Recommended Fix:**
Replace with the new CDN:
```javascript
math: {
    mathjax: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js',
    config: 'TeX-AMS_HTML-full'
}
```

Or use MathJax 3.x:
```javascript
// In HTML <head>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
```

**Note:** The old CDN may still work due to redirects, but this is not guaranteed.

---

## High Priority Issues

### 2. Missing Directories Referenced in Docker Compose

**Severity:** 🟠 High  
**Impact:** Docker Compose build will fail  
**Affected Files:** `docker-compose.yml`

**Description:**
The `docker-compose.yml` file references directories that don't exist in the repository:
- `./scripts` (mapped to `/run` in container)
- `./_members` (mapped to `/data/_members` in container)

**Current Configuration:**
```yaml
autogen-profiles:
  volumes:
    - ./scripts:/run
    - ./_data:/data/_data
    - ./_members:/data/_members
  working_dir: /run
  command: bash -c "pip install -q pyyaml tqdm && ./autogen_profiles"
```

**Recommended Fix:**

**Option A:** Remove the `autogen-profiles` service if not needed:
```yaml
# Comment out or remove the autogen-profiles service
services:
  jekyll:
    image: jekyll/jekyll:3.8
    # ... rest of config
```

**Option B:** Create the missing directories and script:
```bash
mkdir -p scripts _members
# Create autogen_profiles script if needed
```

**Option C:** Add `.gitkeep` files to preserve empty directories:
```bash
mkdir -p scripts _members
touch scripts/.gitkeep _members/.gitkeep
```

### 3. Insecure HTTP Links

**Severity:** 🟠 High  
**Impact:** Mixed content warnings, security vulnerabilities  
**Affected Files:** 15 HTML files

**Description:**
Multiple files contain `http://` links instead of `https://`, which can cause:
- Mixed content warnings in browsers
- Security vulnerabilities
- Broken functionality on HTTPS sites

**Affected Files:**
- `talks/lessons.html`
- `talks/eyes_on_bot.html`
- `talks/onto_memes.html`
- `talks/thesis.html`
- `stack/` directory files
- `course_slides/ml_centraal/demoday.html`
- And more...

**Common Patterns:**
```html
<!-- Bad -->
<a href="http://example.com">Link</a>
<img src="http://example.com/image.png">

<!-- Good -->
<a href="https://example.com">Link</a>
<img src="https://example.com/image.png">
```

**Recommended Fix:**
1. Search and replace `http://` with `https://` where applicable
2. Verify all external links work with HTTPS
3. For relative paths, ensure they don't include protocol

**Automated Fix:**
```bash
# Find all HTTP links in HTML files
grep -r "http://" --include="*.html" .

# Use sed or manual replacement to update to HTTPS
```

### 4. Empty Development Configuration

**Severity:** 🟠 High  
**Impact:** Inconsistent development environment  
**Affected Files:** `_config.dev.yml`

**Description:**
The `_config.dev.yml` file exists but is completely empty. This file is referenced in `docker-compose.yml`:
```yaml
command: jekyll serve -H 0.0.0.0 -P 4000 --config _config.yml,_config.dev.yml --incremental
```

**Issues:**
- Jekyll will still work but might show warnings
- Defeats the purpose of having a separate dev config
- Could cause confusion for developers

**Recommended Fix:**

**Option A:** Add development-specific settings:
```yaml
# _config.dev.yml
# Development-specific overrides
url: "http://localhost:4000"
environment: development

# Enable verbose output
verbose: true

# Disable certain features in development
# google_analytics: ""
# gtag: ""
```

**Option B:** Remove the file and update docker-compose.yml:
```yaml
command: jekyll serve -H 0.0.0.0 -P 4000 --config _config.yml --incremental
```

---

## Medium Priority Issues

### 5. Outdated Reveal.js Version

**Severity:** 🟡 Medium  
**Impact:** Missing features, potential security issues  
**Affected Files:** `package.json`, all presentation files

**Description:**
The repository uses reveal.js v3.5.0, which was released in 2018. The current version is 4.x (or 5.x), with significant improvements:
- Better mobile support
- Improved performance
- New features and plugins
- Security updates

**Current Version:**
```json
{
  "name": "reveal.js",
  "version": "3.5.0"
}
```

**Recommended Fix:**

**Caution:** Upgrading reveal.js may break existing presentations due to API changes.

**Steps:**
1. **Test with one presentation first**
2. Review migration guide: https://revealjs.com/upgrading/
3. Update package.json and node_modules
4. Update presentation HTML files with new syntax
5. Test all presentations thoroughly

**Major Changes in v4:**
- New plugin system
- Changed configuration options
- Updated API methods

### 6. Staticman Configuration Incomplete

**Severity:** 🟡 Medium  
**Impact:** Comments feature non-functional  
**Affected Files:** `staticman.yml`, `_config.yml`

**Description:**
Staticman is configured but not fully set up:
- `_config.yml` has empty/incomplete staticman section
- No repository/branch specified in config
- reCAPTCHA configured but not enabled
- Comments infrastructure present but likely non-functional

**Current Config in `_config.yml`:**
```yaml
staticman:
  repository :  # Empty!
  branch     :  # Empty!
  endpoint   :  # Empty!
```

**Current Config in `staticman.yml`:**
```yaml
branch: "master"  # Should be "main" for newer repos
moderation: false
reCaptcha:
  enabled: false
```

**Recommended Fix:**

**Option A:** Complete Staticman setup:
1. Deploy Staticman instance or use public instance
2. Fill in repository details in `_config.yml`
3. Enable and configure reCAPTCHA
4. Update branch from "master" to "main"
5. Test comment submission

**Option B:** Remove Staticman if not used:
1. Remove staticman-related includes
2. Remove staticman configuration files
3. Remove staticman CSS
4. Consider alternatives (Disqus, utterances, giscus)

### 7. Hardcoded Personal Information

**Severity:** 🟡 Medium  
**Impact:** Privacy concerns, maintenance issues  
**Affected Files:** Multiple presentation files, `_config.yml`

**Description:**
Personal information (email, Twitter handle, etc.) is hardcoded in multiple places, making updates tedious and error-prone.

**Examples:**
```html
<!-- In talks/lessons.html -->
<a href="http://twitter.com/alorozco53" target="_blank">
  <i class="fa fa-twitter"></i>@alorozco53
</a>

<!-- Email in _config.yml -->
email: "alorozco53@mila.quebec"
```

**Recommended Fix:**
1. Centralize personal info in `_config.yml`
2. Use Jekyll variables in presentations
3. Create reusable includes for author info

**Example:**
```html
<!-- Create _includes/author-info.html -->
<a href="{{ site.author.twitter }}" target="_blank">
  @{{ site.author.twitter_handle }}
</a>
```

### 8. Missing Alt Text on Images

**Severity:** 🟡 Medium  
**Impact:** Accessibility issues  
**Affected Files:** Multiple presentation files

**Description:**
Many images in presentations have empty or missing `alt` attributes, causing accessibility issues for screen readers.

**Examples:**
```html
<!-- Bad -->
<img src="../img/example.png" width="50%" height="50%" style="border:none;" alt="">

<!-- Good -->
<img src="../img/example.png" width="50%" height="50%" style="border:none;" 
     alt="Deep learning network architecture diagram">
```

**Recommended Fix:**
1. Audit all presentations for images
2. Add descriptive alt text to all images
3. Use empty alt="" only for decorative images
4. Consider adding captions for complex diagrams

---

## Low Priority Issues

### 9. Inconsistent Coding Style

**Severity:** 🟢 Low  
**Impact:** Code maintainability  
**Affected Files:** All HTML and CSS files

**Description:**
- Mixed indentation (tabs vs spaces)
- Inconsistent quote usage (single vs double)
- Varying HTML formatting
- No consistent code formatter

**Recommended Fix:**
1. Choose a style guide (e.g., Prettier, StandardJS)
2. Add `.editorconfig` file
3. Set up pre-commit hooks for formatting
4. Document style guidelines in CONTRIBUTING.md

**Example `.editorconfig`:**
```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

### 10. Redundant CSS Files

**Severity:** 🟢 Low  
**Impact:** Performance, maintenance  
**Affected Files:** `/css/` directory

**Description:**
Multiple versions of CSS files exist:
- `bootstrap.css` and `bootstrap.min.css`
- `reveal.css` and `reveal.min.css`
- Source maps (`.map` files)

**Issues:**
- Larger repository size
- Confusion about which file is used
- Potential version mismatches

**Recommended Fix:**
1. Use only minified versions in production
2. Add source CSS to `.gitignore` if generated
3. Document build process for CSS
4. Consider using CSS preprocessors (SASS/LESS)

### 11. Unused Sample Posts

**Severity:** 🟢 Low  
**Impact:** Repository clutter  
**Affected Files:** `/sampleposts/` directory

**Description:**
The `/sampleposts/` directory contains 7 sample markdown files that are likely unused and from the Beautiful Jekyll template.

**Recommended Fix:**
1. Review sample posts
2. Delete if not needed
3. Or move to documentation folder as examples

### 12. Large Image Files

**Severity:** 🟢 Low  
**Impact:** Performance, repository size  
**Affected Files:** `/img/` directory (211 files)

**Description:**
The repository contains 211 image files. Some may be:
- Unoptimized (not compressed)
- Larger than necessary for web use
- Duplicates or unused

**Recommended Fix:**
1. Audit images for actual usage
2. Compress images with tools like:
   - ImageOptim (Mac)
   - TinyPNG (Web)
   - imagemin (CLI)
3. Use appropriate formats:
   - PNG for graphics/screenshots
   - JPEG for photos
   - SVG for logos/icons
   - WebP for modern browsers
4. Remove unused images

### 13. No Error Pages for Presentations

**Severity:** 🟢 Low  
**Impact:** User experience  
**Affected Files:** N/A (missing files)

**Description:**
If a presentation file is moved or deleted, users get a generic 404 page. There's no custom error handling for presentations.

**Recommended Fix:**
1. Create custom 404 page for presentations
2. Add redirects for moved presentations
3. Implement a presentations index page

### 14. No Testing Infrastructure

**Severity:** 🟢 Low  
**Impact:** Quality assurance  
**Affected Files:** N/A (missing files)

**Description:**
No automated tests exist for:
- Link checking (broken links)
- HTML validation
- Accessibility testing
- Build verification

**Recommended Fix:**
1. Add GitHub Actions workflow for CI/CD
2. Implement link checking with html-proofer
3. Add accessibility tests with pa11y
4. Validate HTML with W3C validator

**Example GitHub Actions workflow:**
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build site
        uses: actions/jekyll-build-pages@v1
      - name: Check HTML
        uses: chabad360/htmlproofer@master
```

---

## Recommendations

### Immediate Actions (Do First)

1. **Fix MathJax CDN** - Critical for presentations with math
2. **Fix Docker Compose** - Remove or create missing directories
3. **Update HTTP to HTTPS** - Security and functionality

### Short-term Actions (This Month)

4. **Populate or remove `_config.dev.yml`**
5. **Audit and fix Staticman configuration**
6. **Add alt text to images** for accessibility
7. **Create or update CONTRIBUTING.md** with coding guidelines

### Long-term Actions (Next Quarter)

8. **Consider reveal.js upgrade** - Plan and test carefully
9. **Implement testing infrastructure**
10. **Optimize images** for performance
11. **Clean up unused files**
12. **Add comprehensive error handling**

### Nice-to-Have Improvements

- Set up automated dependency updates (Dependabot)
- Add comprehensive testing suite
- Implement CSS/JS minification pipeline
- Create presentation template generator
- Add search functionality to presentations
- Implement dark mode for presentations
- Add analytics to track presentation views

---

## Future Maintenance

### Regular Maintenance Tasks

**Monthly:**
- Check for broken links
- Review and update dependencies
- Test all presentations
- Check for security updates

**Quarterly:**
- Audit repository size and clean up
- Review and update documentation
- Test on different browsers/devices
- Update copyright years and info

**Annually:**
- Major dependency updates
- Comprehensive security audit
- Performance optimization review
- Accessibility audit

### Monitoring Setup

Consider implementing:
1. **Uptime monitoring** - For the live site
2. **Broken link monitoring** - Automated checks
3. **Performance monitoring** - PageSpeed Insights
4. **Security scanning** - Dependabot, Snyk
5. **Analytics** - Google Analytics or privacy-focused alternative

### Version Control Best Practices

1. Use semantic versioning for releases
2. Tag important milestones
3. Write descriptive commit messages
4. Use branches for new features
5. Implement code review process
6. Keep main branch stable

### Documentation Updates

Keep these documents updated:
- `USAGE.md` - Usage instructions
- `PRESENTATIONS.md` - Presentation guide
- `ISSUES.md` - This file
- `CONTRIBUTING.md` - Contribution guidelines (create if missing)
- `CHANGELOG.md` - Version history (create if missing)

---

## Issue Tracking

### How to Report Issues

1. Check if issue already exists in this document
2. Verify the issue is reproducible
3. Document steps to reproduce
4. Include screenshots if applicable
5. Note your environment (OS, browser, etc.)

### Priority Definitions

- 🔴 **Critical:** Breaks functionality, requires immediate fix
- 🟠 **High:** Significant impact, fix within days
- 🟡 **Medium:** Noticeable issue, fix within weeks
- 🟢 **Low:** Minor issue, fix when convenient

### Issue Status Tracking

| Issue | Status | Assigned | Notes |
|-------|--------|----------|-------|
| Deprecated MathJax CDN | Open | - | Need to update 8 files |
| Missing Docker directories | Open | - | Decide on approach |
| HTTP links | Open | - | Systematic search/replace needed |
| Empty dev config | Open | - | Quick fix |
| Outdated reveal.js | Open | - | Requires testing |
| Staticman setup | Open | - | Decide to fix or remove |

---

## Appendix: Useful Commands

### Check for Issues

```bash
# Find HTTP links
grep -r "http://" --include="*.html" .

# Find deprecated MathJax
grep -r "cdn.mathjax.org/mathjax/latest" --include="*.html" .

# Find images without alt text
grep -r '<img[^>]*alt=""' --include="*.html" .

# Find large images (>500KB)
find ./img -type f -size +500k

# Check for broken links (requires html-proofer)
htmlproofer ./_site --disable-external

# Validate HTML
# Upload to https://validator.w3.org/ or use CLI tool
```

### Fix Common Issues

```bash
# Replace HTTP with HTTPS (use with caution!)
find . -name "*.html" -exec sed -i 's|http://|https://|g' {} +

# Remove trailing whitespace
find . -name "*.html" -exec sed -i 's/[[:space:]]*$//' {} +

# Fix line endings (convert to LF)
find . -name "*.html" -exec dos2unix {} +
```

---

**Last Updated:** 2025-11-11  
**Document Version:** 1.0  
**Maintainer:** AlOrozco53  
**Status:** Living Document - Update as issues are discovered/resolved
