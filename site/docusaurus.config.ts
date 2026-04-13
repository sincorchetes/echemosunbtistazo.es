import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Echemos un bitstazo",
  tagline: "Blog técnico sobre Sistemas, DevOps, Desarrollo y Linux",
  favicon: "img/favicon.ico",

  url: "https://echemosunbitstazo.es",
  baseUrl: "/",

  organizationName: "sincorchetes",
  projectName: "echemosunbitstazo",

  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenAnchors: "warn",

  markdown: {
    format: "md",
    mdx1Compat: {
      comments: true,
      admonitions: false,
      headingIds: true,
    },
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },

  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        language: ["es"],
        blogRouteBasePath: "/",
        docsRouteBasePath: "/wiki",
        indexBlog: true,
        indexDocs: true,
        searchBarPosition: "right",
      },
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        createRedirects(existingPath: string) {
          // /archive/slug/ → /posts/slug
          if (existingPath.startsWith("/posts/")) {
            const slug = existingPath.replace("/posts/", "");
            return [
              `/archive/${slug}`,
              `/blog/${slug}`,
            ];
          }
          // /posts/page/N/ → /page/N
          if (existingPath.match(/^\/page\/\d+$/)) {
            const pageNum = existingPath.replace("/page/", "");
            return [`/posts/page/${pageNum}`];
          }
          return undefined;
        },
        redirects: [
          { from: "/archive", to: "/" },
          { from: "/categories", to: "/tags" },
          { from: "/no-ip", to: "/posts/no-ip-como-obtener-un-acceso-fijo-a-un-servidor" },
        ],
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "wiki",
        },
        blog: {
          routeBasePath: "/",
          showReadingTime: true,
          blogTitle: "Publicaciones",
          blogDescription:
            "Blog técnico sobre Sistemas, DevOps, Desarrollo y Linux",
          postsPerPage: 6,
          blogSidebarTitle: "Todas las publicaciones",
          blogSidebarCount: "ALL",
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "UA-114291557-1",
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Echemos un bitstazo",
      items: [
        { to: "/", label: "Blog", position: "left" },
        {
          type: "docSidebar",
          sidebarId: "wiki",
          label: "Wiki Técnica",
          position: "left",
        },
        { to: "/python-path", label: "Python Path", position: "left" },
        { to: "/nix-path", label: "Nix Path", position: "left" },
        { to: "/tags", label: "Tags", position: "left" },
        {
          href: "https://github.com/sincorchetes",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Contenido",
          items: [
            { label: "Blog", to: "/" },
            { label: "Wiki Técnica", to: "/wiki" },
          ],
        },
        {
          title: "Social",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/sincorchetes",
            },
            {
              label: "GitLab",
              href: "https://gitlab.com/sincorchetes",
            },
            {
              label: "Mastodon",
              href: "https://mastodon.social/@sincorchetes",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/sincorchetes/",
            },
          ],
        },
        {
          title: "Más",
          items: [
            { label: "RSS", href: "https://echemosunbitstazo.es/rss.xml" },
            { label: "Atom", href: "https://echemosunbitstazo.es/atom.xml" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Echemos un bitstazo. Hecho con Docusaurus.<br/>El contenido de este blog está licenciado bajo <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        "bash",
        "python",
        "php",
        "yaml",
        "json",
        "nginx",
        "ini",
        "docker",
        "sql",
        "ruby",
        "nix",
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
