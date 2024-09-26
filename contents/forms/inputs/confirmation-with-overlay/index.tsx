import {
  Input,
  Box,
  VStack,
  AnimatePresence,
  Motion,
} from "@yamada-ui/react"
import { type FC, useState } from "react"
import { Overlay } from "./overlay"

const ConfirmationWithOverlay: FC = () => {
  const [password, setPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")

  return (
    <VStack gap="md" maxW="lg">
      <Box position="relative" overflow="clip">
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          type="password"
          borderColor="gray.300"
          borderWidth={1}
          borderRadius="md"
          fontSize="15px"
        />
        <AnimatePresence>
          {confirmedPassword.length > 0 && (
            <Motion
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              top={0}
              left="0.5rem"
              height="full"
              exit={{ width: 0, height: 0 }}
              transition={{ duration: 0, delay: 0.1 }}
              pointerEvents="none"
              maxW="calc($sizes.lg - 1.2rem)"
              overflow="clip"
            >
              <AnimatePresence>
                {Array.from(confirmedPassword).map((item, index) => (
                  <Overlay
                    key={`${item}-${index}`}
                    password={password}
                    confirmedPassword={confirmedPassword}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </Motion>
          )}
        </AnimatePresence>
      </Box>

      <Input
        value={confirmedPassword}
        onChange={(e) => setConfirmedPassword(e.target.value)}
        placeholder="Confirm password"
        type="password"
        borderColor="gray.300"
        borderWidth={1}
        borderRadius="md"
        fontSize="15px"
      />
    </VStack>
  )
}

export default ConfirmationWithOverlay
