import parseMD from '../source'

test('returns meta & raw content when meta present', () => {
  const metaTitle = 'Glorious Title'
  const metaDescription = 'ABC123'
  const body = '# This is our house'
  const markdown = `---
title: ${metaTitle}-1
description: ${metaDescription}-1
---
${body}-1

---
title: ${metaTitle}-2
description: ${metaDescription}-2
---
${body}-2`
  const results = parseMD(markdown)
  expect(results.length).toEqual(2)
  expect(results[0].metadata).toEqual({
    title: metaTitle + '-1',
    description: metaDescription + '-1',
  })
  expect(results[0].content).toEqual(body + '-1')
  expect(results[1].metadata).toEqual({
    title: metaTitle + '-2',
    description: metaDescription + '-2',
  })
  expect(results[1].content).toEqual(body + '-2')
})

test('returns meta & raw content when meta present', () => {
  const metaTitle = 'Glorious Title'
  const metaDescription = 'ABC123'
  const body = '# This is our house'
  const markdown = `---
title: ${metaTitle}
description: ${metaDescription}
---
${body}`
  const results = parseMD(markdown)
  expect(results.length).toEqual(1)
  expect(results[0].metadata).toEqual({
    title: metaTitle,
    description: metaDescription,
  })
  expect(results[0].content).toEqual(body)
})

test('returns raw content when meta absent', () => {
  const markdown = '# This is our house'
  const results = parseMD(markdown)
  expect(results.length).toEqual(1)
  expect(results[0].metadata).toEqual({})
  expect(results[0].content).toEqual(markdown)
})
