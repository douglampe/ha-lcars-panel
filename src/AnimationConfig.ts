export interface AnimationConfig {
  type: string
  delay?: number
  duration?: number
  transformOrigiin?: string
}

export interface Animations {
  in?: AnimationConfig
  out?: AnimationConfig
}
