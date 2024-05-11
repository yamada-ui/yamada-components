import { createContext, useMemo, useContext } from "react"
import type { PropsWithChildren, FC } from "react"
import type { ComponentCategory, ComponentCategoryGroup } from "component"

type AppContext = {
  componentTree: ComponentCategoryGroup[]
  categoryGroup?: ComponentCategoryGroup
  category?: ComponentCategory
}

const AppContext = createContext<AppContext>({
  componentTree: [],
})

export type AppProviderProps = PropsWithChildren<{
  componentTree: ComponentCategoryGroup[]
  categoryGroup?: ComponentCategoryGroup
  category?: ComponentCategory
}>

export const AppProvider: FC<AppProviderProps> = ({
  componentTree,
  categoryGroup,
  category,
  children,
}) => {
  const value = useMemo(
    () => ({ componentTree, categoryGroup, category }),
    [componentTree, categoryGroup, category],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)

  return context
}
