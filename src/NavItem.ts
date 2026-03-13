import { haConfig } from './HAConfig'

export interface NavItem {
  text: string
  key?: string
  children?: NavItem[]
  path?: string
  url?: string
}

export function findByPath(path: string, item?: NavItem): NavItem | undefined {
  if (item && item.path === path) {
    return item
  }
  if (path.length === 0) {
    return undefined
  }
  if (path === '/') {
    return { key: 'home', text: 'Home', children: haConfig.value.nav, path: '/' }
  }

  if (!item?.children) {
    return
  }

  for (const child of item.children) {
    return findByPath(path, child)
  }
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
