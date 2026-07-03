import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PieTeams",
  description: "PieTeams Website.",
  base: "/",
  head: [
    [
      "script",
      {
        async: "true",
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3177606357477709",
        crossorigin: "anonymous",
      },
    ],
  ],
  sitemap: {
    hostname: "https://pieteams.github.io/",
  },
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/pieteams/pieteams.github.io" }],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2019-present PieTeams",
    },
  },
});
