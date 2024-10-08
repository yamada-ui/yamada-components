import { Motion } from "@yamada-ui/react"
import React from "react"

interface OverlayProps {
  index: number
  password: string
  confirmedPassword: string
}

export const Overlay: React.FC<OverlayProps> = ({
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
    width: isFirstItem || isLastItem ? "calc(0.498rem + 0.3rem)" : "0.498rem",
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
