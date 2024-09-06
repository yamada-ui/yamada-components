import { items } from "./timeline"

export const generateDesktopTemplateAreas = () => {
  return items.map((_, i) => `"left-side-${i} line right-side-${i}"`)
}

export const generateTabletTemplateAreas = () => {
  return items.map((_, i) => `"line left-side-${i} right-side-${i}"`)
}

export const generateMobileTemplateAreas = () => {
  return items.map((_, i) => `"left-side-${i} left-side-${i} left-side-${i}"`)
}
