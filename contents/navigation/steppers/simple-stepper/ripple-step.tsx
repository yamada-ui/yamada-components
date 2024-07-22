import {
  Box,
  Ripple,
  Step,
  StepDescription,
  StepSeparator,
  StepStatus,
  StepTitle,
  useRipple,
} from "@yamada-ui/react"
import type { FC, ReactNode, SetStateAction } from "react"

export const RippleStep: FC<{
  index: number
  title: ReactNode
  description: ReactNode
  setActiveStep: (value: SetStateAction<number>) => void
}> = ({ index, title, description, setActiveStep }) => {
  const { onPointerDown, ...rippleProps } = useRipple()
  return (
    <Step
      p="xs"
      borderRadius="md"
      position="relative"
      overflow="hidden"
      onClick={() => setActiveStep(index)}
      onPointerDown={onPointerDown}
    >
      <StepStatus />
      <Box flexShrink="0">
        <StepTitle>{title}</StepTitle>
        <StepDescription>{description}</StepDescription>
      </Box>
      <Ripple {...rippleProps} />
      <StepSeparator />
    </Step>
  )
}
