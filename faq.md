# Frequently Asked Questions

## About the projects

### Are PieKBS, PieMDM and PiePLM separate products?

Yes. They solve different problems and can be adopted independently. PieKBS manages knowledge for agents, PieMDM manages enterprise master data, and PiePLM documents a product lifecycle approach for manufacturers. See [Projects](/projects) for the boundaries between them.

### Are the projects free?

The source code is released under the MIT License. You may use, modify and distribute it, including in commercial settings, subject to the terms of the license. There are no licence fees and no paid tiers.

### Do I need a cloud account?

No. The projects are designed to be self-hosted. PieKBS runs as a local binary with a local SQLite index. PieMDM can be started with Docker Compose on your own infrastructure.

### Which project should I start with?

- If your problem is “our agent cannot find or cite our documents”, start with [PieKBS](https://pieteams.github.io/piekbs/).
- If your problem is “our customer, supplier or product data is inconsistent across systems”, start with [PieMDM](https://pieteams.github.io/piemdm/).
- If your problem is “we are a small manufacturer and PLM suites are too expensive”, read [PiePLM](https://pieteams.github.io/pieplm/) and evaluate the blueprint.

### What is the status of PiePLM?

PiePLM is in the documentation and design phase. The public repository contains the project description, market research, architecture notes and module design. The website is explicit about what exists and what is planned; it does not ship an executable release yet.

## Using the documentation

### Can I translate the documentation?

Yes, provided you preserve attribution and link back to the original page. Some projects already include community translations. Open an issue before starting a full translation so that work is not duplicated.

### I found an error. Where do I report it?

Open an issue in the repository for the affected project. For this website, use the [website issue tracker](https://github.com/pieteams/pieteams.github.io/issues). Include the page URL and the correction you suggest.

### Can I use screenshots or excerpts in my own article?

Short quotations with a link to the source are welcome. For longer reproductions, ask first through the relevant repository's issue tracker.

## Privacy, cookies and advertising

### Does this website use cookies?

Yes. The site uses Google AdSense to display advertising, and Google may set advertising cookies. The [privacy policy](/privacy) lists the categories, purposes and ways to opt out.

### Can I use the site without personalised advertising?

Yes. You can disable personalised advertising in [Google Ads Settings](https://www.google.com/settings/ads) or opt out of third-party advertising cookies at [aboutads.info](https://www.aboutads.info/choices/). You can also block cookies in your browser; the documentation remains readable.

### Do you sell personal data?

No. We do not sell personal information. We do not require an account to read the documentation.

### Why does the site show ads?

Advertising covers the cost of hosting and maintaining the documentation. Ads are served by Google; we do not control which individual ads appear. Advertising does not affect the technical content or comparisons on this site.

## Contributing

### How do I contribute code?

Read `CONTRIBUTING.md` in the repository, open an issue to discuss a significant change, then submit a pull request. Small fixes such as typos and broken links can go straight to a pull request.

### Do you accept feature requests?

Yes. Open an issue describing the problem, the proposed behaviour and the use case. Requests are prioritised against the project roadmap and maintainer capacity.

### How can I support the projects?

Use them, report bugs, improve the documentation, or share them with a team that has the problem they solve. Starring a repository helps others discover it.
