import { Motion } from "@yamada-ui/react"
import React from "react"

interface OverlayProps {
  confirmedPassword: string
  index: number
  password: string
}

export const Overlay: React.FC<OverlayProps> = ({
  confirmedPassword,
  index,
  password,
}) => {
  const isFirstItem = index === 0
  const isLastItem = index === password.length - 1

  if (index > password.length - 1) {
    return null
  }

  const enterAnimation = {
    borderBottomLeftRadius: isFirstItem ? "6px" : "0px",
    borderBottomRightRadius: isLastItem ? "6px" : "0px",
    borderTopLeftRadius: isFirstItem ? "6px" : "0px",
    borderTopRightRadius: isLastItem ? "6px" : "0px",
    width: isFirstItem || isLastItem ? "calc(0.498rem + 0.3rem)" : "0.498rem",
  }

  const exitAnimation = {
    width: 0,
  }

  return (
    <Motion
      animate={enterAnimation}
      backgroundColor={
        password[index] === confirmedPassword[index] ? "green.400" : "red.400"
      }
      exit={exitAnimation}
      height="60%"
      initial={{ width: 0 }}
      opacity={0.4}
      transition={{ duration: 0.3 }}
    />
  )
}
