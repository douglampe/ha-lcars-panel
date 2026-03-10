import { colorList } from '@/ColorList'
import type { ConfigItem } from '../ConfigItem'

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

function scaleValue(value?: number, defaultValue = 0) {
  return (value ?? defaultValue) * 10
}

//TODO: Resolve color names to hex values
function resolveColor(color?: string) {
  if (color) {
    if (
      color.startsWith('#') ||
      color.startsWith('rgb') ||
      color.startsWith('hsl') ||
      color.startsWith('var(')
    ) {
      return color
    }

    const colorKey = color.replace(/\-/g, '_')
    if (colorList.hasOwnProperty(colorKey)) {
      return colorList[colorKey]
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

export function createRadiusSvg(config: ConfigItem): string | undefined {
  if (!Object.keys(config).some((key) => key.startsWith('radX') || key.startsWith('radY'))) {
    return
  }

  if (typeof config.width !== 'number' || typeof config.height !== 'number') {
    return
  }

  const width = scaleValue(config.width)
  const height = scaleValue(config.height)
  const fill = resolveColor(config.color)
  console.log(config.color, fill)

  const processedConfig = {
    ...config,
  }

  if (config.capLeft) {
    processedConfig.radXTopLeft = config.height / 2
    processedConfig.radXBottomLeft = processedConfig.radXTopLeft
  }
  if (config.capRight) {
    processedConfig.radXTopRight = config.height / 2
    processedConfig.radXBottomRight = processedConfig.radXTopRight
  }
  if (config.capTop) {
    processedConfig.radYTopLeft = config.width / 2
    processedConfig.radYTopRight = processedConfig.radYTopLeft
  }
  if (config.capBottom) {
    processedConfig.radYBottomLeft = config.width / 2
    processedConfig.radYBottomRight = processedConfig.radYBottomLeft
  }

  const pathData = createPath(processedConfig, width, height)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><path d="${pathData}" fill="${fill}"/></svg>`
}
