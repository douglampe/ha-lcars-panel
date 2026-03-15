import { haConfig } from './HAConfig'

export interface NavItem {
  text: string
  key?: string
  children?: NavItem[]
  path?: string
  url?: string
}

export function findByPath(path: string): NavItem | undefined {
  if (path === '/') {
    return { text: 'Root', path: '/', children: haConfig.value.nav }
  }

  for (const item of haConfig.value.nav || []) {
    const found = findItemByPath(path, item)
    if (found) {
      return found
    }
  }

  return undefined
}

function findItemByPath(path: string, item: NavItem): NavItem | undefined {
  if (item && item.path === path) {
    return item
  }

  if (path.length === 0) {
    return undefined
  }

  if (!item.children) {
    return undefined
  }

  for (const child of item.children) {
    const found = findItemByPath(path, child)
    if (found) {
      return found
    }
  }
  return undefined
}

function setKey(item: NavItem) {
  if (!item.key) {
    item.key = item.text.toLowerCase().replace(/\s+/g, '-')
  }
}

export function loadMenu() {
  for (const item of haConfig.value.nav || []) {
    setKey(item)
    item.path = `/${item.key}`
    loadItem(item)
  }
}

function loadItem(item: NavItem) {
  for (const child of item.children || []) {
    setKey(child)
    child.path = `${item.path === '/' ? '' : item.path}/${child.key}`
    loadItem(child)
  }
}
