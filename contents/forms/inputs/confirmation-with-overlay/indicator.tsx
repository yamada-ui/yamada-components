import { Motion } from "@yamada-ui/react"
import React from "react"

interface IndicatorProps {
  index: number
  password: string
  confirmedPassword: string
}

export const Indicator: React.FC<IndicatorProps> = ({
  index,
  password,
  confirmedPassword,
}) => {
  const isFirstItem = index === 0
  const isLastItem = index === password.length - 1

  if (index > password.length - 1) {
    return null
  }

  const enterAnimation = {
    width:
      index === 0 || index === password.length - 1
        ? "calc(9px + 0.25rem)"
        : "9px",
    borderTopLeftRadius: isFirstItem ? "6px" : "0px",
    borderBottomLeftRadius: isFirstItem ? "6px" : "0px",
    borderTopRightRadius: isLastItem ? "6px" : "0px",
    borderBottomRightRadius: isLastItem ? "6px" : "0px",
  }

  const exitAnimation = {
    width: 0,
  }

  return (
    <Motion
      initial={{ width: 0 }}
      animate={enterAnimation}
      exit={exitAnimation}
      height="60%"
      backgroundColor={
        password[index] === confirmedPassword[index] ? "green.400" : "red.400"
      }
      opacity={0.4}
      transition={{ duration: 0.3 }}
    />
  )
}
