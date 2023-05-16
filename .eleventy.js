module.exports = function(eleventyConfig) {
  
  // add assets folder to _site
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addPassthroughCopy("asap-v26-latin-regular.woff2");


};