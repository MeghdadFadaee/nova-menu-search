import test from 'node:test'
import assert from 'node:assert/strict'

import {
  collectSearchableItems,
  filterSearchableItems,
  normalizeForSearch,
} from '../resources/js/search.js'

test('normalizes Arabic variants and diacritics for Persian searches', () => {
  assert.equal(normalizeForSearch('كِتاب‌هاي ي'), 'کتاب های ی')
})

test('collects authorized navigable items with their menu trail', () => {
  const menu = [
    {
      name: 'Content',
      items: [
        { name: 'Posts', path: '/resources/posts' },
        { name: 'Run Import', path: '/imports', method: 'POST' },
      ],
    },
  ]

  assert.deepEqual(collectSearchableItems(menu), [
    {
      name: 'Posts',
      path: '/resources/posts',
      external: false,
      target: null,
      trail: ['Content', 'Posts'],
      searchableText: 'content posts',
    },
  ])
})

test('matches every query term across item names and ancestors', () => {
  const items = collectSearchableItems([
    {
      name: 'Content',
      items: [
        { name: 'Posts', path: '/resources/posts' },
        { name: 'Pages', path: '/resources/pages' },
      ],
    },
    {
      name: 'Sales',
      items: [{ name: 'Orders', path: '/resources/orders' }],
    },
  ])

  assert.deepEqual(
    filterSearchableItems(items, 'content posts').map(item => item.name),
    ['Posts']
  )
})

test('deduplicates links and respects the configured result limit', () => {
  const items = collectSearchableItems([
    { name: 'Users', path: '/resources/users' },
    { name: 'Users', path: '/resources/users' },
    { name: 'User Roles', path: '/resources/roles' },
  ])

  assert.deepEqual(
    filterSearchableItems(items, 'user', 1).map(item => item.path),
    ['/resources/users']
  )
})
