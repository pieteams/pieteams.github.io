import { defineConfig } from "vitepress";

const SITE_URL = "https://pieteams.github.io";

export default defineConfig({
  title: "PieTeams",
  titleTemplate: ":title — PieTeams",
  description:
    "PieTeams builds open-source, self-hostable software for knowledge management, master data management and product lifecycle management.",
  lang: "en",
  base: "/",
  cleanUrls: true,
  lastUpdated: true,

  head: [
    [
      "script",
      {
        async: "true",
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3177606357477709",
        crossorigin: "anonymous",
      },
    ],
    ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    ["meta", { name: "theme-color", content: "#3451b2" }],
    ["meta", { name: "author", content: "PieTeams" }],
    ["meta", { name: "robots", content: "index, follow" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "PieTeams" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Open-source, self-hostable systems for knowledge, master data and product lifecycle management.",
      },
    ],
    ["meta", { name: "twitter:card", content: "summary" }],
  ],

  transformHead({ pageData }) {
    const path = pageData.relativePath
      .replace(/(^|\/)index\.md$/, "$1")
      .replace(/\.md$/, "");
    const canonical = `${SITE_URL}/${path}`;
    return [
      ["link", { rel: "canonical", href: canonical }],
      ["meta", { property: "og:url", content: canonical }],
    ];
  },

  sitemap: {
    hostname: `${SITE_URL}/`,
  },

  themeConfig: {
    logo: "/logo.svg",
    siteTitle: "PieTeams",

    nav: [
      { text: "Home", link: "/" },
      { text: "Projects", link: "/projects" },
      { text: "Insights", link: "/insights/", activeMatch: "/insights/" },
      { text: "About", link: "/about" },
      { text: "FAQ", link: "/faq" },
    ],

    sidebar: {
      "/insights/": [
        {
          text: "Insights",
          items: [
            { text: "Overview", link: "/insights/" },
            {
              text: "Search engines for agents",
              link: "/insights/agent-native-knowledge",
            },
            {
              text: "RAG vs. LLM wiki",
              link: "/insights/rag-vs-llm-wiki",
            },
            {
              text: "When to adopt MDM",
              link: "/insights/master-data-management",
            },
            {
              text: "PLM for small manufacturers",
              link: "/insights/plm-for-smes",
            },
          ],
        },
      ],
      "/": [
        {
          text: "PieTeams",
          items: [
            { text: "Projects", link: "/projects" },
            { text: "About", link: "/about" },
            { text: "FAQ", link: "/faq" },
            { text: "Contact", link: "/contact" },
          ],
        },
        {
          text: "Legal",
          items: [
            { text: "Privacy Policy", link: "/privacy" },
            { text: "Terms of Use", link: "/terms" },
          ],
        },
        {
          text: "Project documentation",
          items: [
            { text: "PieKBS", link: `${SITE_URL}/piekbs/` },
            { text: "PieMDM", link: `${SITE_URL}/piemdm/` },
            { text: "PiePLM", link: `${SITE_URL}/pieplm/` },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/pieteams" },
    ],

    search: {
      provider: "local",
    },

    outline: {
      level: [2, 3],
      label: "On this page",
    },

    editLink: {
      pattern:
        "https://github.com/pieteams/pieteams.github.io/edit/main/:path",
      text: "Edit this page on GitHub",
    },

    lastUpdated: {
      text: "Last updated",
      formatOptions: {
        dateStyle: "medium",
      },
    },

    docFooter: {
      prev: "Previous page",
      next: "Next page",
    },

    footer: {
      message:
        'Open-source projects released under the MIT License. <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Use</a> · <a href="/contact">Contact</a>',
      copyright: 'Copyright © 2019-present <a href="https://github.com/pieteams">PieTeams</a>',
    },
  },
});
