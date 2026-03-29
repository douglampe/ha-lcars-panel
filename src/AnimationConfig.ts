import gsap from 'gsap'
import type { ConfigItem } from './ConfigItem'

export interface AnimationConfig {
  type: string
  delay?: number
  duration?: number
  interval?: number
  transformOrigiin?: string
}

export interface Animations {
  in?: Array<AnimationConfig>
  out?: Array<AnimationConfig>
}

export function applyInAnimations(el: any, config: ConfigItem) {
  if (config.animations?.in) {
    for (const animation of config.animations.in) {
      let from = {}
      let to = {}
      switch (animation.type) {
        case 'grow':
          from = {
            scale: 0,
            transformOrigin: animation?.transformOrigiin,
          }
          to = {
            scale: 1,
            duration: animation.duration ?? 0.5,
            delay: animation.delay,
            transformOrigin: animation?.transformOrigiin,
          }
          break
        case 'grow-down':
          from = {
            scaleY: 0,
            transformOrigin: '0 0',
          }
          to = {
            scaleY: 1,
            duration: animation.duration ?? 0.5,
            delay: animation.delay,
            transformOrigin: animation?.transformOrigiin,
          }
          break
        case 'grow-up':
          from = {
            scaleY: 0,
            transformOrigin: '0 100%',
          }
          to = {
            scaleY: 1,
            duration: animation.duration ?? 0.5,
            delay: animation.delay,
            transformOrigin: animation?.transformOrigiin,
          }
          break
        case 'grow-right':
          from = {
            scaleX: 0,
            transformOrigin: '0 100%',
          }
          to = {
            scaleX: 1,
            duration: animation.duration ?? 0.5,
            delay: animation.delay,
            transformOrigin: animation?.transformOrigiin,
          }
          break
        case 'grow-left':
          from = {
            scaleX: 0,
            transformOrigin: '100% 100%',
          }
          to = {
            scaleX: 1,
            duration: animation.duration ?? 0.5,
            delay: animation.delay,
            transformOrigin: animation?.transformOrigiin,
          }
          break
      }
      gsap.fromTo(el, from, to)
    }
  }
}

export function applyStepAnimation(
  animation: AnimationConfig,
  to: number,
  target: any,
  prop: string,
) {
  target[prop] = 1
  const config: any = {
    duration: animation.interval ? animation.interval * to - 1 : (animation.duration ?? 0.1 * to),
    ease: `steps(${to})`,
    delay: animation.delay,
  }
  config[prop] = to
  gsap.to(target, config)
}
