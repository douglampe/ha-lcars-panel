import { ref } from 'vue'

export const currentNav = ref('/home')

export function navigate(path: string) {
  if (path.startsWith('url:')) {
    document.location = path.substring(4)
    return
  }
  currentNav.value = path

  // HACK: Scroll to top until we get anchor scrolling working
  window.scrollTo(0, 0)
}
