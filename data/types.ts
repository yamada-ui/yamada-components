export type Category = {
  slug: string
  name: string
  // images: { dark: string; light: string };
}

export type CategoriesGroup = {
  name: string
  categories: Category[]
}

export type CanvasAttributes = {
  responsive?: boolean
  withColor?: boolean
  dimmed?: boolean
  canvas: { center: boolean; maxWidth?: number }
  category: string
  title: string
  props?: Record<string, any>
}

export type UiComponent = {
  component: string
  slug: string
  code: { fileName: string; language: string; code: string }[]
  attributes: CanvasAttributes
}
