import type { IconProps } from "@yamada-ui/react"
import { Icon } from "@yamada-ui/react"
import { forwardRef } from "react"

export const LayoutHorizontal = forwardRef<SVGSVGElement, IconProps>(
  ({ boxSize = "1.5em", ...rest }, ref) => {
    return (
      <Icon
        ref={ref}
        aria-hidden="true"
        boxSize={boxSize}
        fill="none"
        focusable="false"
        stroke="none"
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <path
          d="M9.5 4.504a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5zM10 6.004a.5.5 0 100 1h1a.5.5 0 000-1h-1zM9.5 8.504a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5z"
          fill="currentColor"
        />
        <path
          clipRule="evenodd"
          d="M1.5 13.004a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5h11a.5.5 0 01.5.5v11a.5.5 0 01-.5.5h-11zm.5-1v-10h6v10H2zm7-10h3v10H9v-10z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </Icon>
    )
  },
)

LayoutHorizontal.displayName = "LayoutHorizontal"

export const LayoutVertical = forwardRef<SVGSVGElement, IconProps>(
  ({ boxSize = "1.5em", ...rest }, ref) => {
    return (
      <Icon
        ref={ref}
        aria-hidden="true"
        boxSize={boxSize}
        fill="none"
        focusable="false"
        stroke="none"
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <path
          d="M3 10.504a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5zM6.5 10.004a.5.5 0 000 1h1a.5.5 0 000-1h-1zM9 10.504a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5z"
          fill="currentColor"
        />
        <path
          clipRule="evenodd"
          d="M1 1.504a.5.5 0 01.5-.5h11a.5.5 0 01.5.5v11a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11zm1 6.5v-6h10v6H2zm10 1v3H2v-3h10z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </Icon>
    )
  },
)

LayoutVertical.displayName = "LayoutVertical"
