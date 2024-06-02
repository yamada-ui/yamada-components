declare module "search-content" {
  type SearchContentType = "categoryGroup" | "category" | "component"
  type SearchContentHierarchy = {
    categoryGroup: string
    category?: string
    component?: string
  }
  type SearchContent = {
    title: string
    description?: string
    type: SearchContentType
    slug: string
    labels: string[]
    hierarchy: SearchContentHierarchy
  }
}
