import type { Steps } from "@yamada-ui/react"
import type { FC } from "react"
import { Stepper, useMediaQuery, useSteps } from "@yamada-ui/react"
import { RippleStep } from "./ripple-step"

const steps: Steps = [
  {
    description: "Description",
    title: "Step1",
  },
  {
    description: "Description",
    title: "Step2",
  },
  {
    description: "Description",
    title: "Step3",
  },
  {
    description: "Description",
    title: "Step4",
  },
]

const SimpleStepper: FC = () => {
  const { activeStep, setActiveStep } = useSteps({
    count: steps.length,
    index: 1,
  })

  const [flg] = useMediaQuery("(min-width: 800px)")

  return (
    <Stepper
      h="full"
      index={activeStep}
      orientation={flg ? "horizontal" : "vertical"}
      w={flg ? "full" : "fit-content"}
    >
      {steps.map(({ description, title }, index) => (
        <RippleStep
          key={index}
          {...{ description, index, setActiveStep, title }}
        />
      ))}
    </Stepper>
  )
}

export default SimpleStepper
