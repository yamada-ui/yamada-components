declare module "search" {
  interface ContentHierarchy {
    categoryGroup: string
    category?: string
    component?: string
  }

  interface Content {
    type: ContentType
    hierarchy: ContentHierarchy
    labels: string[]
    slug: string
    title: string
    description?: string
  }
}
