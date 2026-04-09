import { type HAConfig } from './HAConfig'
import { ref } from 'vue'

export interface NavItem {
  text: string
  key?: string
  children?: NavItem[]
  path?: string
  url?: string
}

export function findByPath(navStructure: NavItem[] | undefined, path: string): NavItem | undefined {
  if (path === '/') {
    return { text: 'Root', path: '/', children: navStructure }
  }

  for (const item of navStructure ?? []) {
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

export function loadMenu(config: HAConfig) {
  const nav: NavItem[] = []

  for (const item of config.nav || []) {
    const navItem = { ...item }
    nav.push(navItem)
    setKey(navItem)
    navItem.path = `/${navItem.key}`
    loadItem(navItem)
  }

  config.navStructure = nav
}

function loadItem(item: NavItem) {
  for (const child of item.children || []) {
    setKey(child)
    child.path = `${item.path === '/' ? '' : item.path}/${child.key}`
    loadItem(child)
  }
}
