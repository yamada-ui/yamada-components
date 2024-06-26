declare module "search" {
  type ContentHierarchy = {
    categoryGroup: string
    category?: string
    component?: string
  }

  type Content = {
    title: string
    description?: string
    type: ContentType
    slug: string
    labels: string[]
    hierarchy: ContentHierarchy
  }
}
