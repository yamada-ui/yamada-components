import { createContext, useMemo, useContext } from "react"
import type { PropsWithChildren, FC } from "react"
import type { ComponentTree } from "component"

type AppContext = {
  componentTree: ComponentTree[]
  categoryGroup?: ComponentTree
  category?: ComponentTree
}

const AppContext = createContext<AppContext>({
  componentTree: [],
})

export type AppProviderProps = PropsWithChildren<{
  componentTree: ComponentTree[]
  categoryGroup?: ComponentTree
  category?: ComponentTree
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
