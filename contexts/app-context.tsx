import { createContext, useMemo, useContext } from "react"
import type { PropsWithChildren, FC } from "react"
import type {
  Component,
  ComponentCategory,
  ComponentCategoryGroup,
} from "component"

type AppContext = {
  componentTree: ComponentCategoryGroup[]
  categoryGroup?: ComponentCategoryGroup
  category?: ComponentCategory
  components?: Component[]
}

const AppContext = createContext<AppContext>({
  componentTree: [],
})

export type AppProviderProps = PropsWithChildren<{
  componentTree: ComponentCategoryGroup[]
  categoryGroup?: ComponentCategoryGroup
  category?: ComponentCategory
  components?: Component[]
}>

export const AppProvider: FC<AppProviderProps> = ({
  componentTree,
  categoryGroup,
  category,
  components,
  children,
}) => {
  const value = useMemo(
    () => ({ componentTree, categoryGroup, category, components }),
    [componentTree, categoryGroup, category, components],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)

  return context
}
