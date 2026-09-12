const ARABIC_CHARACTER_EQUIVALENTS = {
  ك: 'ک',
  ي: 'ی',
  ى: 'ی',
  ة: 'ه',
  ۀ: 'ه',
}

export function normalizeForSearch(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    .replace(/\u0640/g, '')
    .replace(/[\u200C\u200D]/g, ' ')
    .replace(/[كيىةۀ]/g, character => ARABIC_CHARACTER_EQUIVALENTS[character])
    .toLocaleLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

export function collectSearchableItems(menuItems, ancestors = []) {
  return (Array.isArray(menuItems) ? menuItems : []).flatMap(item => {
    const name = String(item?.name ?? '').trim()
    const trail = name === '' ? ancestors : [...ancestors, name]
    const method = String(item?.method ?? 'GET').toUpperCase()
    const current = item?.path && method === 'GET'
      ? [{
          name,
          path: item.path,
          external: item.external === true,
          target: item.target ?? null,
          trail,
          searchableText: normalizeForSearch(trail.join(' ')),
        }]
      : []

    return [
      ...current,
      ...collectSearchableItems(item?.items, trail),
    ]
  })
}

export function filterSearchableItems(items, query, maximumResults = 10) {
  const terms = normalizeForSearch(query).split(' ').filter(Boolean)

  if (terms.length === 0) {
    return []
  }

  const seen = new Set()

  return items
    .filter(item => terms.every(term => item.searchableText.includes(term)))
    .filter(item => {
      const key = `${item.path}\u0000${item.name}`

      if (seen.has(key)) {
        return false
      }

      seen.add(key)

      return true
    })
    .slice(0, Math.max(1, Number(maximumResults) || 10))
}
