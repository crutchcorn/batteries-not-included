import { defineConfig } from "vitepress";

const { description } = require("../../package.json");

const ogImage =
  "https://unicorn-utterances.github.io/batteries-not-included/social-banner.png";

export default defineConfig({
  lang: "en-US",
  title: "Batteries Not Included",
  description: description,
  base: "/batteries-not-included/",
  lastUpdated: true,
  head: [
    ["meta", { property: "og:image", content: ogImage }],
    ["meta", { name: "twitter:image", content: ogImage }],
    ["meta", { name: "theme-color", content: "#cadbff" }],
    ["meta", { property: "twitter:card", content: "summary_large_image" }],
    ["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
    ["link", { rel: "mask-icon", href: "/logo.svg", color: "#ffffff" }],
  ],
  themeConfig: {
    logo: "/logo.svg",
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/unicorn-utterances/batteries-not-included",
      },
    ],
    editLink: {
      pattern:
        "https://github.com/unicorn-utterances/batteries-not-included/edit/main/docs/:path",
    },
    nav: [
      { text: "Introduction", link: "/introduction" },
      {
        text: "v0",
        items: [
          // Change to `Changelog` when we have one
          {
            text: "Releases",
            link: "https://github.com/unicorn-utterances/batteries-not-included/releases",
          },
          {
            text: "Contributing",
            link: "https://github.com/unicorn-utterances/batteries-not-included/blob/main/CONTRIBUTING.md",
          },
        ],
      },
    ],
    sidebar: [
      {
        text: "Introduction",
        link: "/introduction",
      },
      {
        text: "JavaScript Utils",
        link: "/utils",
      },
      {
        text: "React Utils",
        link: "/react",
        items: [
          {
            text: "Accessibility",
            link: "/react/accessibility",
          },
          {
            text: "Outside Events",
            link: "/react/outside-events",
          },
          {
            text: "Table",
            link: "/react/table",
          },
        ],
      },
    ],
  },
});
