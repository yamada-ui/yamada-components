import type {
  Component,
  ComponentCategory,
  ComponentCategoryGroup,
} from "component"
import type { FC, PropsWithChildren } from "react"
import { createContext, useContext, useMemo } from "react"

interface AppContext {
  componentTree: ComponentCategoryGroup[]
  category?: ComponentCategory
  categoryGroup?: ComponentCategoryGroup
  components?: Component[]
}

const AppContext = createContext<AppContext>({
  componentTree: [],
})

export type AppProviderProps = PropsWithChildren<{
  componentTree: ComponentCategoryGroup[]
  category?: ComponentCategory
  categoryGroup?: ComponentCategoryGroup
  components?: Component[]
}>

export const AppProvider: FC<AppProviderProps> = ({
  category,
  categoryGroup,
  children,
  components,
  componentTree,
}) => {
  const value = useMemo(
    () => ({ category, categoryGroup, components, componentTree }),
    [componentTree, categoryGroup, category, components],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)

  return context
}
