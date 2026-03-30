import { colorList } from '@/ColorList'
import type { ConfigItem } from '../ConfigItem'
import { getThemeColor } from '@/ThemeConfig'

export interface RadiusProps {
  capLeft?: boolean
  capRight?: boolean
  capTop?: boolean
  capBottom?: boolean
  radXTopLeft?: number
  radYTopLeft?: number
  radXTopRight?: number
  radYTopRight?: number
  radXBottomLeft?: number
  radYBottomLeft?: number
  radXBottomRight?: number
  radYBottomRight?: number
  radXInnerTopLeft?: number
  radYInnerTopLeft?: number
  radXInnerTopRight?: number
  radYInnerTopRight?: number
  radXInnerBottomLeft?: number
  radYInnerBottomLeft?: number
  radXInnerBottomRight?: number
  radYInnerBottomRight?: number
}

const scaleFactor = 10

function scaleValue(value?: number, defaultValue = 0) {
  return (value ?? defaultValue) * scaleFactor
}

function unscale(value?: number, defaultValue = 0) {
  return (value ?? defaultValue) / scaleFactor
}

//TODO: Resolve color names to hex values
function resolveColor(color?: string | number) {
  if (color) {
    if (typeof color === 'number') {
      const themeColor = getThemeColor(color)
      if (themeColor.startsWith('#')) {
        return themeColor
      }
      return resolveColor(themeColor)
    } else if (color.startsWith('#') || color.startsWith('rgb') || color.startsWith('hsl')) {
      return color
    } else {
      const colorKey = color.replace(/\-/g, '_')
      if (colorList.hasOwnProperty(colorKey)) {
        return colorList[colorKey]
      }
    }
  }

  return '#ffc152'
}

function createPath(config: ConfigItem, width: number, height: number) {
  const path = []

  const offsetTL = scaleValue(config.radXTopLeft ?? config.radXInnerBottomRight, 0)
  const offsetTR = scaleValue(config.radXTopRight ?? config.radXInnerBottomLeft, 0)
  const offsetRT = scaleValue(
    config.radYTopRight ??
      config.radXTopRight ??
      config.radYInnerBottomLeft ??
      config.radXInnerBottomLeft,
    0,
  )
  const offsetRB = scaleValue(
    config.radYBottomRight ??
      config.radXBottomRight ??
      config.radYInnerTopLeft ??
      config.radXInnerTopLeft,
    0,
  )
  const offsetBR = scaleValue(config.radXBottomRight ?? config.radXInnerTopLeft, 0)
  const offsetBL = scaleValue(config.radXBottomLeft ?? config.radXInnerTopRight, 0)
  const offsetLB = scaleValue(
    config.radYBottomLeft ??
      config.radXBottomLeft ??
      config.radYInnerTopRight ??
      config.radXInnerTopRight,
    0,
  )
  const offsetLT = scaleValue(
    config.radYTopLeft ??
      config.radXTopLeft ??
      config.radYInnerBottomRight ??
      config.radXInnerBottomRight,
    0,
  )

  const startX = 0
  const startY = offsetLT

  path.push(`M ${startX} ${startY}`)
  if (config.radXTopLeft) {
    path.push(`q 0 ${-offsetLT} ${offsetTL} ${-offsetLT}`)
  } else if (config.radXInnerBottomRight) {
    path.push(`q ${offsetTL} 0 ${offsetTL} ${-offsetLT}`)
  }
  path.push(`L ${width - offsetTR} 0`)
  if (config.radXTopRight) {
    path.push(`q ${offsetTR} 0 ${offsetTR} ${offsetRT}`)
  } else if (config.radXInnerBottomLeft) {
    path.push(`q 0 ${offsetRT} ${offsetTR} ${offsetRT}`)
  }
  path.push(`L ${width} ${height - offsetRB}`)
  if (config.radXBottomRight) {
    path.push(`q 0 ${offsetRB} ${-offsetBR} ${offsetRB}`)
  } else if (config.radXInnerTopLeft) {
    path.push(`q ${-offsetBR} 0 ${-offsetBR} ${offsetRB}`)
  }
  path.push(`L ${offsetBL} ${height}`)
  if (config.radXBottomLeft) {
    path.push(`q ${-offsetBL} 0 ${-offsetBL} ${-offsetLB}`)
  } else if (config.radXInnerTopRight) {
    path.push(`q 0 ${-offsetLB} ${-offsetBL} ${-offsetLB}`)
  }
  path.push('Z')

  return path.join(' ')
}

export function createRadiusSvg(
  config: ConfigItem,
  actualWidth: number | undefined,
  actualHeight: number | undefined,
): string | undefined {
  if (
    !Object.keys(config).some(
      (key) =>
        (key.startsWith('radX') || key.startsWith('radY')) &&
        typeof config[key as keyof ConfigItem] !== 'undefined',
    ) &&
    !config.capLeft &&
    !config.capRight &&
    !config.capTop &&
    !config.capBottom
  ) {
    return
  }

  let width = typeof config.width === 'number' ? scaleValue(config.width) : undefined
  let height = typeof config.height === 'number' ? scaleValue(config.height) : undefined

  if (actualWidth && actualHeight) {
    if (width && height) {
      if (
        parseFloat((actualWidth / width).toFixed(2)) >
        parseFloat((actualHeight / height).toFixed(2))
      ) {
        width = (actualWidth * height) / actualHeight
      } else if (
        parseFloat((actualWidth / width).toFixed(2)) <
        parseFloat((actualHeight / height).toFixed(2))
      ) {
        height = (actualHeight * width) / actualWidth
      }
    } else if (width) {
      height = (actualHeight * width) / actualWidth
    } else if (height) {
      width = (actualWidth * height) / actualHeight
    }
  }

  if (typeof width !== 'number' || typeof height !== 'number') {
    return
  }

  const fill = resolveColor(config.color)

  const processedConfig = {
    ...config,
  }

  if (config.capLeft) {
    processedConfig.radXTopLeft = unscale(height / 2)
    processedConfig.radXBottomLeft = processedConfig.radXTopLeft
  }
  if (config.capRight) {
    processedConfig.radXTopRight = unscale(height / 2)
    processedConfig.radXBottomRight = processedConfig.radXTopRight
  }
  if (config.capTop) {
    processedConfig.radXTopLeft = unscale(width / 2)
    processedConfig.radXTopRight = processedConfig.radYTopLeft
  }
  if (config.capBottom) {
    processedConfig.radXBottomLeft = unscale(width / 2)
    processedConfig.radXBottomRight = processedConfig.radXBottomLeft
  }

  const pathData = createPath(processedConfig, width, height)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><path d="${pathData}" fill="${fill}"/></svg>`
}
