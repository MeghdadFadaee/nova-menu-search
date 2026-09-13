import {
  collectSearchableItems,
  filterSearchableItems,
  internalNavigationTarget,
} from './search'

Nova.booted((_app, store) => {
  const configuration = {
    label: 'Search main menu',
    placeholder: 'Search menu…',
    noResults: 'No menu items found.',
    shortcut: 'mod+k',
    maxResults: 10,
    ...(Nova.config('novaMenuSearch') ?? {}),
  }
  const installations = new Map()

  const searchableItems = () => collectSearchableItems(store.getters.mainMenu)

  const renderResults = (installation) => {
    const query = installation.input.value
    const results = filterSearchableItems(
      searchableItems(),
      query,
      configuration.maxResults
    )

    installation.root.dataset.active = query.trim() === '' ? 'false' : 'true'
    installation.results.replaceChildren()

    if (query.trim() === '') {
      return
    }

    if (results.length === 0) {
      const emptyState = document.createElement('p')
      emptyState.className = 'nova-menu-search__empty'
      emptyState.textContent = configuration.noResults
      installation.results.append(emptyState)

      return
    }

    results.forEach(item => {
      const link = document.createElement('a')
      const trail = document.createElement('span')
      const name = document.createElement('span')

      link.className = 'nova-menu-search__result'
      link.href = item.path
      name.className = 'nova-menu-search__result-name'
      name.textContent = item.name
      link.append(name)

      if (item.trail.length > 1) {
        trail.className = 'nova-menu-search__result-trail'
        trail.textContent = item.trail.slice(0, -1).join(' / ')
        link.append(trail)
      }

      if (item.external) {
        link.rel = 'noreferrer noopener'
        link.target = item.target ?? '_blank'
      } else {
        link.addEventListener('click', event => {
          event.preventDefault()
          installation.input.value = ''
          renderResults(installation)
          Nova.visit(internalNavigationTarget(item.path))
        })
      }

      installation.results.append(link)
    })
  }

  const install = (menu) => {
    if (installations.has(menu)) {
      return
    }

    const root = document.createElement('div')
    const field = document.createElement('div')
    const icon = document.createElement('span')
    const input = document.createElement('input')
    const shortcut = document.createElement('kbd')
    const results = document.createElement('div')

    root.className = 'nova-menu-search'
    root.dataset.active = 'false'
    field.className = 'nova-menu-search__field'
    icon.className = 'nova-menu-search__icon'
    icon.setAttribute('aria-hidden', 'true')
    icon.textContent = '⌕'
    input.className = 'nova-menu-search__input'
    input.type = 'search'
    input.autocomplete = 'off'
    input.spellcheck = false
    input.placeholder = configuration.placeholder
    input.setAttribute('aria-label', configuration.label)
    results.className = 'nova-menu-search__results'
    results.setAttribute('aria-live', 'polite')

    if (configuration.shortcut) {
      shortcut.className = 'nova-menu-search__shortcut'
      shortcut.textContent = configuration.shortcut
        .replace('mod', navigator.platform.includes('Mac') ? '⌘' : 'Ctrl')
        .replace('+', ' ')
      field.append(icon, input, shortcut)
    } else {
      field.append(icon, input)
    }

    root.append(field, results)
    menu.before(root)

    const installation = { root, input, results }
    const stopWatching = store.watch(
      () => store.getters.mainMenu,
      () => renderResults(installation),
      { deep: true }
    )

    input.addEventListener('input', () => renderResults(installation))
    input.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        input.value = ''
        renderResults(installation)
        input.blur()
      }
    })

    installations.set(menu, { ...installation, stopWatching })
  }

  const scan = () => {
    installations.forEach((installation, menu) => {
      if (! menu.isConnected) {
        installation.stopWatching()
        installations.delete(menu)
      }
    })

    document.querySelectorAll('.sidebar-menu').forEach(install)
  }

  const observer = new MutationObserver(scan)
  observer.observe(document.body, { childList: true, subtree: true })
  scan()

  if (configuration.shortcut) {
    Nova.addShortcut(configuration.shortcut, event => {
      const visibleInput = [...installations.values()]
        .map(installation => installation.input)
        .find(input => input.offsetParent !== null)

      if (visibleInput) {
        event?.preventDefault()
        visibleInput.focus()
      }
    })
  }
})
