import type { MarginProps } from './props/MarginProps'
import type { PadProps } from './props/PadProps'

export function unitSize(val?: number) {
  if (val) {
    return `calc(var(--lcars-unit) * ${val})`
  }
}

export function gapSize(val?: number) {
  if (val) {
    return `calc(var(--lcars-unit) * ${val} / 10)`
  }
}

export function colorVar(val?: string) {
  if (val) {
    return `var(--lcars-color-${val})`
  }
}

export function marginStyle(config: MarginProps) {
  return `${unitSize(config.marginTop) ?? 0} ${unitSize(config.marginRight) ?? 0} ${unitSize(config.marginBottom) ?? 0} ${unitSize(config.marginLeft) ?? 0}`
}

export function padStyle(config: PadProps) {
  return `${unitSize(config.padTop ?? config.pad) ?? 0} ${unitSize(config.padRight ?? config.pad) ?? 0} ${unitSize(config.padBottom ?? config.pad) ?? 0} ${unitSize(config.padLeft ?? config.pad) ?? 0}`
}

export function borderStyle(x?: number, y?: number) {
  if (x || y) {
    return `${unitSize(x ?? 1)} ${unitSize(y ?? 1)}`
  }
}

export function alignStyle(alignment?: string) {
  if (!alignment) {
    return {}
  }

  if (alignment == 'top-left') {
    return {}
  }

  if (alignment == 'top-center') {
    return {
      textAlign: 'center',
    }
  }

  if (alignment == 'top-right') {
    return {
      textAlign: 'right',
    }
  }

  if (alignment == 'middle-left') {
    return {
      display: 'flex',
      alignItems: 'center',
    }
  }

  if (alignment == 'middle-center') {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }

  if (alignment == 'middle-right') {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    }
  }

  if (alignment == 'bottom-left') {
    return {
      display: 'flex',
      alignItems: 'flex-end',
    }
  }

  if (alignment == 'bottom-center') {
    return {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
    }
  }

  if (alignment == 'bottom-right') {
    return {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    }
  }
}

export function removeUndefined(obj: Record<string, any>) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key]
    }
  })

  return obj
}
