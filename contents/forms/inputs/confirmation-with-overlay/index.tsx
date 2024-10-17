import type { FC } from "react"
import { AnimatePresence, Box, Input, Motion, VStack } from "@yamada-ui/react"
import { useState } from "react"
import { Overlay } from "./overlay"

const ConfirmationWithOverlay: FC = () => {
  const [password, setPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")

  return (
    <VStack gap="md" maxW="lg">
      <Box overflow="clip" position="relative">
        <Input
          type="password"
          borderColor="gray.300"
          borderRadius="md"
          borderWidth={1}
          fontSize="15px"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AnimatePresence>
          {confirmedPassword.length > 0 && (
            <Motion
              alignItems="center"
              display="flex"
              exit={{ height: 0, width: 0 }}
              height="full"
              justifyContent="center"
              left="0.5rem"
              maxW="calc($sizes.lg - 1.2rem)"
              overflow="clip"
              pointerEvents="none"
              position="absolute"
              top={0}
              transition={{ delay: 0.1, duration: 0 }}
            >
              <AnimatePresence>
                {Array.from(confirmedPassword).map((item, index) => (
                  <Overlay
                    key={`${item}-${index}`}
                    confirmedPassword={confirmedPassword}
                    index={index}
                    password={password}
                  />
                ))}
              </AnimatePresence>
            </Motion>
          )}
        </AnimatePresence>
      </Box>

      <Input
        type="password"
        borderColor="gray.300"
        borderRadius="md"
        borderWidth={1}
        fontSize="15px"
        placeholder="Confirm password"
        value={confirmedPassword}
        onChange={(e) => setConfirmedPassword(e.target.value)}
      />
    </VStack>
  )
}

export default ConfirmationWithOverlay
