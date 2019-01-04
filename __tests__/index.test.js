const plugin = require('../')

const examplePage = {
  path: '/my-docs-page',
  regularPath: '/my-docs-page',
  _strippedContent: `\n::: slot header\n# {{ this.$page.title }}\n:::\n\nI 
                     opensourced vue-autosuggest, and wrote about it ...`
}

test('plugin reading time generated', () => {
  const p = plugin()
  const $page = { ...examplePage }

  p.extendPageData($page)

  expect($page.readingTime).toEqual({
    text: '1 min read',
    minutes: 0.08,
    time: 4800,
    words: 16
  })
})

test('plugin reading time excludes pages based on path regex', () => {
  const options = {
    excludes: ['/my-docs-page', '/my-docs-page/sub-page']
  }
  const p = plugin(options)
  const $page = { ...examplePage }

  p.extendPageData($page)

  expect($page.readingTime).toBeUndefined()
})

test('plugin reading time has option to override by page', () => {
  const p = plugin()
  const $page = {
    ...examplePage,
    frontmatter: {
      readingTime: { text: '7000 min' }
    }
  }

  p.extendPageData($page)

  expect($page.readingTime).toEqual({ text: '7000 min' })
})
