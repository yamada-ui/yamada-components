import { createContext, useMemo, useContext } from "react"
import type { PropsWithChildren, FC } from "react"
import type { ComponentCategory, ComponentCategoryGroup } from "component"
import type { SearchResult } from "search-content"

type AppContext = {
  componentTree: ComponentCategoryGroup[]
  categoryGroup?: ComponentCategoryGroup
  category?: ComponentCategory
  searchResult?: SearchResult
}

const AppContext = createContext<AppContext>({
  componentTree: [],
})

export type AppProviderProps = PropsWithChildren<{
  componentTree: ComponentCategoryGroup[]
  categoryGroup?: ComponentCategoryGroup
  category?: ComponentCategory
  searchResult?: SearchResult
}>

export const AppProvider: FC<AppProviderProps> = ({
  componentTree,
  categoryGroup,
  category,
  searchResult,
  children,
}) => {
  const value = useMemo(
    () => ({ componentTree, categoryGroup, category, searchResult }),
    [componentTree, categoryGroup, category, searchResult],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)

  return context
}
