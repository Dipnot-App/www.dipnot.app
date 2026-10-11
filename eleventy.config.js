const fs = require("fs");
const path = require("path");

// Font Awesome Free icons (CC BY 4.0), inlined as SVG at build time from
// the npm package, so no icon font downloads. Credit in README.md.
const FA_SVGS = path.join(
  __dirname,
  "node_modules/@fortawesome/fontawesome-free/svgs",
);
const iconCache = new Map();
const iconSvg = (name) => {
  if (!iconCache.has(name)) {
    const [set, id] = name.includes(":") ? name.split(":") : ["solid", name];
    const src = fs.readFileSync(path.join(FA_SVGS, set, `${id}.svg`), "utf8");
    const viewBox = src.match(/viewBox="([^"]+)"/)[1];
    const d = src.match(/<path d="([^"]+)"/)[1];
    iconCache.set(name, {
      id,
      svg: `<svg viewBox="${viewBox}"><path d="${d}"/></svg>`,
    });
  }
  return iconCache.get(name);
};

module.exports = function (eleventyConfig) {
  // {% icon "envelope" %}, {% icon "brands:apple", "dn-i--2x" %}: a
  // decorative icon; the <i> wrapper keeps the existing `i` styling.
  eleventyConfig.addShortcode("icon", (name, cls = "") => {
    const { id, svg } = iconSvg(name);
    return `<i class="dn-i dn-i--${id}${cls ? ` ${cls}` : ""}" aria-hidden="true">${svg}</i>`;
  });

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("site.webmanifest");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy(".nojekyll");
  eleventyConfig.addPassthroughCopy("CNAME");

  // The same page in another language: the page's hreflang entry for
  // `lang` (as a root-relative path), else that language's home page.
  eleventyConfig.addFilter("altUrl", (hreflang, lang, fallback) => {
    const hit = (hreflang || []).find((a) => a.lang === lang);
    return hit ? hit.href.replace(/^https:\/\/dipnot\.app/, "") : fallback;
  });

  // Preserve .html extensions (don't rewrite to pretty URLs).
  // Existing links, sitemap, and inbound bookmarks all use .html.
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: function (data) {
      if (data.permalink) return data.permalink;
      return `${data.page.filePathStem}.html`;
    },
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    templateFormats: ["html"],
  };
};
