import type { Component } from "component"
import type { FC, PropsWithChildren } from "react"
import { createContext, useContext, useMemo } from "react"

type ComponentContext = Component

const ComponentContext = createContext<ComponentContext>({} as Component)

export type ComponentProviderProps = PropsWithChildren<Component>

export const ComponentProvider: FC<ComponentProviderProps> = ({
  children,
  ...component
}) => {
  const value = useMemo(() => component, [component])

  return (
    <ComponentContext.Provider value={value}>
      {children}
    </ComponentContext.Provider>
  )
}

export const useComponent = () => {
  const context = useContext(ComponentContext)

  return context
}
