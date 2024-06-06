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

  type SearchResult = {
    labels: string[]
    contents: {
      name: string
      slug: string
      paths: {
        component: string
        theme: string
        config: string
      }
      components: {
        name: string
        path: string
        code: string
      }[]
      metadata: {
        options: MetadataOptions
        authors: Author[]
        title: string
        description: string
      }
    }[]
  }
}
