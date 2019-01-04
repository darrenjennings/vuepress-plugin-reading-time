const readingTime = require('reading-time')

module.exports = (options = {}) => ({
  extendPageData ($page) {
    const {
      regularPath,
      path
    } = $page

    if ($page.frontmatter && $page.frontmatter.readingTime) {
      $page.readingTime = $page.frontmatter.readingTime
      return $page
    }

    const excludePage = options.excludes && options.excludes.some(p => {
      const testRegex = new RegExp(p)
      return testRegex.test(path) || testRegex.test(regularPath)
    })

    if (excludePage){
      return $page
    }
    
    var stats = readingTime($page._strippedContent);
    $page.readingTime = stats
    
    return $page
  }
})

