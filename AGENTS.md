# Agent Onboarding Guide

Welcome, fellow agent! This repository powers a Jekyll-based personal website. Use this quick tour to get oriented before making changes.

## Start Here

- Read `USAGE.md` for a full walkthrough of the stack, directory layout, and build workflows.
- Skim `README.md` if you only need the Docker quickstart.
- Check `ISSUES.md` for known gaps or work-in-progress topics.
- Planning presentations? Open `PRESENTATIONS.md` for reveal.js conventions.

## Key Site Components

- Configuration: `_config.yml` (primary settings) and `_config.dev.yml` (overrides for local work).
- Templates: `_layouts/` (page skeletons) and `_includes/` (reusable partials such as `nav.html`, `footer.html`, and `intro.html`).
- Data-driven content: `_data/` for YAML-backed values (`SocialNetworks.yml`, `ui-text.yml`).
- Homepage: `index.html` assembles the intro, contact info, and statements via the includes above.
- Pages & posts: Markdown in the repository root (e.g., `aboutme.md`) or `_posts/` for dated blog entries.

## Local Development

1. Install dependencies with Docker (`docker-compose up`) or the Ruby toolchain (`bundle install` then `bundle exec jekyll serve`).
2. Serve the site locally at `http://localhost:4000/`.
3. Restart the server after editing `_config.yml`; most other changes hot-reload.

The `Makefile` wraps common commands (`make install`, `make run`, `make clean`, `make update`).

## Working Effectively

- Keep HTML tidy and prefer includes when you add reusable page fragments.
- Styles live in `css/` (global) and `css/theme/` (presentation themes). Use the existing structure.
- Reveal.js assets and plugins sit in `js/`, `lib/`, and `plugin/`; follow the patterns in `talks/` and `course_slides/`.
- Store new media in `img/` and reference with site-root-relative paths (`/img/...`).

## Before You Ship

- Preview changes locally whenever possible.
- Lint YAML front matter—one stray space can break a build.
- Summarize changes in pull requests and note any manual follow-up.

Need more context? Reach out to the maintainer or check the Beautiful Jekyll docs: <https://github.com/daattali/beautiful-jekyll>.
