export const debounce = <T extends (...args: any[]) => any>(callback: T, waitFor: number) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>): void => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      callback(...args)
    }, waitFor)
  }
}
