module.exports = function (eleventyConfig) {
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
