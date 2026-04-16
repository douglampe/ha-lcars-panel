import { colorList } from './ColorList'
import type { ConfigItem } from './ConfigItem'
import { unitSize } from './Layout'
import { getThemeColor } from './ThemeConfig'

const scaleFactor = 10

function scaleValue(value?: number, defaultValue = 0) {
  return (value ?? defaultValue) * scaleFactor
}

function unscale(value?: number, defaultValue = 0) {
  return (value ?? defaultValue) / scaleFactor
}

//TODO: Resolve color names to hex values
function resolveColor(themeName: string | undefined, color?: string | number) {
  if (color) {
    if (typeof color === 'number') {
      const themeColor = getThemeColor(themeName, color)
      if (themeColor.startsWith('#')) {
        return themeColor
      }
      return resolveColor(themeName, themeColor)
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

function getSize(
  config: ConfigItem,
  actualWidth: number | undefined,
  actualHeight: number | undefined,
) {
  const size = {
    width: typeof config.width === 'number' ? scaleValue(config.width) : undefined,
    height: typeof config.height === 'number' ? scaleValue(config.height) : undefined,
  }

  if (actualWidth && actualHeight) {
    if (size.width && size.height) {
      if (
        parseFloat((actualWidth / size.width).toFixed(2)) >
        parseFloat((actualHeight / size.height).toFixed(2))
      ) {
        size.width = (actualWidth * size.height) / actualHeight
      } else if (
        parseFloat((actualWidth / size.width).toFixed(2)) <
        parseFloat((actualHeight / size.height).toFixed(2))
      ) {
        size.height = (actualHeight * size.width) / actualWidth
      }
    } else if (size.width) {
      size.height = (actualHeight * size.width) / actualWidth
    } else if (size.height) {
      size.width = (actualWidth * size.height) / actualHeight
    } else {
      size.width = actualWidth
      size.height = actualHeight
    }
  }

  return size
}

function createRadiusPath(config: ConfigItem, width: number, height: number) {
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

  const { width, height } = getSize(config, actualWidth, actualHeight)

  if (typeof width !== 'number' || typeof height !== 'number') {
    return
  }

  const fill = resolveColor(config.config?.theme, config.color)

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

  const pathData = createRadiusPath(processedConfig, width, height)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><path d="${pathData}" fill="${fill}"/></svg>`
}

export function createScaleHSVG(
  config: ConfigItem,
  color: number | string,
  stroke: number,
  actualWidth: number | undefined,
  actualHeight: number | undefined,
  ticks: number[],
  tickLabels?: string[],
  fontSize?: string,
  minorTicks?: number[],
) {
  const { width, height } = getSize(config, actualWidth, actualHeight)

  if (typeof width !== 'number' || typeof height !== 'number') {
    return
  }

  const path = []

  const labels = []

  for (let i = 0; i < ticks.length; i++) {
    path.push(`M ${ticks[i]} 0`)
    path.push(`l 0 ${height}`)

    if (tickLabels && (tickLabels?.length ?? 0 < i)) {
      labels.push(
        `<text class="svgScaleLabel" x="${ticks[i] - stroke * 2}" y="${height - stroke * 2}">${tickLabels[i]}</text>`,
      )
    }
  }

  if (minorTicks) {
    for (let i = 0; i < (minorTicks?.length ?? 0); i++) {
      const x = minorTicks[i]
      if (!ticks.includes(x)) {
        path.push(`M ${x} 0`)
        path.push(`l 0 ${height / 4}`)
      }
    }
  }

  const pathData = path.join(' ')
  const text = labels.join('')
  const strokeColor = resolveColor(config.config?.theme, color)
  const style = `<style>
    .svgScaleLabel {
      font-family: Antonio, Arial, monospace;
      font-size: ${fontSize ?? unitSize(1)};
      fill: ${strokeColor};
      text-anchor: end;
    }
  </style>`

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">${style}<path d="${pathData}" stroke="${strokeColor}" stroke-width="${stroke}" fill="none" />${text}</svg>`
}

export function createScaleVSVG(
  config: ConfigItem,
  color: number | string,
  stroke: number,
  actualWidth: number | undefined,
  actualHeight: number | undefined,
  ticks: number[],
  tickLabels?: string[],
  fontSize?: string,
  minorTicks?: number[],
) {
  const { width, height } = getSize(config, actualWidth, actualHeight)

  if (typeof width !== 'number' || typeof height !== 'number') {
    return
  }

  const path = []

  const labels = []

  for (let i = 0; i < ticks.length; i++) {
    path.push(`M 0 ${height - ticks[i]}`)
    path.push(`l ${width} 0`)

    if (tickLabels && (tickLabels?.length ?? 0 < i)) {
      labels.push(
        `<text class="svgScaleLabel" dominant-baseline="text-before-edge" y="${height - ticks[i]}" x="${width - stroke * 2}">${tickLabels[i]}</text>`,
      )
    }
  }

  if (minorTicks) {
    for (let i = 0; i < (minorTicks?.length ?? 0); i++) {
      const y = minorTicks[i]
      if (!ticks.includes(y)) {
        path.push(`M 0 height - ${y}`)
        path.push(`l ${width / 4} 0`)
      }
    }
  }

  const pathData = path.join(' ')
  const text = labels.join('')
  const strokeColor = resolveColor(config.config?.theme, color)
  const style = `<style>
    .svgScaleLabel {
      font-family: Antonio, Arial, monospace;
      font-size: ${fontSize ?? unitSize(1)};
      fill: ${strokeColor};
      text-anchor: end;
    }
  </style>`

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">${style}<path d="${pathData}" stroke="${strokeColor}" stroke-width="${stroke}" fill="none" />${text}</svg>`
}
