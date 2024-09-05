import {
  Input,
  Box,
  VStack,
  AnimatePresence,
  Center,
  Motion,
} from "@yamada-ui/react"
import { type FC, useState } from "react"
import { Indicator } from "./indicator"

const ConfirmationWithOverlay: FC = () => {
  const [password, setPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")

  return (
    <VStack gap="md" maxW="lg">
      <Box position="relative">
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          type="password"
          borderColor="gray.300"
          borderWidth={1}
          borderRadius="md"
        />
        <AnimatePresence>
          {confirmedPassword.length > 0 && (
            <Center
              as={Motion}
              position="absolute"
              top={0}
              left="0.5rem"
              height="full"
              exit={{ width: 0, height: 0 }}
              transition={{ duration: 0, delay: 0.1 }}
            >
              <AnimatePresence>
                {Array.from(confirmedPassword).map((item, index) => (
                  <Indicator
                    key={`${item}-${index}`}
                    password={password}
                    confirmedPassword={confirmedPassword}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </Center>
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
      />
    </VStack>
  )
}

export default ConfirmationWithOverlay
