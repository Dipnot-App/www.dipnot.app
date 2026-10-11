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
