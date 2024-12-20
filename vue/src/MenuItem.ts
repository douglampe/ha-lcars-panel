export interface MenuItem {
  index: string
  icon?: string | null
  title: string
  color: string
  width?: number
  href?: string | null
  action?: string | null
  subAction?: string | null
}
