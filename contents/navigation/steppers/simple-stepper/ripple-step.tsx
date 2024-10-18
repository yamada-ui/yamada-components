import type { FC, ReactNode, SetStateAction } from "react"
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

export const RippleStep: FC<{
  description: ReactNode
  index: number
  setActiveStep: (value: SetStateAction<number>) => void
  title: ReactNode
}> = ({ description, index, setActiveStep, title }) => {
  const { onPointerDown, ...rippleProps } = useRipple()
  return (
    <Step
      borderRadius="md"
      overflow="hidden"
      p="xs"
      position="relative"
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
