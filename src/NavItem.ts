import { haConfig } from './HAConfig'

export interface NavItem {
  key: string
  text: string
  children?: NavItem[]
  path?: string
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

export function loadMenu() {
  for (const item of haConfig.value.nav || []) {
    item.path = `/${item.key}`
    loadItem(item)
  }
}

function loadItem(item: NavItem) {
  for (const child of item.children || []) {
    child.path = `${item.path === '/' ? '' : item.path}/${child.key}`
    loadItem(child)
  }
}
