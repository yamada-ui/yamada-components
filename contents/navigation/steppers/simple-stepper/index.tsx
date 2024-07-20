import type { Steps } from "@yamada-ui/react"
import { Stepper, useMediaQuery, useSteps } from "@yamada-ui/react"
import type { FC } from "react"
import { RippleStep } from "./ripple-step"

const steps: Steps = [
  {
    title: "Step1",
    description: "Description",
  },
  {
    title: "Step2",
    description: "Description",
  },
  {
    title: "Step3",
    description: "Description",
  },
  {
    title: "Step4",
    description: "Description",
  },
]

const SimpleStepper: FC = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  const [flg] = useMediaQuery("(min-width: 800px)")

  return (
    <Stepper
      orientation={flg ? "horizontal" : "vertical"}
      w={flg ? "full" : "fit-content"}
      h="full"
      index={activeStep}
    >
      {steps.map(({ title, description }, index) => (
        <RippleStep
          key={index}
          {...{ index, title, description, setActiveStep }}
        />
      ))}
    </Stepper>
  )
}

export default SimpleStepper
